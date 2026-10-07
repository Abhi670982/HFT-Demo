/**
 * Resume file gate: extension → size → MIME → file signature → text
 * extraction. Nothing reaches the parser unless the bytes really are the
 * document type the name claims.
 */

import { extractDocxText } from "./docx";
import { ResumeToolError } from "./errors";
import { extractPdfText, type PdfJsModule } from "./pdf";

export const MAX_RESUME_FILE_BYTES = 5 * 1024 * 1024;

export type ResumeFileKind = "pdf" | "docx" | "text";

const EXTENSION_KIND: Record<string, ResumeFileKind> = {
  pdf: "pdf",
  docx: "docx",
  txt: "text",
  md: "text",
};

/** Browsers often report an empty or generic type, so those are accepted and the signature decides. */
const GENERIC_MIME = ["", "application/octet-stream"];
const ALLOWED_MIME: Record<ResumeFileKind, string[]> = {
  pdf: ["application/pdf", "application/x-pdf"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "application/x-zip-compressed",
  ],
  text: ["text/plain", "text/markdown", "text/x-markdown"],
};

/** Value for the file input's `accept` attribute. */
export const RESUME_FILE_ACCEPT = [
  ".pdf",
  ".docx",
  ".txt",
  ".md",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
].join(",");

/** Display-safe file name: no path segments or control characters, bounded length. */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const clean = base.replace(/[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/g, "").trim();
  if (!clean) return "resume";
  return clean.length > 80 ? `${clean.slice(0, 60)}…${clean.slice(-15)}` : clean;
}

function extensionOf(name: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(name.trim());
  return match ? match[1].toLowerCase() : "";
}

function startsWith(bytes: Uint8Array, signature: number[], offset = 0): boolean {
  return signature.every((b, i) => bytes[offset + i] === b);
}

const SIG = {
  pdf: [0x25, 0x50, 0x44, 0x46, 0x2d], // %PDF-
  zip: [0x50, 0x4b, 0x03, 0x04], // PK\3\4
  ole: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // legacy .doc / encrypted Office
};

/** True when a recognisable binary format (image, archive, executable, media…) is detected. */
function looksLikeKnownBinary(bytes: Uint8Array): boolean {
  const signatures = [
    SIG.pdf,
    SIG.zip,
    SIG.ole,
    [0x4d, 0x5a], // MZ — Windows executable
    [0x7f, 0x45, 0x4c, 0x46], // ELF
    [0x89, 0x50, 0x4e, 0x47], // PNG
    [0xff, 0xd8, 0xff], // JPEG
    [0x47, 0x49, 0x46, 0x38], // GIF
    [0x42, 0x4d], // BMP
    [0x52, 0x61, 0x72, 0x21], // RAR
    [0x37, 0x7a, 0xbc, 0xaf], // 7z
    [0x1f, 0x8b], // gzip
    [0x49, 0x44, 0x33], // MP3 (ID3)
    [0x1a, 0x45, 0xdf, 0xa3], // MKV / WebM
  ];
  if (signatures.some((sig) => startsWith(bytes, sig))) return true;
  // RIFF (WAV/AVI/WEBP) and ISO media (MP4/MOV/HEIC)
  return startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) || startsWith(bytes, [0x66, 0x74, 0x79, 0x70], 4);
}

/** Finds `%PDF-` within the first 1KB (the spec tolerates leading junk). */
function hasPdfHeader(bytes: Uint8Array): boolean {
  const limit = Math.min(bytes.length - SIG.pdf.length, 1024);
  for (let i = 0; i <= limit; i++) if (startsWith(bytes, SIG.pdf, i)) return true;
  return false;
}

function decodeTextFile(bytes: Uint8Array): string {
  if (looksLikeKnownBinary(bytes)) throw new ResumeToolError("CONTENT_MISMATCH");

  let text: string;
  try {
    if (startsWith(bytes, [0xff, 0xfe])) text = new TextDecoder("utf-16le", { fatal: true }).decode(bytes);
    else if (startsWith(bytes, [0xfe, 0xff])) text = new TextDecoder("utf-16be", { fatal: true }).decode(bytes);
    else text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    // Not valid UTF-8/16 — fall back to Windows-1252 (common for older Notepad files),
    // then let the control-character check below decide whether it is really text.
    text = new TextDecoder("windows-1252").decode(bytes);
  }

  const control = text.match(/[\u0000-\u0008\u000e-\u001f\u007f]/g)?.length ?? 0;
  if (control > 0 && control / text.length > 0.002) throw new ResumeToolError("CONTENT_MISMATCH");
  return text;
}

/** Normalises extracted text without changing its wording: unifies line breaks, bullets and spacing. */
export function normalizeResumeText(text: string): string {
  return (
    text
      .replace(/^﻿/, "")
      .replace(/\r\n?/g, "\n")
      .replace(/[  -   　]/g, " ")
      .replace(/[​-‍⁠]/g, "")
      // Private-use glyphs (icon fonts in PDF templates) and stray control characters.
      .replace(/[-\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
      .replace(/^[ \t]*[▪■●◆◦▸►‣⁃∙·•*\-–]\s+/gm, "• ")
      .replace(/[ \t]+$/gm, "")
      .replace(/[ ]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

export interface ExtractedResumeFile {
  text: string;
  fileName: string;
  kind: ResumeFileKind;
}

export interface FileLike {
  name: string;
  type: string;
  size: number;
  arrayBuffer(): Promise<ArrayBuffer>;
}

/** Cheap checks that need no file contents — safe to run before reading the file. */
export function checkResumeFileMeta(file: Pick<FileLike, "name" | "type" | "size">): ResumeFileKind {
  const ext = extensionOf(file.name);
  if (ext === "doc") throw new ResumeToolError("LEGACY_DOC");
  const kind = EXTENSION_KIND[ext];
  if (!kind) throw new ResumeToolError("UNSUPPORTED_TYPE");

  if (file.size === 0) throw new ResumeToolError("EMPTY_FILE");
  if (file.size > MAX_RESUME_FILE_BYTES) throw new ResumeToolError("FILE_TOO_LARGE");

  const mime = (file.type || "").toLowerCase().split(";")[0].trim();
  if (!GENERIC_MIME.includes(mime) && !ALLOWED_MIME[kind].includes(mime)) {
    throw new ResumeToolError(mime === "application/msword" ? "LEGACY_DOC" : "CONTENT_MISMATCH");
  }
  return kind;
}

/**
 * Validates and extracts the text of an uploaded resume file.
 * Throws `ResumeToolError` with a user-facing message on any failure.
 * `onParsing` fires once the bytes have passed the type checks and text extraction starts.
 */
export async function extractResumeFile(
  file: FileLike,
  loadPdfJs: () => Promise<PdfJsModule>,
  onParsing?: () => void
): Promise<ExtractedResumeFile> {
  const kind = checkResumeFileMeta(file);
  const fileName = sanitizeFileName(file.name);

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(await file.arrayBuffer());
  } catch {
    throw new ResumeToolError("CORRUPTED_FILE");
  }
  // Re-check against the bytes actually read (the reported size can't be trusted blindly).
  if (bytes.length === 0) throw new ResumeToolError("EMPTY_FILE");
  if (bytes.length > MAX_RESUME_FILE_BYTES) throw new ResumeToolError("FILE_TOO_LARGE");

  let raw: string;
  if (kind === "pdf") {
    if (!hasPdfHeader(bytes)) throw new ResumeToolError("CONTENT_MISMATCH");
    onParsing?.();
    let pdfjs: PdfJsModule;
    try {
      pdfjs = await loadPdfJs();
    } catch {
      throw new ResumeToolError("PARSE_FAILED");
    }
    raw = await extractPdfText(bytes, pdfjs);
  } else if (kind === "docx") {
    if (startsWith(bytes, SIG.ole)) throw new ResumeToolError("LEGACY_DOC");
    if (!startsWith(bytes, SIG.zip)) throw new ResumeToolError("CONTENT_MISMATCH");
    onParsing?.();
    raw = await extractDocxText(bytes);
  } else {
    onParsing?.();
    raw = decodeTextFile(bytes);
  }

  const text = normalizeResumeText(raw);
  if (text.replace(/\s/g, "").length < 20) {
    throw new ResumeToolError(kind === "text" ? "EMPTY_FILE" : "NO_TEXT");
  }
  return { text, fileName, kind };
}
