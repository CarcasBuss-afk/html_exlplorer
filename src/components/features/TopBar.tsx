"use client";

// Barra superiore: titolo, selettore esempi, toggle Raggi X, theme preview, export.

import {
  Ghost,
  Scan,
  MousePointer2,
  Moon,
  Sun,
  Download,
  Upload,
  Columns2,
  Rows2,
  FilePlus2,
  AArrowUp,
  AArrowDown,
  GraduationCap,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useHighlight } from "@/hooks/useHighlight";
import { EXAMPLES } from "@/lib/examples";
import { EXERCISES } from "@/lib/exercises";
import { downloadHtmlFile } from "@/lib/exporter";
import { parseHtmlFile } from "@/lib/importer";
import type { EditorLayout } from "@/app/page";
import type { ExerciseProgress } from "@/types/explorer";

interface Props {
  onLoadExample: (id: string) => void;
  currentExample: string;
  htmlSrc: string;
  cssSrc: string;
  editorLayout: EditorLayout;
  onToggleLayout: () => void;
  onClearAll: () => void;
  onLoadFile: (html: string, css: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onStartExercise: (id: string) => void;
  activeExerciseId: string | null;
  exerciseProgress: ExerciseProgress;
  layoutToggleDisabled: boolean;
}

export default function TopBar({
  onLoadExample,
  currentExample,
  htmlSrc,
  cssSrc,
  editorLayout,
  onToggleLayout,
  onClearAll,
  onLoadFile,
  fontSize,
  onFontSizeChange,
  onStartExercise,
  activeExerciseId,
  exerciseProgress,
  layoutToggleDisabled,
}: Props) {
  const completedCount = Object.values(exerciseProgress).filter(Boolean).length;
  const totalExercises = EXERCISES.length;
  const { mode, setMode, clear, previewTheme, setPreviewTheme } =
    useHighlight();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleExport() {
    const ex = EXAMPLES.find((e) => e.id === currentExample);
    const fname = ex ? `${ex.id}.html` : "mio-progetto.html";
    downloadHtmlFile(htmlSrc, cssSrc, fname);
  }

  function handleFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset del value così si può ricaricare lo stesso file.
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      const { html, css } = parseHtmlFile(text);
      onLoadFile(html, css);
      clear();
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--bd)] flex-shrink-0 flex-wrap bg-[var(--sf)]">
      <h1 className="text-base font-black tracking-tight">
        <Ghost className="inline -mt-1 mr-1" size={18} color="#ff6b6b" />
        <span className="bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#a78bfa] bg-clip-text text-transparent">
          DIV Explorer
        </span>
      </h1>
      <span className="text-[11px] text-[var(--mu)]">
        Passa il mouse per rivelare i div invisibili
      </span>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#34d399] hover:text-[#34d399] transition-all"
          onClick={() => {
            if (window.confirm("Svuotare HTML e CSS per iniziare un nuovo progetto?")) {
              onClearAll();
            }
          }}
          title="Nuovo progetto: svuota HTML e CSS"
        >
          <FilePlus2 size={11} /> NUOVO
        </button>

        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#60a5fa] hover:text-[#60a5fa] transition-all"
          onClick={() => fileInputRef.current?.click()}
          title="Carica un file HTML salvato in precedenza"
        >
          <Upload size={11} /> CARICA
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,text/html"
          hidden
          onChange={handleFileChosen}
        />

        <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--mu)] flex items-center gap-1">
          <GraduationCap size={12} className="text-[#a78bfa]" />
          Esercizio:
        </label>
        <select
          value={activeExerciseId ?? ""}
          onChange={(e) => {
            if (e.target.value) onStartExercise(e.target.value);
          }}
          className="bg-[var(--sf2)] border border-[var(--bd)] text-[var(--tx)] text-[11px] rounded px-2 py-1 font-mono focus:outline-none focus:border-[#a78bfa]"
          title={`Completati: ${completedCount}/${totalExercises}`}
        >
          <option value="">
            {completedCount > 0
              ? `— scegli (${completedCount}/${totalExercises}) —`
              : "— scegli un esercizio —"}
          </option>
          {EXERCISES.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {exerciseProgress[ex.id] ? "✓ " : ""}
              Liv. {ex.level} · {ex.title}
            </option>
          ))}
        </select>

        <label className="text-[10px] font-mono uppercase tracking-wider text-[var(--mu)]">
          Esempio:
        </label>
        <select
          value={currentExample}
          onChange={(e) => onLoadExample(e.target.value)}
          className="bg-[var(--sf2)] border border-[var(--bd)] text-[var(--tx)] text-[11px] rounded px-2 py-1 font-mono focus:outline-none focus:border-[var(--mu)]"
        >
          {EXAMPLES.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-0.5 border border-[var(--bd)] rounded overflow-hidden">
          <button
            className="flex items-center px-1.5 py-1 text-[var(--mu)] bg-[var(--sf)] hover:bg-[var(--sf2)] hover:text-[var(--tx)] transition-colors disabled:opacity-30"
            onClick={() => onFontSizeChange(Math.max(10, fontSize - 2))}
            disabled={fontSize <= 10}
            title="Riduci font editor"
          >
            <AArrowDown size={13} />
          </button>
          <span className="font-mono text-[9px] text-[var(--mu)] px-1 bg-[var(--sf)] min-w-[28px] text-center py-1">
            {fontSize}
          </span>
          <button
            className="flex items-center px-1.5 py-1 text-[var(--mu)] bg-[var(--sf)] hover:bg-[var(--sf2)] hover:text-[var(--tx)] transition-colors disabled:opacity-30"
            onClick={() => onFontSizeChange(Math.min(28, fontSize + 2))}
            disabled={fontSize >= 28}
            title="Ingrandisci font editor"
          >
            <AArrowUp size={13} />
          </button>
        </div>

        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[var(--bd)] disabled:hover:text-[var(--mu)]"
          onClick={onToggleLayout}
          disabled={layoutToggleDisabled}
          title={
            layoutToggleDisabled
              ? "Layout bloccato durante l'esercizio"
              : editorLayout === "side"
                ? "Impila editor verticalmente"
                : "Affianca editor"
          }
        >
          {editorLayout === "side" ? (
            <><Rows2 size={11} /> IMPILA</>
          ) : (
            <><Columns2 size={11} /> AFFIANCA</>
          )}
        </button>

        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)] transition-all"
          onClick={() =>
            setPreviewTheme(previewTheme === "light" ? "dark" : "light")
          }
          title="Cambia sfondo della preview"
        >
          {previewTheme === "light" ? (
            <>
              <Sun size={11} /> CHIARO
            </>
          ) : (
            <>
              <Moon size={11} /> SCURO
            </>
          )}
        </button>

        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
          onClick={handleExport}
          title="Scarica il progetto come file HTML"
        >
          <Download size={11} /> SCARICA
        </button>

        <div className="flex items-center gap-1 ml-1">
          <button
            className={cn(
              "flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border transition-all",
              mode === "hover"
                ? "border-[#4ecdc4] text-[#4ecdc4] bg-[rgba(78,205,196,0.08)]"
                : "border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)]",
            )}
            onClick={() => {
              setMode("hover");
              clear();
            }}
          >
            <MousePointer2 size={11} /> HOVER
          </button>
          <button
            className={cn(
              "flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border transition-all",
              mode === "xray"
                ? "border-[#ff6b6b] text-[#ff6b6b] bg-[rgba(255,107,107,0.08)]"
                : "border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)]",
            )}
            onClick={() => {
              setMode(mode === "xray" ? "hover" : "xray");
              clear();
            }}
          >
            <Scan size={11} /> RAGGI X
          </button>
        </div>
      </div>
    </div>
  );
}
