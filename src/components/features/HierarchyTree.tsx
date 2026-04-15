"use client";

// Albero SVG generato dinamicamente dai div parsati.
// Layout: assegniamo posizioni x tramite post-order traversal (ogni nodo
// occupa lo spazio medio dei suoi figli), y in base alla profondità.

import { useMemo } from "react";
import type { ParsedHtml } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";
import { cn } from "@/lib/utils";

interface Props {
  parsed: ParsedHtml;
}

interface NodeLayout {
  id: string;
  x: number;
  y: number;
  width: number;
  depth: number;
  label: string;
  color: string;
  parentId: string | null;
}

const NODE_W = 110;
const NODE_H = 34;
const LEVEL_H = 70;
const GAP_X = 14;

function layoutTree(parsed: ParsedHtml): {
  nodes: NodeLayout[];
  maxDepth: number;
  totalWidth: number;
} {
  const nodes: NodeLayout[] = [];
  const { divs, rootIds } = parsed;
  let maxDepth = 0;

  // Layout post-order: calcola width del sottoalbero, poi assegna x
  function subtreeWidth(id: string): number {
    const n = divs.get(id);
    if (!n || n.childIds.length === 0) return NODE_W;
    const kidsW = n.childIds.reduce(
      (sum, cid, i) =>
        sum + subtreeWidth(cid) + (i < n.childIds.length - 1 ? GAP_X : 0),
      0,
    );
    return Math.max(NODE_W, kidsW);
  }

  function place(id: string, xStart: number, depth: number): number {
    const n = divs.get(id);
    if (!n) return xStart;
    maxDepth = Math.max(maxDepth, depth);
    const totalW = subtreeWidth(id);

    let childCursor = xStart;
    const childCenters: number[] = [];
    if (n.childIds.length > 0) {
      for (let i = 0; i < n.childIds.length; i++) {
        const cid = n.childIds[i];
        const w = subtreeWidth(cid);
        const newCursor = place(cid, childCursor, depth + 1);
        childCenters.push(childCursor + w / 2);
        childCursor = newCursor + (i < n.childIds.length - 1 ? GAP_X : 0);
      }
    }

    const cx =
      childCenters.length > 0
        ? (childCenters[0] + childCenters[childCenters.length - 1]) / 2
        : xStart + totalW / 2;

    nodes.push({
      id,
      x: cx - NODE_W / 2,
      y: 18 + depth * LEVEL_H,
      width: NODE_W,
      depth,
      label: n.label,
      color: n.color,
      parentId: n.parentId,
    });

    return xStart + totalW;
  }

  let cursor = 0;
  rootIds.forEach((rid, i) => {
    cursor = place(rid, cursor, 0) + (i < rootIds.length - 1 ? GAP_X * 2 : 0);
  });

  return { nodes, maxDepth, totalWidth: Math.max(cursor, 200) };
}

export default function HierarchyTree({ parsed }: Props) {
  const { activeElement, mode, setActive } = useHighlight();
  const { nodes, maxDepth, totalWidth } = useMemo(
    () => layoutTree(parsed),
    [parsed],
  );

  const byId = useMemo(() => {
    const m = new Map<string, NodeLayout>();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  const activeChain = useMemo(() => {
    if (!activeElement) return new Set<string>();
    const s = new Set<string>([activeElement]);
    let cur = parsed.divs.get(activeElement)?.parentId ?? null;
    while (cur) {
      s.add(cur);
      cur = parsed.divs.get(cur)?.parentId ?? null;
    }
    return s;
  }, [activeElement, parsed]);

  const height = (maxDepth + 1) * LEVEL_H + 20;
  const vbWidth = totalWidth + 20;

  if (nodes.length === 0) {
    return (
      <div className="p-6 text-center text-[var(--mu)] text-xs">
        Scrivi del codice HTML con dei &lt;div&gt; per vedere l&apos;albero
        della gerarchia.
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${vbWidth} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto block"
    >
      {/* Linee di connessione */}
      <g stroke="var(--bd)" strokeWidth="2" fill="none">
        {nodes.map((n) => {
          if (!n.parentId) return null;
          const p = byId.get(n.parentId);
          if (!p) return null;
          const x1 = p.x + p.width / 2;
          const y1 = p.y + NODE_H;
          const x2 = n.x + n.width / 2;
          const y2 = n.y;
          const stroke =
            activeChain.has(n.id) && activeChain.has(n.parentId)
              ? n.color
              : "#2a2a40";
          return (
            <line
              key={`ln-${n.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={stroke}
              strokeWidth={
                activeChain.has(n.id) && activeChain.has(n.parentId) ? 2.5 : 1.5
              }
            />
          );
        })}
      </g>

      {/* Nodi */}
      {nodes.map((n) => {
        const isActive = activeElement === n.id;
        const isChain = activeChain.has(n.id);
        const isXray = mode === "xray";
        return (
          <g
            key={n.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => mode === "hover" && setActive(n.id)}
            onMouseLeave={() => mode === "hover" && setActive(null)}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.width}
              height={NODE_H}
              rx={7}
              fill={
                isActive
                  ? n.color
                  : isChain || isXray
                  ? "var(--sf2)"
                  : "var(--sf)"
              }
              fillOpacity={isActive ? 0.25 : 1}
              stroke={n.color}
              strokeWidth={isActive ? 2.5 : isChain || isXray ? 2 : 1.5}
              className={cn(
                "transition-all",
                isActive && "drop-shadow-[0_0_8px_currentColor]",
              )}
              style={{ color: n.color }}
            />
            <text
              x={n.x + n.width / 2}
              y={n.y + NODE_H / 2 + 4}
              textAnchor="middle"
              fill={n.color}
              fontFamily="ui-monospace, monospace"
              fontSize="11"
              fontWeight="700"
              pointerEvents="none"
            >
              {n.label.length > 16 ? n.label.slice(0, 15) + "…" : n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
