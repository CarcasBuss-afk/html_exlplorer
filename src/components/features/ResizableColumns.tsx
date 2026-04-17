"use client";

// Layout a N pannelli con divisori trascinabili.
// direction="row"    → pannelli in riga,  divisori verticali   (trascinamento X)
// direction="column" → pannelli in colonna, divisori orizzontali (trascinamento Y)
// Ogni pannello parte con un peso (flex-basis %) che l'utente può modificare.
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

type Direction = "row" | "column";

interface Props {
  children: ReactNode;
  // Pesi iniziali (somma = 1). Se undefined, ugualmente distribuiti.
  initialWeights?: number[];
  // Dimensione minima di ogni pannello in px (per evitare collasso involontario)
  minSizePx?: number;
  // Orientamento dei pannelli
  direction?: Direction;
}

export default function ResizableColumns({
  children,
  initialWeights,
  minSizePx = 140,
  direction = "row",
}: Props) {
  const kids = Children.toArray(children).filter(isValidElement);
  const n = kids.length;
  const isRow = direction === "row";

  const [weights, setWeights] = useState<number[]>(() => {
    if (initialWeights && initialWeights.length === n) return initialWeights;
    return Array(n).fill(1 / n);
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<{
    index: number;
    startCoord: number;
    startLeft: number;
    startRight: number;
    containerSize: number;
  } | null>(null);

  // Listener globali attivi solo durante il drag
  useEffect(() => {
    if (!dragging) return;

    function onMove(e: MouseEvent) {
      const coord = isRow ? e.clientX : e.clientY;
      const d = coord - dragging!.startCoord;
      const total = dragging!.containerSize;
      const minFrac = minSizePx / total;
      const dFrac = d / total;

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
    document.body.style.cursor = isRow ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevSelect;
    };
  }, [dragging, minSizePx, isRow]);

  function startDrag(index: number, e: React.MouseEvent) {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    setDragging({
      index,
      startCoord: isRow ? e.clientX : e.clientY,
      startLeft: weights[index],
      startRight: weights[index + 1],
      containerSize: isRow ? container.clientWidth : container.clientHeight,
    });
  }

  // Classi del divisore in base alla direzione
  const dividerCls = isRow
    ? "w-1 hover:w-1.5 cursor-col-resize"
    : "h-1 hover:h-1.5 cursor-row-resize";
  const dividerHitCls = isRow
    ? "absolute inset-y-0 -left-1 -right-1"
    : "absolute inset-x-0 -top-1 -bottom-1";
  const dividerMargin = isRow ? "0 -1px" : "-1px 0";

  return (
    <>
      <div
        ref={containerRef}
        className={
          isRow
            ? "flex flex-1 min-h-0"
            : "flex flex-col h-full w-full min-w-0 min-h-0"
        }
      >
        {kids.map((child, i) => {
          // direction="row": il CollapsiblePanel legge la prop weight e
          // gestisce collasso/min-width da solo.
          // direction="column": i figli sono <div> già in flex-col, gli
          // applichiamo il flex direttamente via style (evita wrapper extra
          // che romperebbe il layout interno).
          const rendered = isRow
            ? cloneElement(
                child as ReactElement<{ weight?: number }>,
                { weight: weights[i] * n } as { weight: number },
              )
            : cloneElement(
                child as ReactElement<{ style?: React.CSSProperties }>,
                {
                  style: {
                    ...(child as ReactElement<{ style?: React.CSSProperties }>)
                      .props?.style,
                    flex: `${weights[i] * n} 1 0`,
                    minHeight: 0,
                  },
                },
              );
          return (
            <div className="contents" key={i}>
              {rendered}
              {i < n - 1 ? (
                <div
                  onMouseDown={(e) => startDrag(i, e)}
                  className={`${dividerCls} bg-transparent hover:bg-[var(--sf3)] flex-shrink-0 transition-all z-20 relative`}
                  style={{ margin: dividerMargin }}
                  title="Trascina per ridimensionare"
                >
                  <div className={dividerHitCls} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {/* Overlay durante il drag: cattura mousemove/mouseup anche sopra
          iframe e Monaco, evitando che il drag resti "bloccato". */}
      {dragging ? (
        <div
          className="fixed inset-0 z-50"
          style={{ cursor: isRow ? "col-resize" : "row-resize" }}
        />
      ) : null}
    </>
  );
}
