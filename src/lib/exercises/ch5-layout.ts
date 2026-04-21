// Capitolo 5 — Layout classici
// Gli esercizi sono placeholder migrati dalla versione precedente.

import type { Exercise } from "@/types/explorer";
import { hasClass, hasTag, nestedIn } from "../exerciseChecks";

export const CH5_EXERCISES: Exercise[] = [
  {
    id: "card-prodotto",
    chapter: 5,
    order: 1,
    title: "Card prodotto",
    consegna:
      "Crea una card con un titolo, un prezzo e un pulsante. Usa un <article> come contenitore principale.",
    intro:
      "Una card è un contenitore che raggruppa informazioni correlate. Il tag <article> è semanticamente adatto quando il contenuto ha senso in modo indipendente.",
    targetHtml: `<article class="card">
  <h3 class="titolo">Prodotto top</h3>
  <p class="prezzo">€ 29,90</p>
  <button class="btn">Aggiungi</button>
</article>`,
    targetCss: `.card {
  width: 240px;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  color: #000;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: `.card {
  width: 240px;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  color: #000;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
`,
    checks: [
      hasTag("article", "Contiene un <article>"),
      hasClass("card", "L'article ha la classe .card"),
      nestedIn("h3", "article", "C'è un <h3> dentro l'article"),
      hasClass("titolo", "C'è un elemento con classe .titolo"),
      hasClass("prezzo", "C'è un elemento con classe .prezzo"),
      nestedIn("button", "article", "C'è un <button> dentro l'article"),
      hasClass("btn", "Il bottone ha la classe .btn"),
    ],
  },
];
