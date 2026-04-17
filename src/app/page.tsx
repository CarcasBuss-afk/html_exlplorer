"use client";

// Pagina principale: orchestra editor, parsing, preview, albero e tooltip.

import { useMemo, useState } from "react";
import { HighlightProvider } from "@/hooks/useHighlight";
import { useDebounced } from "@/hooks/useDebounced";
import { parseHtml } from "@/lib/htmlParser";
import { parseCss, splitSelectors } from "@/lib/cssParser";
import { DEFAULT_EXAMPLE, EXAMPLES } from "@/lib/examples";
import TopBar from "@/components/features/TopBar";
import CollapsiblePanel from "@/components/features/CollapsiblePanel";
import PreviewPanel from "@/components/features/PreviewPanel";
import HtmlEditorPanel from "@/components/features/HtmlEditorPanel";
import CssEditorPanel from "@/components/features/CssEditorPanel";
import InfoTooltip from "@/components/features/InfoTooltip";
import ResizableColumns from "@/components/features/ResizableColumns";

export type EditorLayout = "side" | "stacked";

export default function Home() {
  const [htmlSrc, setHtmlSrc] = useState(DEFAULT_EXAMPLE.html);
  const [cssSrc, setCssSrc] = useState(DEFAULT_EXAMPLE.css);
  const [exampleId, setExampleId] = useState(DEFAULT_EXAMPLE.id);
  const [editorLayout, setEditorLayout] = useState<EditorLayout>("side");
  const [editorFontSize, setEditorFontSize] = useState(14);

  // Debounce del sorgente per evitare re-render ad ogni keystroke
  const debouncedHtml = useDebounced(htmlSrc, 300);
  const debouncedCss = useDebounced(cssSrc, 300);

  const parsed = useMemo(() => parseHtml(debouncedHtml), [debouncedHtml]);
  const cssRules = useMemo(() => parseCss(debouncedCss), [debouncedCss]);

  // Espandi i selettori composti (h1, h2 → [h1, h2]) per il matching in iframe.
  // Ogni selettore singolo resta collegato alla sua regola originale tramite ruleId.
  const allSelectors = useMemo(() => {
    const out: { id: string; selector: string }[] = [];
    for (const r of cssRules) {
      for (const s of splitSelectors(r.selector)) {
        out.push({ id: r.id, selector: s });
      }
    }
    return out;
  }, [cssRules]);

  function loadExample(id: string) {
    const ex = EXAMPLES.find((e) => e.id === id);
    if (!ex) return;
    setHtmlSrc(ex.html);
    setCssSrc(ex.css);
    setExampleId(id);
  }

  function clearAll() {
    setHtmlSrc("");
    setCssSrc("");
    setExampleId("");
  }

  return (
    <HighlightProvider>
      <div className="flex flex-col h-full">
        <TopBar
          onLoadExample={loadExample}
          currentExample={exampleId}
          htmlSrc={htmlSrc}
          cssSrc={cssSrc}
          editorLayout={editorLayout}
          onToggleLayout={() =>
            setEditorLayout((l) => (l === "side" ? "stacked" : "side"))
          }
          onClearAll={clearAll}
          fontSize={editorFontSize}
          onFontSizeChange={setEditorFontSize}
        />

        {editorLayout === "side" ? (
          <ResizableColumns
            key="side"
            initialWeights={[0.55, 0.225, 0.225]}
          >
            <CollapsiblePanel
              title="Preview + Albero"
              num={1}
              accent="#ff6b6b"
            >
              <PreviewPanel
                parsed={parsed}
                cssSource={debouncedCss}
                allSelectors={allSelectors}
              />
            </CollapsiblePanel>

            <CollapsiblePanel
              title="HTML — Struttura"
              num={2}
              accent="#fb923c"
            >
              <HtmlEditorPanel
                value={htmlSrc}
                onChange={setHtmlSrc}
                parsed={parsed}
                fontSize={editorFontSize}
              />
            </CollapsiblePanel>

            <CollapsiblePanel title="CSS — Stile" num={3} accent="#4ecdc4">
              <CssEditorPanel
                value={cssSrc}
                onChange={setCssSrc}
                parsed={parsed}
                cssRules={cssRules}
                fontSize={editorFontSize}
              />
            </CollapsiblePanel>
          </ResizableColumns>
        ) : (
          <ResizableColumns key="stacked" initialWeights={[0.55, 0.45]}>
            <CollapsiblePanel
              title="Preview + Albero"
              num={1}
              accent="#ff6b6b"
            >
              <PreviewPanel
                parsed={parsed}
                cssSource={debouncedCss}
                allSelectors={allSelectors}
              />
            </CollapsiblePanel>

            <CollapsiblePanel
              title="HTML + CSS"
              num={2}
              accent="#fb923c"
            >
              <ResizableColumns
                direction="column"
                initialWeights={[0.5, 0.5]}
                minSizePx={80}
              >
                <div className="flex flex-col min-h-0 border-b border-[var(--bd)]">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--sf2)] border-b border-[var(--bd)] flex-shrink-0">
                    <span className="w-3 h-3 rounded-full bg-[#fb923c] flex items-center justify-center text-[7px] font-bold text-black">H</span>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--mu)]">HTML — Struttura</span>
                  </div>
                  <div className="flex-1 min-h-0">
                    <HtmlEditorPanel
                      value={htmlSrc}
                      onChange={setHtmlSrc}
                      parsed={parsed}
                      fontSize={editorFontSize}
                    />
                  </div>
                </div>
                <div className="flex flex-col min-h-0">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--sf2)] border-b border-[var(--bd)] flex-shrink-0">
                    <span className="w-3 h-3 rounded-full bg-[#4ecdc4] flex items-center justify-center text-[7px] font-bold text-black">C</span>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--mu)]">CSS — Stile</span>
                  </div>
                  <div className="flex-1 min-h-0">
                    <CssEditorPanel
                      value={cssSrc}
                      onChange={setCssSrc}
                      parsed={parsed}
                      cssRules={cssRules}
                      fontSize={editorFontSize}
                    />
                  </div>
                </div>
              </ResizableColumns>
            </CollapsiblePanel>
          </ResizableColumns>
        )}

        {/* Legenda concetti in fondo */}
        <div className="flex border-t border-[var(--bd)] flex-shrink-0 bg-[var(--sf)] text-[11px]">
          <LegendItem icon="👻" label="Div invisibili" desc="usa Raggi X" />
          <LegendItem
            icon="👆"
            label="Genitore → Figlio"
            desc="chi contiene chi"
          />
          <LegendItem
            icon="👫"
            label="Fratelli"
            desc="stesso livello, stesso genitore"
          />
          <LegendItem icon="🎨" label="HTML = struttura · CSS = stile" />
        </div>

        <InfoTooltip parsed={parsed} />
      </div>
    </HighlightProvider>
  );
}

function LegendItem({
  icon,
  label,
  desc,
}: {
  icon: string;
  label: string;
  desc?: string;
}) {
  return (
    <div className="flex-1 px-3 py-1.5 flex items-center gap-2 border-r border-[var(--bd)] last:border-r-0">
      <span className="text-base">{icon}</span>
      <div className="leading-tight">
        <b className="text-[var(--tx)]">{label}</b>
        {desc ? <span className="text-[var(--mu)]"> — {desc}</span> : null}
      </div>
    </div>
  );
}
