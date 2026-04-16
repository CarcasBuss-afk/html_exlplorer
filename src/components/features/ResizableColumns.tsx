"use client";

// Layout a N colonne con divisori trascinabili orizzontalmente.
// Ogni colonna parte con un peso (flex-basis %) che l'utente può modificare
// trascinando il divisore tra due colonne.
// Le colonne collassate (CollapsiblePanel.shut) non sono gestite qui:
// il CollapsiblePanel forza il proprio flex, il nostro peso è solo default.

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

interface Props {
  children: ReactNode;
  // Pesi iniziali (somma = 1). Se undefined, ugualmente distribuiti.
  initialWeights?: number[];
  // Larghezza minima di ogni colonna in px (per evitare collasso involontario)
  minColPx?: number;
}

export default function ResizableColumns({
  children,
  initialWeights,
  minColPx = 140,
}: Props) {
  const kids = Children.toArray(children).filter(isValidElement);
  const n = kids.length;

  const [weights, setWeights] = useState<number[]>(() => {
    if (initialWeights && initialWeights.length === n) return initialWeights;
    return Array(n).fill(1 / n);
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<{
    index: number;
    startX: number;
    startLeft: number;
    startRight: number;
    containerWidth: number;
  } | null>(null);

  // Listener globali attivi solo durante il drag
  useEffect(() => {
    if (!dragging) return;

    function onMove(e: MouseEvent) {
      const dx = e.clientX - dragging!.startX;
      const totalPx = dragging!.containerWidth;
      const minFrac = minColPx / totalPx;
      const dFrac = dx / totalPx;

      setWeights((w) => {
        const next = [...w];
        let newLeft = dragging!.startLeft + dFrac;
        let newRight = dragging!.startRight - dFrac;
        if (newLeft < minFrac) {
          newRight -= minFrac - newLeft;
          newLeft = minFrac;
        }
        if (newRight < minFrac) {
          newLeft -= minFrac - newRight;
          newRight = minFrac;
        }
        next[dragging!.index] = newLeft;
        next[dragging!.index + 1] = newRight;
        return next;
      });
    }

    function onUp() {
      setDragging(null);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    // Cursor + disable selection durante il drag
    const prevCursor = document.body.style.cursor;
    const prevSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevSelect;
    };
  }, [dragging, minColPx]);

  function startDrag(index: number, e: React.MouseEvent) {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    setDragging({
      index,
      startX: e.clientX,
      startLeft: weights[index],
      startRight: weights[index + 1],
      containerWidth: container.clientWidth,
    });
  }

  return (
    <div ref={containerRef} className="flex flex-1 min-h-0 relative">
      {kids.map((child, i) => {
        const cloned = cloneElement(
          child as ReactElement<{ weight?: number }>,
          { weight: weights[i] * n } as { weight: number },
        );
        return (
          <div className="contents" key={i}>
            {cloned}
            {i < n - 1 ? (
              <div
                onMouseDown={(e) => startDrag(i, e)}
                className="w-1 hover:w-1.5 bg-transparent hover:bg-[var(--sf3)] cursor-col-resize flex-shrink-0 transition-all z-20 relative"
                style={{ margin: "0 -1px" }}
                title="Trascina per ridimensionare"
              >
                <div className="absolute inset-y-0 -left-1 -right-1" />
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Overlay trasparente durante il drag: impedisce all'iframe
          di "rubare" gli eventi mouse e bloccare il rilascio. */}
      {dragging && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}
