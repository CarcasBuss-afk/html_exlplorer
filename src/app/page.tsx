"use client";

// Pagina principale: orchestra editor, parsing, preview, albero, tooltip,
// sidebar del percorso didattico e modalità esercizio.

import { useEffect, useMemo, useState } from "react";
import { HighlightProvider } from "@/hooks/useHighlight";
import { useDebounced } from "@/hooks/useDebounced";
import { parseHtml } from "@/lib/htmlParser";
import { parseCss, splitSelectors } from "@/lib/cssParser";
import { DEFAULT_EXAMPLE, EXAMPLES } from "@/lib/examples";
import {
  CHAPTERS,
  EXERCISES,
  adjacentExercises,
  findExercise,
} from "@/lib/exercises";
import { loadProgress, markCompleted } from "@/lib/progressStorage";
import type {
  CheckResult,
  Exercise,
  ExerciseProgress,
} from "@/types/explorer";
import TopBar from "@/components/features/TopBar";
import CollapsiblePanel from "@/components/features/CollapsiblePanel";
import PreviewPanel from "@/components/features/PreviewPanel";
import HtmlEditorPanel from "@/components/features/HtmlEditorPanel";
import CssEditorPanel from "@/components/features/CssEditorPanel";
import InfoTooltip from "@/components/features/InfoTooltip";
import ResizableColumns from "@/components/features/ResizableColumns";
import ExerciseBar from "@/components/features/ExerciseBar";
import ChecklistBar from "@/components/features/ChecklistBar";
import ExerciseLayout from "@/components/features/ExerciseLayout";
import ExerciseSidebar from "@/components/features/ExerciseSidebar";

export type EditorLayout = "side" | "stacked";

export default function Home() {
  const [htmlSrc, setHtmlSrc] = useState(DEFAULT_EXAMPLE.html);
  const [cssSrc, setCssSrc] = useState(DEFAULT_EXAMPLE.css);
  const [exampleId, setExampleId] = useState(DEFAULT_EXAMPLE.id);
  const [editorLayout, setEditorLayout] = useState<EditorLayout>("side");
  const [editorFontSize, setEditorFontSize] = useState(14);

  // Modalità esercizio
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [progress, setProgress] = useState<ExerciseProgress>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Carica i progressi salvati dal localStorage al primo render lato client.
  // È un'idratazione da API browser (localStorage non disponibile in SSR),
  // quindi richiede setState in effect.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  // Debounce del sorgente per evitare re-render ad ogni keystroke
  const debouncedHtml = useDebounced(htmlSrc, 300);
  const debouncedCss = useDebounced(cssSrc, 300);

  const parsed = useMemo(() => parseHtml(debouncedHtml), [debouncedHtml]);
  const cssRules = useMemo(() => parseCss(debouncedCss), [debouncedCss]);

  // Espandi i selettori composti (h1, h2 → [h1, h2]) per il matching in iframe.
  const allSelectors = useMemo(() => {
    const out: { id: string; selector: string }[] = [];
    for (const r of cssRules) {
      for (const s of splitSelectors(r.selector)) {
        out.push({ id: r.id, selector: s });
      }
    }
    return out;
  }, [cssRules]);

  // Mappa capitolo → lista esercizi, per la sidebar.
  const exercisesByChapter = useMemo(() => {
    const m = new Map<number, Exercise[]>();
    for (const ch of CHAPTERS) m.set(ch.id, []);
    for (const ex of EXERCISES) {
      const list = m.get(ex.chapter);
      if (list) list.push(ex);
    }
    return m;
  }, []);

  // Esercizi precedente/successivo rispetto a quello attivo (per navigazione)
  const adjacent = useMemo(
    () =>
      activeExercise
        ? adjacentExercises(activeExercise.id)
        : { prev: null, next: null },
    [activeExercise],
  );

  // Verifica dei check solo in modalità esercizio
  const checkResults: CheckResult[] = useMemo(() => {
    if (!activeExercise) return [];
    const ctx = { parsed, cssRules, cssSource: debouncedCss };
    return activeExercise.checks.map((c) => c(ctx));
  }, [activeExercise, parsed, cssRules, debouncedCss]);

  // Quando tutti i check diventano verdi, marca l'esercizio come completato.
  // Lo stato progress persiste in localStorage (effetto esterno legittimo).
  useEffect(() => {
    if (!activeExercise || checkResults.length === 0) return;
    const allOk = checkResults.every((r) => r.ok);
    if (allOk && !progress[activeExercise.id]) {
      const updated = markCompleted(activeExercise.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(updated);
    }
  }, [activeExercise, checkResults, progress]);

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

  function loadFile(html: string, css: string) {
    setHtmlSrc(html);
    setCssSrc(css);
    setExampleId("");
  }

  function startExercise(id: string) {
    const ex = findExercise(id);
    if (!ex) return;
    setActiveExercise(ex);
    setHtmlSrc(ex.starterHtml);
    setCssSrc(ex.starterCss);
    setExampleId("");
  }

  function exitExercise() {
    setActiveExercise(null);
  }

  function restartExercise() {
    if (!activeExercise) return;
    setHtmlSrc(activeExercise.starterHtml);
    setCssSrc(activeExercise.starterCss);
  }

  function goPrev() {
    if (adjacent.prev) startExercise(adjacent.prev.id);
  }

  function goNext() {
    if (adjacent.next) startExercise(adjacent.next.id);
  }

  const inExercise = activeExercise !== null;

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
          onLoadFile={loadFile}
          fontSize={editorFontSize}
          onFontSizeChange={setEditorFontSize}
          layoutToggleDisabled={inExercise}
          activeExerciseId={activeExercise?.id ?? null}
        />

        {/* Area principale: sidebar a sinistra + contenuto a destra */}
        <div className="flex flex-1 min-h-0">
          <ExerciseSidebar
            chapters={CHAPTERS}
            exercisesByChapter={exercisesByChapter}
            activeExerciseId={activeExercise?.id ?? null}
            progress={progress}
            collapsed={sidebarCollapsed}
            onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
            onSelectExercise={startExercise}
          />

          <div className="flex flex-col flex-1 min-w-0">
            {inExercise && activeExercise ? (
              <ExerciseBar
                exercise={activeExercise}
                onRestart={restartExercise}
                onExit={exitExercise}
                completed={!!progress[activeExercise.id]}
                hasPrev={!!adjacent.prev}
                hasNext={!!adjacent.next}
                onPrev={goPrev}
                onNext={goNext}
              />
            ) : null}

            {inExercise && activeExercise ? (
              <ExerciseLayout
                exercise={activeExercise}
                htmlSrc={htmlSrc}
                cssSrc={cssSrc}
                onHtmlChange={setHtmlSrc}
                onCssChange={setCssSrc}
                parsed={parsed}
                cssSource={debouncedCss}
                cssRules={cssRules}
                allSelectors={allSelectors}
                fontSize={editorFontSize}
              />
            ) : editorLayout === "side" ? (
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

            {/* Footer: checklist in modalità esercizio, legenda altrimenti */}
            {inExercise ? (
              <ChecklistBar results={checkResults} />
            ) : (
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
            )}
          </div>
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
