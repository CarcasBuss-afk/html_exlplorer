"use client";

// Barra inferiore in modalità esercizio: lista dei requisiti auto-verificati
// con ✅ / ⬜ e percentuale di completamento. Sostituisce la legenda concetti
// mentre l'esercizio è attivo.

import { CheckCircle2, Circle, PartyPopper } from "lucide-react";
import type { CheckResult } from "@/types/explorer";

interface Props {
  results: CheckResult[];
  onComplete?: () => void;
}

export default function ChecklistBar({ results }: Props) {
  const total = results.length;
  const done = results.filter((r) => r.ok).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-t border-[var(--bd)] flex-shrink-0 bg-[var(--sf)] text-[11px] overflow-x-auto explorer-scroll">
      <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[10px] uppercase tracking-wider">
        {allDone ? (
          <PartyPopper size={14} className="text-[#34d399]" />
        ) : null}
        <span
          className={
            allDone
              ? "text-[#34d399] font-bold"
              : "text-[var(--mu)]"
          }
        >
          {done}/{total} · {pct}%
        </span>
        {/* Barra di progresso */}
        <div className="w-24 h-1.5 rounded bg-[var(--sf2)] overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${pct}%`,
              background: allDone ? "#34d399" : "#a78bfa",
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0 flex-wrap">
        {results.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 flex-shrink-0"
            title={r.message}
          >
            {r.ok ? (
              <CheckCircle2 size={13} className="text-[#34d399] flex-shrink-0" />
            ) : (
              <Circle size={13} className="text-[var(--mu)] flex-shrink-0" />
            )}
            <span
              className={
                r.ok
                  ? "text-[var(--tx)]"
                  : "text-[var(--mu)]"
              }
            >
              {r.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
