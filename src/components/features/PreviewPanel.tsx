"use client";

// Colonna 1: browser (iframe) + albero SVG dinamico.

import type { ParsedHtml } from "@/types/explorer";
import BrowserFrame from "./BrowserFrame";
import HierarchyTree from "./HierarchyTree";

interface Props {
  parsed: ParsedHtml;
  cssSource: string;
  allSelectors: { id: string; selector: string }[];
}

export default function PreviewPanel({
  parsed,
  cssSource,
  allSelectors,
}: Props) {
  return (
    <div className="h-full flex flex-col p-3 gap-3 overflow-hidden">
      {/* Preview: riempie lo spazio verticale disponibile */}
      <div className="flex-1 min-h-[260px] min-w-0">
        <BrowserFrame
          parsed={parsed}
          cssSource={cssSource}
          allSelectors={allSelectors}
        />
      </div>

      {/* Albero: sotto la preview, altezza fissa con scroll interno */}
      <div className="flex-shrink-0 bg-[var(--sf)] rounded-lg border border-[var(--bd)] overflow-hidden max-h-[45%] flex flex-col">
        <div className="font-mono text-[10px] px-3 py-1.5 bg-[var(--sf2)] text-[var(--mu)] tracking-wider uppercase flex-shrink-0">
          ▼ Albero della gerarchia
        </div>
        <div className="p-3 overflow-auto explorer-scroll flex-1">
          <HierarchyTree parsed={parsed} />
        </div>
      </div>
    </div>
  );
}
