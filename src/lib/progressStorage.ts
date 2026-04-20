// Persistenza dei progressi esercizi in localStorage.
// Schema: { [exerciseId]: true } — solo flag di completamento, non il codice.

import type { ExerciseProgress } from "@/types/explorer";

const KEY = "html-explorer-progress";

export function loadProgress(): ExerciseProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as ExerciseProgress;
    return {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ExerciseProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // localStorage pieno o disabilitato: ignora silenziosamente
  }
}

export function markCompleted(exerciseId: string): ExerciseProgress {
  const p = loadProgress();
  p[exerciseId] = true;
  saveProgress(p);
  return p;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignora
  }
}
