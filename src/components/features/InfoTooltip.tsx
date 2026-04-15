"use client";

// Tooltip fisso in basso che descrive il ruolo del div attivo
// (GENITORE / FIGLIO / GENITORE+FIGLIO) e le sue relazioni.

import { useMemo } from "react";
import type { ParsedHtml } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";
import { parentChain, siblings } from "@/lib/htmlParser";
import { cn } from "@/lib/utils";

interface Props {
  parsed: ParsedHtml;
}

function describeRole(hasParent: boolean, hasChildren: boolean): string {
  if (hasParent && hasChildren) return "GENITORE + FIGLIO";
  if (hasChildren) return "GENITORE";
  if (hasParent) return "FIGLIO";
  return "RADICE";
}

export default function InfoTooltip({ parsed }: Props) {
  const { activeElement, mode } = useHighlight();

  const info = useMemo(() => {
    if (!activeElement) return null;
    const node = parsed.divs.get(activeElement);
    if (!node) return null;
    const parents = parentChain(parsed.divs, node.id);
    const sibs = siblings(parsed.divs, node.id);
    const role = describeRole(parents.length > 0, node.childIds.length > 0);
    return { node, parents, sibs, role };
  }, [activeElement, parsed]);

  if (!info || mode === "xray") return null;

  const { node, parents, sibs, role } = info;

  const relParts: string[] = [];
  if (parents.length > 0) {
    relParts.push(`figlio di ${parents[0].label}`);
  }
  if (node.childIds.length > 0) {
    relParts.push(
      `genitore di ${node.childIds.length} ${node.childIds.length === 1 ? "figlio" : "figli"}`,
    );
  }
  if (sibs.length > 0) {
    relParts.push(
      `fratello di ${sibs.map((s) => s.label).join(", ")}`,
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[var(--sf)] border-2 rounded-lg px-4 py-2 text-[13px] text-[var(--tx)] text-center shadow-2xl max-w-[500px] transition-opacity duration-200",
      )}
      style={{ borderColor: node.color }}
    >
      <span
        className="font-mono text-[10px] inline-block px-1.5 py-0.5 rounded mr-2 font-bold text-black"
        style={{ background: node.color }}
      >
        {role}
      </span>
      <b style={{ color: node.color }}>{node.label}</b>
      {relParts.length > 0 ? (
        <span className="text-[var(--mu)]"> — {relParts.join(" · ")}</span>
      ) : null}
    </div>
  );
}
