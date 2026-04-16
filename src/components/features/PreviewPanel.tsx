"use client";

// Colonna 1: browser (iframe) + albero SVG dinamico.
// Include controlli di zoom per entrambe le sezioni.

import { useState } from "react";
import type { ParsedHtml } from "@/types/explorer";
import BrowserFrame from "./BrowserFrame";
import HierarchyTree from "./HierarchyTree";
import ZoomControls from "./ZoomControls";
import { useHighlight } from "@/hooks/useHighlight";

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
  const { previewTheme } = useHighlight();
  const [previewZoom, setPreviewZoom] = useState(1);
  const [treeZoom, setTreeZoom] = useState(1);

  return (
    <div className="h-full flex flex-col p-3 gap-3 overflow-hidden">
      {/* Preview con zoom */}
      <div className="flex-1 min-h-[200px] min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mu)]">
            Preview
          </span>
          <ZoomControls
            zoom={previewZoom}
            onZoom={setPreviewZoom}
            min={0.3}
            max={2.5}
            step={0.15}
          />
        </div>
        <div className="flex-1 min-h-0">
          <BrowserFrame
            parsed={parsed}
            cssSource={cssSource}
            allSelectors={allSelectors}
            previewTheme={previewTheme}
            zoom={previewZoom}
          />
        </div>
      </div>

      {/* Albero con zoom */}
      <div className="flex-shrink-0 bg-[var(--sf)] rounded-lg border border-[var(--bd)] overflow-hidden max-h-[45%] flex flex-col">
        <div className="font-mono text-[10px] px-3 py-1.5 bg-[var(--sf2)] text-[var(--mu)] tracking-wider uppercase flex-shrink-0 flex items-center justify-between">
          <span>▼ Albero della gerarchia</span>
          <ZoomControls
            zoom={treeZoom}
            onZoom={setTreeZoom}
            min={0.3}
            max={3}
            step={0.2}
          />
        </div>
        <div className="p-3 overflow-auto explorer-scroll flex-1">
          <div
            style={{
              transform: `scale(${treeZoom})`,
              transformOrigin: "center top",
            }}
          >
            <HierarchyTree parsed={parsed} />
          </div>
        </div>
      </div>
    </div>
  );
}
