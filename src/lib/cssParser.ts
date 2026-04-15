// Parser CSS via postcss: estrae ogni regola con il suo selettore e
// il range di righe nel sorgente. Se il CSS ha errori di sintassi
// ritorna una lista vuota (non vogliamo rompere l'editor mentre l'utente scrive).

import postcss from "postcss";
import type { CssRule } from "@/types/explorer";

export function parseCss(source: string): CssRule[] {
  const rules: CssRule[] = [];
  try {
    const root = postcss.parse(source);
    let idx = 0;
    root.walkRules((rule) => {
      const startLine = rule.source?.start?.line ?? 1;
      const endLine = rule.source?.end?.line ?? startLine;
      // postcss consegna selectors multipli separati da virgola in un'unica regola.
      // Conserviamo il selettore pieno per il match con element.matches().
      rules.push({
        id: `r${idx++}`,
        selector: rule.selector,
        lineStart: startLine,
        lineEnd: endLine,
      });
    });
  } catch {
    // CSS non valido: ignora silenziosamente
  }
  return rules;
}

// Espande un selettore composto ("h1, .foo, .bar") in selettori singoli,
// utile per chiedere all'iframe quali matchano.
export function splitSelectors(selector: string): string[] {
  return selector
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
