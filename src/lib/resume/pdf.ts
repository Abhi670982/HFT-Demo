/**
 * PDF text extraction on top of PDF.js. The PDF.js module is injected so the
 * same logic runs in the browser (lazy-loaded with a Web Worker, see
 * `pdfjsBrowser.ts`) and in Node-based checks.
 */

import type * as PdfJs from "pdfjs-dist/legacy/build/pdf.mjs";
import { ResumeToolError } from "./errors";

export type PdfJsModule = Pick<typeof PdfJs, "getDocument">;

export const MAX_PDF_PAGES = 10;
const PARSE_TIMEOUT_MS = 20_000;

interface PositionedText {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hasEOL: boolean;
}

/** Rebuilds reading-order lines from PDF.js text items using their positions. */
function itemsToText(items: PositionedText[]): string {
  const lines: string[] = [];
  let line = "";
  let lastY: number | null = null;
  let lastEnd = 0;

  for (const item of items) {
    const tolerance = Math.max(2, item.height * 0.5);
    if (lastY !== null && Math.abs(item.y - lastY) > tolerance && line.trim()) {
      lines.push(line);
      line = "";
    }
    if (line && item.str && !/\s$/.test(line) && !/^\s/.test(item.str)) {
      // Separate visually distinct runs on the same line (PDFs rarely encode spaces).
      const gap = item.x - lastEnd;
      if (gap > Math.max(1, item.height * 0.15)) line += gap > item.height * 2 ? "\t" : " ";
    }
    line += item.str;
    if (item.str) {
      lastY = item.y;
      lastEnd = item.x + item.width;
    }
    if (item.hasEOL) {
      if (line.trim()) lines.push(line);
      line = "";
      lastY = null;
    }
  }
  if (line.trim()) lines.push(line);
  return lines.join("\n");
}

function withTimeout<T>(promise: Promise<T>, onTimeout: () => void): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      onTimeout();
      reject(new ResumeToolError("PARSE_TIMEOUT"));
    }, PARSE_TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function extractPdfText(bytes: Uint8Array, pdfjs: PdfJsModule): Promise<string> {
  const task = pdfjs.getDocument({
    // PDF.js may transfer the buffer to its worker — hand it a copy.
    data: bytes.slice(),
    // Text only: no XFA forms, font loading or WASM image decoders needed.
    enableXfa: false,
    useWasm: false,
    disableFontFace: true,
    verbosity: 0,
  });

  const run = async () => {
    const doc = await task.promise;
    if (doc.numPages > MAX_PDF_PAGES) throw new ResumeToolError("TOO_MANY_PAGES");
    const pages: string[] = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const content = await page.getTextContent();
      const items: PositionedText[] = [];
      for (const item of content.items) {
        if (!("str" in item)) continue;
        items.push({
          str: item.str,
          x: item.transform[4],
          y: item.transform[5],
          width: item.width,
          height: item.height || Math.abs(item.transform[3]) || 10,
          hasEOL: item.hasEOL,
        });
      }
      pages.push(itemsToText(items));
      page.cleanup();
    }
    return pages.join("\n\n");
  };

  try {
    return await withTimeout(run(), () => void task.destroy());
  } catch (error) {
    if (error instanceof ResumeToolError) throw error;
    const name = (error as { name?: string } | null)?.name;
    if (name === "PasswordException") throw new ResumeToolError("PASSWORD_PROTECTED");
    if (name === "InvalidPDFException") throw new ResumeToolError("CORRUPTED_FILE");
    throw new ResumeToolError("PARSE_FAILED");
  } finally {
    void task.destroy();
  }
}
