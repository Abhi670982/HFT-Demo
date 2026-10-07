/**
 * Minimal, dependency-free DOCX text extractor.
 * A DOCX is a ZIP archive; we read its central directory, inflate only the
 * Word XML parts we need (via the platform `DecompressionStream`) and turn
 * `<w:p>` / `<w:t>` runs into plain text. Anything that is not a genuine Word
 * document (plain ZIP, renamed XLSX/PPTX, encrypted archive) is rejected.
 */

import { ResumeToolError } from "./errors";

/** Hard cap per inflated XML part — guards against zip bombs. */
const MAX_PART_BYTES = 15 * 1024 * 1024;
const MAX_ENTRIES = 2000;

interface ZipEntry {
  name: string;
  method: number;
  encrypted: boolean;
  compressedSize: number;
  uncompressedSize: number;
  localHeaderOffset: number;
}

function readEntries(bytes: Uint8Array): ZipEntry[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  // End-of-central-directory record: last 22 bytes + up to 64KB comment.
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 22 - 0xffff); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new ResumeToolError("CORRUPTED_FILE");

  const count = view.getUint16(eocd + 10, true);
  const cdOffset = view.getUint32(eocd + 16, true);
  if (count > MAX_ENTRIES || cdOffset >= bytes.length) throw new ResumeToolError("CORRUPTED_FILE");

  const entries: ZipEntry[] = [];
  const decoder = new TextDecoder();
  let p = cdOffset;
  for (let i = 0; i < count; i++) {
    if (p + 46 > bytes.length || view.getUint32(p, true) !== 0x02014b50) {
      throw new ResumeToolError("CORRUPTED_FILE");
    }
    const nameLen = view.getUint16(p + 28, true);
    const extraLen = view.getUint16(p + 30, true);
    const commentLen = view.getUint16(p + 32, true);
    entries.push({
      name: decoder.decode(bytes.subarray(p + 46, p + 46 + nameLen)),
      method: view.getUint16(p + 10, true),
      encrypted: (view.getUint16(p + 8, true) & 0x1) === 1,
      compressedSize: view.getUint32(p + 20, true),
      uncompressedSize: view.getUint32(p + 24, true),
      localHeaderOffset: view.getUint32(p + 42, true),
    });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > MAX_PART_BYTES) {
      await reader.cancel();
      throw new ResumeToolError("CORRUPTED_FILE");
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

async function readEntry(bytes: Uint8Array, entry: ZipEntry): Promise<string> {
  if (entry.encrypted) throw new ResumeToolError("PASSWORD_PROTECTED");
  if (entry.uncompressedSize > MAX_PART_BYTES) throw new ResumeToolError("CORRUPTED_FILE");

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const h = entry.localHeaderOffset;
  if (h + 30 > bytes.length || view.getUint32(h, true) !== 0x04034b50) {
    throw new ResumeToolError("CORRUPTED_FILE");
  }
  const start = h + 30 + view.getUint16(h + 26, true) + view.getUint16(h + 28, true);
  const end = start + entry.compressedSize;
  if (end > bytes.length) throw new ResumeToolError("CORRUPTED_FILE");
  const raw = bytes.subarray(start, end);

  let data: Uint8Array;
  if (entry.method === 0) data = raw;
  else if (entry.method === 8) {
    try {
      data = await inflateRaw(raw);
    } catch (error) {
      if (error instanceof ResumeToolError) throw error;
      throw new ResumeToolError("CORRUPTED_FILE");
    }
  } else throw new ResumeToolError("CORRUPTED_FILE");

  return new TextDecoder().decode(data);
}

function decodeXmlEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|lt|gt|amp|quot|apos);/gi, (match, entity: string) => {
    const e = entity.toLowerCase();
    if (e === "lt") return "<";
    if (e === "gt") return ">";
    if (e === "amp") return "&";
    if (e === "quot") return '"';
    if (e === "apos") return "'";
    const code = e.startsWith("#x") ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

/**
 * Converts WordprocessingML into text, one line per paragraph. Numbered /
 * bulleted paragraphs get a "• " prefix so list structure survives.
 */
export function wordXmlToText(xml: string): string {
  const lines: string[] = [];
  let line = "";
  let isListItem = false;
  const flush = () => {
    const text = line.trim();
    if (text) lines.push(isListItem ? `• ${text}` : text);
    line = "";
    isListItem = false;
  };

  const token = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<(\/?)w:(p|tab|br|cr|numPr)\b[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = token.exec(xml))) {
    if (m[1] !== undefined) {
      line += decodeXmlEntities(m[1]);
      continue;
    }
    const closing = m[2] === "/";
    const tag = m[3];
    if (tag === "p") flush(); // both <w:p> (nested text boxes) and </w:p>
    else if (tag === "tab" && !closing) line += "\t";
    else if ((tag === "br" || tag === "cr") && !closing) flush(); // soft line break
    else if (tag === "numPr" && !closing) isListItem = true;
  }
  flush();
  return lines.join("\n");
}

/** Extracts plain text from DOCX bytes. Throws ResumeToolError on anything that isn't a Word document. */
export async function extractDocxText(bytes: Uint8Array): Promise<string> {
  const entries = readEntries(bytes);
  const byName = new Map(entries.map((e) => [e.name, e]));

  const contentTypes = byName.get("[Content_Types].xml");
  const document = byName.get("word/document.xml");
  // A plain ZIP, XLSX, PPTX etc. renamed to .docx has no Word main part.
  if (!contentTypes || !document) throw new ResumeToolError("CONTENT_MISMATCH");
  if (!/wordprocessingml/i.test(await readEntry(bytes, contentTypes))) {
    throw new ResumeToolError("CONTENT_MISMATCH");
  }

  // Headers often hold the candidate's name and contact details.
  const headers = entries
    .filter((e) => /^word\/header\d*\.xml$/.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const parts: string[] = [];
  for (const header of headers) parts.push(wordXmlToText(await readEntry(bytes, header)));
  parts.push(wordXmlToText(await readEntry(bytes, document)));
  return parts.filter(Boolean).join("\n");
}
