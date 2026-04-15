"use client";

// Barra superiore: titolo, selettore esempi, toggle Raggi X.

import { Ghost, Scan, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHighlight } from "@/hooks/useHighlight";
import { EXAMPLES } from "@/lib/examples";

interface Props {
  onLoadExample: (id: string) => void;
  currentExample: string;
}

export default function TopBar({ onLoadExample, currentExample }: Props) {
  const { mode, setMode, clear } = useHighlight();

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--bd)] flex-shrink-0 flex-wrap bg-[var(--sf)]">
      <h1 className="text-base font-black tracking-tight">
        <Ghost
          className="inline -mt-1 mr-1"
          size={18}
          color="#ff6b6b"
        />
        <span className="bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#a78bfa] bg-clip-text text-transparent">
          DIV Explorer
        </span>
      </h1>
      <span className="text-[11px] text-[var(--mu)]">
        Passa il mouse per rivelare i div invisibili
      </span>

      <div className="ml-auto flex items-center gap-2">
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

        <div className="flex items-center gap-1 ml-2">
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
