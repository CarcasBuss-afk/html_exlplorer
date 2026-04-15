"use client";

// Colonna 3: editor CSS con highlight delle regole che matchano
// l'elemento attivo (calcolate via iframe + element.matches).

import { useMemo } from "react";
import CodeEditor, { type HighlightRange } from "./CodeEditor";
import type { CssRule, ParsedHtml } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";

interface Props {
  value: string;
  onChange: (v: string) => void;
  parsed: ParsedHtml;
  cssRules: CssRule[];
}

export default function CssEditorPanel({
  value,
  onChange,
  parsed,
  cssRules,
}: Props) {
  const { activeElement, mode, matchedRules } = useHighlight();

  const highlights: HighlightRange[] = useMemo(() => {
    if (mode === "xray") return [];
    if (!activeElement || matchedRules.length === 0) return [];
    const activeColor =
      parsed.divs.get(activeElement)?.color ?? "#4ecdc4";
    const matchedSet = new Set(matchedRules);
    return cssRules
      .filter((r) => matchedSet.has(r.id))
      .map((r) => ({
        lineStart: r.lineStart,
        lineEnd: r.lineEnd,
        color: activeColor,
      }));
  }, [activeElement, mode, matchedRules, cssRules, parsed]);

  return (
    <CodeEditor
      language="css"
      value={value}
      onChange={onChange}
      highlights={highlights}
    />
  );
}
