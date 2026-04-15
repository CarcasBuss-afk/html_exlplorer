// Palette colori per il DIV Explorer
// Usata in modo ciclico: il div N-esimo riceve PALETTE[N % PALETTE.length]

export const PALETTE = [
  "#ff6b6b", // rosso
  "#fbbf24", // giallo
  "#4ecdc4", // teal
  "#a78bfa", // viola chiaro
  "#f472b6", // rosa
  "#fb923c", // arancione
  "#34d399", // verde
  "#818cf8", // indaco
  "#c084fc", // viola
  "#60a5fa", // azzurro
] as const;

export function colorForIndex(index: number): string {
  return PALETTE[index % PALETTE.length];
}

// Tema dark condiviso
export const THEME = {
  bg: "#0c0c18",
  sf: "#161628",
  sf2: "#1c1c38",
  sf3: "#282850",
  tx: "#e8e8f0",
  mu: "#7777aa",
  bd: "#252548",
} as const;
