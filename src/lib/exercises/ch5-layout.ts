// Capitolo 5 — Layout classici
// Lo studente combina le competenze dei capitoli 1-4 per creare pattern
// UI reali: card, sezioni, griglie.
//
// Strategia: starter HTML e CSS entrambi VUOTI. Consegne esplicite.

import type { Exercise } from "@/types/explorer";
import {
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
  nestedIn,
} from "../exerciseChecks";

const ANY = /.+/;

export const CH5_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 5.1 — Card prodotto
  // ———————————————————————————————————————————————————————
  {
    id: "card-prodotto",
    chapter: 5,
    order: 1,
    title: "Card prodotto",
    consegna:
      'Scrivi un <article class="card"> che contiene <h3 class="titolo">, <p class="prezzo"> e <button class="btn">. Nel CSS stila .card con display: flex, flex-direction: column, gap, background, color, padding e border-radius.',
    intro:
      "Una card è un contenitore che raggruppa informazioni correlate. <article> è semanticamente adatto per contenuti indipendenti. Con display: flex + flex-direction: column metti i figli in colonna e con gap li distanzi.",
    targetHtml: `<article class="card">
  <h3 class="titolo">Prodotto top</h3>
  <p class="prezzo">€ 29,90</p>
  <button class="btn">Aggiungi</button>
</article>`,
    targetCss: `.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 240px;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 12px;
  font-family: sans-serif;
}
.titolo {
  margin: 0;
  font-size: 18px;
}
.prezzo {
  margin: 0;
  color: #34d399;
  font-weight: 900;
  font-size: 22px;
}
.btn {
  background: #4ecdc4;
  color: black;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("article", "Contiene un <article>"),
      hasClass("card", 'L\'<article> ha class="card"'),
      nestedIn("h3", "article", "C'è un <h3> dentro l'article"),
      hasClass("titolo", 'L\'<h3> ha class="titolo"'),
      hasClass("prezzo", 'Esiste un elemento con class="prezzo"'),
      nestedIn("button", "article", "C'è un <button> dentro l'article"),
      hasClass("btn", 'Il <button> ha class="btn"'),
      hasCssRule(".card", "Esiste la regola .card"),
      cssRuleHasProperty(".card", "display", "flex", ".card ha display: flex"),
      cssRuleHasProperty(
        ".card",
        "flex-direction",
        "column",
        ".card ha flex-direction: column",
      ),
      cssRuleHasProperty(".card", "background", ANY, ".card ha un background"),
      cssRuleHasProperty(".card", "padding", ANY, ".card ha un padding"),
      cssRuleHasProperty(".card", "border-radius", ANY, ".card ha un border-radius"),
    ],
  },
];
