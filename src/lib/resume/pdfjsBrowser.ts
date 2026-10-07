/**
 * Lazily loads PDF.js in the browser with its parser running in a Web Worker.
 * Only fetched when a user actually uploads a PDF.
 */

import type { PdfJsModule } from "./pdf";

let pdfjsPromise: Promise<PdfJsModule> | null = null;

export function loadBrowserPdfJs(): Promise<PdfJsModule> {
  pdfjsPromise ??= import("pdfjs-dist/legacy/build/pdf.mjs")
    .then((pdfjs) => {
      if (!pdfjs.GlobalWorkerOptions.workerPort) {
        pdfjs.GlobalWorkerOptions.workerPort = new Worker(new URL("./pdf.worker.ts", import.meta.url), {
          type: "module",
        });
      }
      return pdfjs;
    })
    .catch((error: unknown) => {
      pdfjsPromise = null; // allow a retry (e.g. transient chunk-load failure)
      throw error;
    });
  return pdfjsPromise;
}
