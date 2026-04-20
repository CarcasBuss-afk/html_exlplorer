"use client";

// Layout dedicato alla modalità esercizio:
// ┌───────────────────────────────────────────────────┐
// │ Modello     │ Tuo lavoro    │ Gerarchia           │  ← top (3 zone)
// ├───────────────────────────────────────────────────┤
// │ HTML — Struttura        │ CSS — Stile             │  ← bottom (2 zone)
// └───────────────────────────────────────────────────┘
//
// Usa ResizableColumns annidati: outer column (top/bottom),
// inner row top (3 pannelli), inner row bottom (2 pannelli).

import { useState } from "react";
import type { Exercise, ParsedHtml, CssRule } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";
import BrowserFrame from "./BrowserFrame";
import HierarchyTree from "./HierarchyTree";
import CollapsiblePanel from "./CollapsiblePanel";
import ResizableColumns from "./ResizableColumns";
import TargetPreview from "./TargetPreview";
import HtmlEditorPanel from "./HtmlEditorPanel";
import CssEditorPanel from "./CssEditorPanel";
import ZoomControls from "./ZoomControls";

interface Props {
  exercise: Exercise;
  htmlSrc: string;
  cssSrc: string;
  onHtmlChange: (v: string) => void;
  onCssChange: (v: string) => void;
  parsed: ParsedHtml;
  cssSource: string;
  cssRules: CssRule[];
  allSelectors: { id: string; selector: string }[];
  fontSize: number;
}

export default function ExerciseLayout({
  exercise,
  htmlSrc,
  cssSrc,
  onHtmlChange,
  onCssChange,
  parsed,
  cssSource,
  cssRules,
  allSelectors,
  fontSize,
}: Props) {
  const { previewTheme } = useHighlight();
  const [previewZoom, setPreviewZoom] = useState(1);
  const [treeZoom, setTreeZoom] = useState(1);

  return (
    <ResizableColumns
      direction="column"
      initialWeights={[0.6, 0.4]}
      minSizePx={120}
    >
      {/* Riga in alto: 3 zone visive */}
      <div className="flex min-h-0 min-w-0">
        <ResizableColumns initialWeights={[1 / 3, 1 / 3, 1 / 3]}>
          <CollapsiblePanel title="Modello" num={1} accent="#a78bfa">
            <div className="h-full p-3">
              <TargetPreview
                html={exercise.targetHtml}
                css={exercise.targetCss}
                previewTheme={previewTheme}
              />
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Tuo lavoro" num={2} accent="#fb923c">
            <div className="h-full p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
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
          </CollapsiblePanel>

          <CollapsiblePanel title="Gerarchia" num={3} accent="#4ecdc4">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--sf2)] border-b border-[var(--bd)] flex-shrink-0">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mu)]">
                  Albero
                </span>
                <ZoomControls
                  zoom={treeZoom}
                  onZoom={setTreeZoom}
                  min={0.3}
                  max={3}
                  step={0.2}
                />
              </div>
              <div className="flex-1 min-h-0 overflow-auto explorer-scroll p-3">
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
          </CollapsiblePanel>
        </ResizableColumns>
      </div>

      {/* Riga in basso: 2 zone editor */}
      <div className="flex min-h-0 min-w-0 border-t border-[var(--bd)]">
        <ResizableColumns initialWeights={[0.5, 0.5]}>
          <CollapsiblePanel title="HTML — Struttura" num={4} accent="#fb923c">
            <HtmlEditorPanel
              value={htmlSrc}
              onChange={onHtmlChange}
              parsed={parsed}
              fontSize={fontSize}
            />
          </CollapsiblePanel>

          <CollapsiblePanel title="CSS — Stile" num={5} accent="#4ecdc4">
            <CssEditorPanel
              value={cssSrc}
              onChange={onCssChange}
              parsed={parsed}
              cssRules={cssRules}
              fontSize={fontSize}
            />
          </CollapsiblePanel>
        </ResizableColumns>
      </div>
    </ResizableColumns>
  );
}
