"use client";

// Colonna 2: editor HTML con highlight sincronizzato.

import { useCallback, useEffect, useMemo, useRef } from "react";
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
  const cursorLineRef = useRef<number>(1);

  const highlights: HighlightRange[] = useMemo(() => {
    if (mode === "xray") {
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

  // Dal cursore, trova l'elemento più interno che contiene quella riga
  const findElementAtLine = useCallback(
    (line: number) => {
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
    },
    [parsed, mode, activeElement, setActive],
  );

  // Quando il cursore si sposta
  function handleCursorLine(line: number) {
    cursorLineRef.current = line;
    findElementAtLine(line);
  }

  // Quando parsed cambia (dopo debounce), ri-valuta la riga corrente
  // del cursore. Così un div appena scritto viene evidenziato
  // anche se il cursore non si è mosso.
  useEffect(() => {
    findElementAtLine(cursorLineRef.current);
  }, [findElementAtLine]);

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
