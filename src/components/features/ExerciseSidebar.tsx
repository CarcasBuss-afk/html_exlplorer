"use client";

// Sidebar sinistra con il percorso didattico:
// - lista capitoli (collassabili)
// - dentro ogni capitolo, lista esercizi con ✓ completato e highlight attivo
// - la sidebar stessa è riducibile a una strip verticale (32px) per recuperare
//   spazio di lavoro quando lo studente non la sta usando.

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronsLeft, ChevronsRight, GraduationCap } from "lucide-react";
import type { Chapter, Exercise, ExerciseProgress } from "@/types/explorer";
import { cn } from "@/lib/utils";

interface Props {
  chapters: Chapter[];
  exercisesByChapter: Map<number, Exercise[]>;
  activeExerciseId: string | null;
  progress: ExerciseProgress;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSelectExercise: (id: string) => void;
}

export default function ExerciseSidebar({
  chapters,
  exercisesByChapter,
  activeExerciseId,
  progress,
  collapsed,
  onToggleCollapsed,
  onSelectExercise,
}: Props) {
  // Capitoli aperti: di default apro quello dell'esercizio attivo, oppure
  // il primo che contiene almeno un esercizio.
  const [openChapters, setOpenChapters] = useState<Set<number>>(() => {
    const set = new Set<number>();
    // Apri il capitolo con esercizi, così si vede subito qualcosa
    for (const ch of chapters) {
      const list = exercisesByChapter.get(ch.id) ?? [];
      if (list.length > 0) {
        set.add(ch.id);
        break;
      }
    }
    return set;
  });

  function toggleChapter(id: number) {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Totali completati
  const totalExercises = [...exercisesByChapter.values()].reduce(
    (s, list) => s + list.length,
    0,
  );
  const totalCompleted = Object.values(progress).filter(Boolean).length;

  if (collapsed) {
    return (
      <div className="flex flex-col items-center w-8 border-r border-[var(--bd)] bg-[var(--sf)] flex-shrink-0">
        <button
          onClick={onToggleCollapsed}
          className="w-full py-2 flex justify-center text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--sf2)] transition-colors border-b border-[var(--bd)]"
          title="Apri percorso esercizi"
        >
          <ChevronsRight size={14} />
        </button>
        <div
          className="flex-1 w-full flex items-center justify-center py-3"
          title={`Esercizi: ${totalCompleted}/${totalExercises}`}
        >
          <div className="flex flex-col items-center gap-2 [writing-mode:vertical-rl] [text-orientation:mixed]">
            <GraduationCap size={14} className="text-[#a78bfa]" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--mu)]">
              Percorso · {totalCompleted}/{totalExercises}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[240px] border-r border-[var(--bd)] bg-[var(--sf)] flex-shrink-0 overflow-hidden">
      {/* Header sidebar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--sf2)] border-b border-[var(--bd)] flex-shrink-0">
        <GraduationCap size={14} className="text-[#a78bfa]" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--tx)] font-bold flex-1">
          Percorso
        </span>
        <span
          className="font-mono text-[10px] text-[var(--mu)]"
          title="Esercizi completati"
        >
          {totalCompleted}/{totalExercises}
        </span>
        <button
          onClick={onToggleCollapsed}
          className="text-[var(--mu)] hover:text-[var(--tx)] transition-colors"
          title="Nascondi percorso"
        >
          <ChevronsLeft size={14} />
        </button>
      </div>

      {/* Lista capitoli */}
      <div className="flex-1 overflow-y-auto explorer-scroll">
        {chapters.map((ch) => {
          const list = exercisesByChapter.get(ch.id) ?? [];
          const isOpen = openChapters.has(ch.id);
          const chDone = list.filter((e) => progress[e.id]).length;
          const isEmpty = list.length === 0;

          return (
            <div
              key={ch.id}
              className="border-b border-[var(--bd)] last:border-b-0"
            >
              <button
                onClick={() => !isEmpty && toggleChapter(ch.id)}
                disabled={isEmpty}
                className={cn(
                  "w-full flex items-center gap-1.5 px-2 py-1.5 text-left transition-colors",
                  isEmpty
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[var(--sf2)] cursor-pointer",
                )}
                title={isEmpty ? "Presto disponibile" : ch.description}
              >
                {isEmpty ? (
                  <ChevronRight size={12} className="text-[var(--mu)] flex-shrink-0" />
                ) : isOpen ? (
                  <ChevronDown size={12} className="text-[var(--mu)] flex-shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-[var(--mu)] flex-shrink-0" />
                )}
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-black flex-shrink-0"
                  style={{ background: ch.accent }}
                >
                  {ch.id}
                </span>
                <span className="flex-1 text-[11px] font-bold text-[var(--tx)] truncate">
                  {ch.title}
                </span>
                {!isEmpty ? (
                  <span
                    className={cn(
                      "font-mono text-[9px] tabular-nums flex-shrink-0",
                      chDone === list.length
                        ? "text-[#34d399]"
                        : "text-[var(--mu)]",
                    )}
                  >
                    {chDone}/{list.length}
                  </span>
                ) : null}
              </button>

              {isOpen && list.length > 0 ? (
                <ul className="pb-1">
                  {list.map((ex) => {
                    const done = !!progress[ex.id];
                    const active = activeExerciseId === ex.id;
                    return (
                      <li key={ex.id}>
                        <button
                          onClick={() => onSelectExercise(ex.id)}
                          className={cn(
                            "w-full flex items-center gap-2 pl-8 pr-2 py-1 text-left text-[11px] transition-colors",
                            active
                              ? "bg-[rgba(167,139,250,0.12)] text-[var(--tx)] font-bold border-l-2"
                              : "text-[var(--mu)] hover:bg-[var(--sf2)] hover:text-[var(--tx)] border-l-2 border-transparent",
                          )}
                          style={
                            active ? { borderLeftColor: ch.accent } : undefined
                          }
                        >
                          <span
                            className={cn(
                              "w-3 h-3 rounded-full flex items-center justify-center text-[7px] font-bold flex-shrink-0",
                              done
                                ? "bg-[#34d399] text-black"
                                : "border border-[var(--bd)] text-transparent",
                            )}
                          >
                            ✓
                          </span>
                          <span className="truncate">{ex.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
