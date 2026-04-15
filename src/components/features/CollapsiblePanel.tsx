"use client";

// Pannello riducibile. Cliccando l'header il pannello collassa a una colonna
// stretta con il titolo verticale. Replica il comportamento del prototipo HTML.

import { useState, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  num: number;
  accent: string;
  children: ReactNode;
  // Il content dell'header può essere sovrascritto (es. con bottoni).
  headerExtra?: ReactNode;
  // Flex iniziale (peso)
  weight?: number;
}

export default function CollapsiblePanel({
  title,
  num,
  accent,
  children,
  headerExtra,
  weight = 1,
}: Props) {
  const [shut, setShut] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col min-w-0 overflow-hidden border-r border-[var(--bd)] last:border-r-0 transition-[flex,min-width] duration-300",
        shut && "!flex-none !min-w-[32px] !max-w-[32px] !w-[32px]",
      )}
      style={{ flex: shut ? undefined : `${weight} 1 0` }}
    >
      <div
        className={cn(
          "flex items-center gap-2 bg-[var(--sf2)] cursor-pointer border-b border-[var(--bd)] flex-shrink-0 explorer-nosel hover:bg-[var(--sf3)] transition-colors",
          shut ? "flex-col py-2 px-1 gap-2" : "px-3 py-2",
        )}
        onClick={() => setShut((s) => !s)}
      >
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-black flex-shrink-0"
          style={{ background: accent }}
        >
          {num}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] tracking-wider uppercase text-[var(--mu)] whitespace-nowrap",
            shut && "[writing-mode:vertical-rl] [text-orientation:mixed]",
          )}
        >
          {title}
        </span>
        {!shut && headerExtra ? (
          <div
            className="ml-auto flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {headerExtra}
          </div>
        ) : null}
        <ChevronLeft
          size={12}
          className={cn(
            "text-[var(--mu)] flex-shrink-0 transition-transform",
            shut && "rotate-180",
            !headerExtra && !shut && "ml-auto",
          )}
        />
      </div>
      <div
        className={cn(
          "flex-1 min-h-0 overflow-hidden transition-opacity",
          shut && "opacity-0 pointer-events-none",
        )}
      >
        {children}
      </div>
    </div>
  );
}
