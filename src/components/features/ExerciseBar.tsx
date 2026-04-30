"use client";

// Banner superiore visibile in modalità esercizio: capitolo+titolo, navigazione
// (precedente/prossimo), consegna, teoria breve collassabile, ricomincia/esci.

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import type { Exercise } from "@/types/explorer";
import { findChapter } from "@/lib/exercises";
import { cn } from "@/lib/utils";

interface Props {
  exercise: Exercise;
  onRestart: () => void;
  onExit: () => void;
  completed: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  tutorOpen: boolean;
  onToggleTutor: () => void;
}

export default function ExerciseBar({
  exercise,
  onRestart,
  onExit,
  completed,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  tutorOpen,
  onToggleTutor,
}: Props) {
  const [introOpen, setIntroOpen] = useState(false);
  const chapter = findChapter(exercise.chapter);
  const accent = chapter?.accent ?? "#a78bfa";
  const hasIntro = !!exercise.intro && exercise.intro.trim().length > 0;

  return (
    <div className="flex flex-col border-b border-[var(--bd)] flex-shrink-0 bg-[rgba(167,139,250,0.05)]">
      {/* Riga principale: titolo + consegna + bottoni */}
      <div className="flex items-center gap-3 px-4 py-2">
        <GraduationCap
          size={16}
          className="flex-shrink-0"
          style={{ color: accent }}
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded text-black font-bold"
            style={{ background: accent }}
          >
            Cap. {exercise.chapter}
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

        <div className="flex items-center gap-1 flex-shrink-0">
          {hasIntro ? (
            <button
              className={cn(
                "flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded border transition-all",
                introOpen
                  ? "border-[#fbbf24] text-[#fbbf24] bg-[rgba(251,191,36,0.08)]"
                  : "border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#fbbf24] hover:text-[#fbbf24]",
              )}
              onClick={() => setIntroOpen((v) => !v)}
              title={introOpen ? "Nascondi teoria" : "Mostra teoria"}
            >
              <Lightbulb size={11} />
              {introOpen ? "CHIUDI" : "TEORIA"}
              <ChevronDown
                size={10}
                className={cn("transition-transform", !introOpen && "-rotate-90")}
              />
            </button>
          ) : null}

          <button
            className={cn(
              "flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded border transition-all",
              tutorOpen
                ? "border-[#a78bfa] text-[#a78bfa] bg-[rgba(167,139,250,0.08)]"
                : "border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#a78bfa] hover:text-[#a78bfa]",
            )}
            onClick={onToggleTutor}
            title="Chiedi aiuto al tutor AI"
          >
            <Sparkles size={11} />
            TUTOR
          </button>

          <button
            className="flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={onPrev}
            disabled={!hasPrev}
            title="Esercizio precedente"
          >
            <ChevronLeft size={11} /> PREC
          </button>
          <button
            className="flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[var(--mu)] hover:text-[var(--tx)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={onNext}
            disabled={!hasNext}
            title="Prossimo esercizio"
          >
            PROSS <ChevronRight size={11} />
          </button>

          <button
            className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[var(--bd)] text-[var(--mu)] bg-[var(--sf)] hover:border-[#fbbf24] hover:text-[#fbbf24] transition-all ml-1"
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

      {/* Sezione teoria (collassabile) */}
      {hasIntro && introOpen ? (
        <div
          className="flex items-start gap-2 px-4 pb-2 pt-0 text-[12px] text-[var(--tx)] leading-relaxed border-t border-[var(--bd)]/50"
          style={{ background: "rgba(251,191,36,0.04)" }}
        >
          <Lightbulb
            size={13}
            className="text-[#fbbf24] mt-0.5 flex-shrink-0"
          />
          <p className="m-0">{exercise.intro}</p>
        </div>
      ) : null}
    </div>
  );
}
