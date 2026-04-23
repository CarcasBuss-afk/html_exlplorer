// Definizione dei capitoli del percorso didattico.
// Ordine = sequenza consigliata di studio.

import type { Chapter } from "@/types/explorer";

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Primi tag HTML",
    description: "Titoli, paragrafi, link, immagini e attributi di base",
    accent: "#fb923c",
  },
  {
    id: 2,
    title: "CSS basi",
    description: "Selettori, colori, padding, margin, border e box model",
    accent: "#f472b6",
  },
  {
    id: 3,
    title: "Div e nesting",
    description: "Raggruppare elementi con div, classi, id e gerarchia",
    accent: "#a78bfa",
  },
  {
    id: 4,
    title: "Flexbox",
    description: "display:flex, direction, justify, align, gap",
    accent: "#4ecdc4",
  },
  {
    id: 5,
    title: "Layout classici",
    description: "Navbar, card, hero, sidebar, griglie di card",
    accent: "#ff6b6b",
  },
  {
    id: 6,
    title: "Stati interattivi",
    description: "hover, transition, cursor e feedback visivi",
    accent: "#fbbf24",
  },
  {
    id: 7,
    title: "Animazioni CSS",
    description: "transform, @keyframes, animation per dare vita alla pagina",
    accent: "#34d399",
  },
];

export function findChapter(id: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
