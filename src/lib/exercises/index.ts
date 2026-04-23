// Aggregatore del catalogo esercizi. Raccoglie gli esercizi di tutti i
// capitoli e li ordina per (chapter, order) così la sidebar può mostrarli
// direttamente con lo stesso array.

import type { Exercise } from "@/types/explorer";
import { CH1_EXERCISES } from "./ch1-primi-tag";
import { CH2_EXERCISES } from "./ch2-css-basi";
import { CH3_EXERCISES } from "./ch3-div-nesting";
import { CH4_EXERCISES } from "./ch4-flexbox";
import { CH5_EXERCISES } from "./ch5-layout";
import { CH6_EXERCISES } from "./ch6-stati-interattivi";
import { CH7_EXERCISES } from "./ch7-animazioni";

export { CHAPTERS, findChapter } from "./chapters";

export const EXERCISES: Exercise[] = [
  ...CH1_EXERCISES,
  ...CH2_EXERCISES,
  ...CH3_EXERCISES,
  ...CH4_EXERCISES,
  ...CH5_EXERCISES,
  ...CH6_EXERCISES,
  ...CH7_EXERCISES,
].sort((a, b) => a.chapter - b.chapter || a.order - b.order);

export function findExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}

// Esercizi di un singolo capitolo (già ordinati per order).
export function exercisesOfChapter(chapterId: number): Exercise[] {
  return EXERCISES.filter((e) => e.chapter === chapterId);
}

// Esercizio precedente/successivo rispetto a uno dato, seguendo l'ordine
// globale (capitolo poi order). Null se non esiste.
export function adjacentExercises(id: string): {
  prev: Exercise | null;
  next: Exercise | null;
} {
  const idx = EXERCISES.findIndex((e) => e.id === id);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? EXERCISES[idx - 1] : null,
    next: idx < EXERCISES.length - 1 ? EXERCISES[idx + 1] : null,
  };
}
