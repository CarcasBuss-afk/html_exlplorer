"use client";

// Setup di Monaco con:
// - Worker HTML/CSS locali (no CDN) → garantisce IntelliSense completo
// - Emmet per HTML e CSS → espansione abbreviazioni tipo VS Code
//   (es. "h1" + Tab → "<h1></h1>", "ul>li*3" + Tab → lista con 3 li)

import { loader } from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";

let configured = false;
let configPromise: Promise<void> | null = null;

export function setupMonaco(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (configured) return Promise.resolve();
  if (configPromise) return configPromise;

  configPromise = (async () => {
    // Worker locali: registrati prima di importare monaco
    const w = window as unknown as {
      MonacoEnvironment?: {
        getWorker(workerId: string, label: string): Worker;
      };
    };
    w.MonacoEnvironment = {
      getWorker(_workerId: string, label: string) {
        if (label === "css" || label === "scss" || label === "less") {
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/css/css.worker.js",
              import.meta.url,
            ),
          );
        }
        if (
          label === "html" ||
          label === "handlebars" ||
          label === "razor"
        ) {
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/html/html.worker.js",
              import.meta.url,
            ),
          );
        }
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/editor/editor.worker.js",
            import.meta.url,
          ),
        );
      },
    };

    const monaco = await import("monaco-editor");
    loader.config({ monaco });

    // Attiva Emmet per HTML e CSS a livello globale (tutti gli editor Monaco)
    // Tab: espande abbreviazione; Esc: chiude suggerimento.
    emmetHTML(
      monaco as unknown as Parameters<typeof emmetHTML>[0],
    );
    emmetCSS(
      monaco as unknown as Parameters<typeof emmetCSS>[0],
    );

    configured = true;
  })();

  return configPromise;
}
