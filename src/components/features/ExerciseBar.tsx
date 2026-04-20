"use client";

// Banner superiore visibile in modalità esercizio: titolo, livello, consegna
// e bottoni per ricominciare o uscire.

import { GraduationCap, RotateCcw, X } from "lucide-react";
import type { Exercise } from "@/types/explorer";

interface Props {
  exercise: Exercise;
  onRestart: () => void;
  onExit: () => void;
  completed: boolean;
}

export default function ExerciseBar({
  exercise,
  onRestart,
  onExit,
  completed,
}: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--bd)] flex-shrink-0 bg-[rgba(167,139,250,0.08)]">
      <GraduationCap size={16} className="text-[#a78bfa] flex-shrink-0" />
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#a78bfa] text-black font-bold">
          Liv. {exercise.level}
        </span>
        <span className="font-bold text-[13px] text-[var(--tx)]">
          {exercise.title}
        </span>
        {completed ? (
          <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#34d399] text-black font-bold">
            Completato
          </span>
        ) : null}
      </div>
      <span className="text-[12px] text-[var(--mu)] flex-1 min-w-0 truncate">
        {exercise.consegna}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#fbbf24] hover:text-[#fbbf24] transition-all"
          onClick={onRestart}
          title="Riparti dal codice iniziale"
        >
          <RotateCcw size={11} /> RICOMINCIA
        </button>
        <button
          className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#ff6b6b] hover:text-[#ff6b6b] transition-all"
          onClick={onExit}
          title="Esci dalla modalità esercizio"
        >
          <X size={11} /> ESCI
        </button>
      </div>
    </div>
  );
}
