"use client";

// Pulsanti di zoom compatti: +, -, reset (click per tornare a 100%).

import { ZoomIn, ZoomOut } from "lucide-react";

interface Props {
  zoom: number;
  onZoom: (z: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function ZoomControls({
  zoom,
  onZoom,
  min = 0.3,
  max = 3,
  step = 0.15,
}: Props) {
  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => onZoom(Math.max(min, zoom - step))}
        className="p-0.5 rounded hover:bg-[var(--sf3)] text-[var(--mu)] hover:text-[var(--tx)] transition-colors"
        title="Zoom indietro"
      >
        <ZoomOut size={13} />
      </button>

      <button
        onClick={() => onZoom(1)}
        className="min-w-[36px] text-center font-mono text-[9px] text-[var(--mu)] hover:text-[var(--tx)] px-1 py-0.5 rounded hover:bg-[var(--sf3)] transition-colors"
        title="Reset zoom a 100%"
      >
        {Math.round(zoom * 100)}%
      </button>

      <button
        onClick={() => onZoom(Math.min(max, zoom + step))}
        className="p-0.5 rounded hover:bg-[var(--sf3)] text-[var(--mu)] hover:text-[var(--tx)] transition-colors"
        title="Zoom avanti"
      >
        <ZoomIn size={13} />
      </button>
    </div>
  );
}
