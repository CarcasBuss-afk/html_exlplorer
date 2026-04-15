"use client";

// Context globale per lo stato di highlight.
// È il cuore dello strumento: un unico activeElement che tutti i pannelli osservano.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";
import type { HighlightMode } from "@/types/explorer";

interface HighlightCtx {
  activeElement: string | null;
  mode: HighlightMode;
  matchedRules: string[];
  previewTheme: "light" | "dark";
  setActive: (id: string | null) => void;
  setMode: (m: HighlightMode) => void;
  setMatchedRules: (ids: string[]) => void;
  setPreviewTheme: (t: "light" | "dark") => void;
  clear: () => void;
}

const Ctx = createContext<HighlightCtx | null>(null);

export function HighlightProvider({ children }: { children: ReactNode }) {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [mode, setMode] = useState<HighlightMode>("hover");
  const [matchedRules, setMatchedRules] = useState<string[]>([]);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const setActive = useCallback((id: string | null) => {
    setActiveElement(id);
    if (id === null) setMatchedRules([]);
  }, []);

  const clear = useCallback(() => {
    setActiveElement(null);
    setMatchedRules([]);
  }, []);

  const value = useMemo(
    () => ({
      activeElement,
      mode,
      matchedRules,
      previewTheme,
      setActive,
      setMode,
      setMatchedRules,
      setPreviewTheme,
      clear,
    }),
    [activeElement, mode, matchedRules, previewTheme, setActive, clear],
  );

  return createElement(Ctx.Provider, { value }, children);
}

export function useHighlight(): HighlightCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useHighlight deve essere usato dentro HighlightProvider");
  }
  return ctx;
}
