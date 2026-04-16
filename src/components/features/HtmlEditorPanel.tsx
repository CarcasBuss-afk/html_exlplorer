"use client";

// Colonna 2: editor HTML con highlight sincronizzato.

import { useMemo } from "react";
import CodeEditor, { type HighlightRange } from "./CodeEditor";
import type { ParsedHtml } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";

interface Props {
  value: string;
  onChange: (v: string) => void;
  parsed: ParsedHtml;
}

export default function HtmlEditorPanel({ value, onChange, parsed }: Props) {
  const { activeElement, mode, setActive } = useHighlight();

  const highlights: HighlightRange[] = useMemo(() => {
    if (mode === "xray") {
      // In Raggi X evidenziamo tutti i div in modo soft
      return [...parsed.divs.values()].map((n) => ({
        lineStart: n.lineStart,
        lineEnd: n.lineEnd,
        color: n.color,
        soft: true,
      }));
    }
    if (!activeElement) return [];
    const node = parsed.divs.get(activeElement);
    if (!node) return [];
    const list: HighlightRange[] = [
      {
        lineStart: node.lineStart,
        lineEnd: node.lineEnd,
        color: node.color,
      },
    ];
    // Catena genitori: soft
    let p = node.parentId;
    while (p) {
      const pn = parsed.divs.get(p);
      if (!pn) break;
      list.push({
        lineStart: pn.lineStart,
        lineEnd: pn.lineEnd,
        color: pn.color,
        soft: true,
      });
      p = pn.parentId;
    }
    return list;
  }, [activeElement, mode, parsed]);

  // Dal cursore, trova il div più interno che contiene quella riga
  function handleCursorLine(line: number) {
    if (mode === "xray") return;
    let bestId: string | null = null;
    let bestDepth = -1;
    for (const n of parsed.divs.values()) {
      if (line >= n.lineStart && line <= n.lineEnd && n.depth > bestDepth) {
        bestDepth = n.depth;
        bestId = n.id;
      }
    }
    if (bestId !== activeElement) setActive(bestId);
  }

  return (
    <CodeEditor
      language="html"
      value={value}
      onChange={onChange}
      highlights={highlights}
      onCursorLine={handleCursorLine}
    />
  );
}
