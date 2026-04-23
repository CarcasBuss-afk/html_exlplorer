// Capitolo 3 — Div e nesting
// Concetto chiave: il <div> è un contenitore invisibile. In questo
// capitolo lo studente impara classi, id e nesting — ma adesso sa già
// il CSS (cap. 2), quindi deve ANCHE rendere i div visibili stilandoli.
//
// Strategia: starter HTML e CSS entrambi VUOTI. Consegne esplicite sia
// sulla struttura HTML sia sulle proprietà CSS richieste.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
  nestedIn,
  tagHasChildren,
} from "../exerciseChecks";

const ANY = /.+/;

export const CH3_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 3.1 — Primo div
  // ———————————————————————————————————————————————————————
  {
    id: "primo-div",
    chapter: 3,
    order: 1,
    title: "Il tuo primo div",
    consegna:
      "Crea un <div> che contiene un <p>. Nel CSS stila div con background e padding per rendere il div visibile.",
    intro:
      "Il <div> è un contenitore INVISIBILE di default. Prima di stilarlo, prova a cliccare RAGGI X in alto per vederlo. L'albero a destra mostra sempre la struttura anche senza CSS.",
    targetHtml: `<div>
  <p>Sono dentro un div!</p>
</div>`,
    targetCss: `div {
  background: #4ecdc4;
  color: black;
  padding: 16px;
  border-radius: 6px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("div", "Contiene un <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
      hasCssRule("div", "Esiste la regola div"),
      cssRuleHasProperty("div", "background", ANY, "div ha un background"),
      cssRuleHasProperty("div", "padding", ANY, "div ha un padding"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.2 — Div con titolo e paragrafo
  // ———————————————————————————————————————————————————————
  {
    id: "div-con-titolo-e-p",
    chapter: 3,
    order: 2,
    title: "Un div con titolo e paragrafo",
    consegna:
      "Crea un <div> che contiene un <h2> e un <p>. Stila div con background, padding e border-radius.",
    intro:
      "Dentro un div puoi mettere altri tag. Nell'albero a destra vedi chi contiene chi: il div è il genitore, h2 e p sono i suoi figli (fratelli tra loro).",
    targetHtml: `<div>
  <h2>Notizia del giorno</h2>
  <p>Oggi è una giornata fantastica per imparare HTML.</p>
</div>`,
    targetCss: `div {
  background: #1c1c38;
  color: #e8e8f0;
  padding: 16px;
  border-radius: 8px;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("div", "Contiene un <div>"),
      nestedIn("h2", "div", "Il <h2> è dentro al <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
      hasCssRule("div", "Esiste la regola div"),
      cssRuleHasProperty("div", "background", ANY, "div ha un background"),
      cssRuleHasProperty("div", "padding", ANY, "div ha un padding"),
      cssRuleHasProperty("div", "border-radius", ANY, "div ha un border-radius"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.3 — Due fratelli
  // ———————————————————————————————————————————————————————
  {
    id: "fratelli-p",
    chapter: 3,
    order: 3,
    title: "Due paragrafi fratelli",
    consegna:
      "Crea un <div> con DUE <p> dentro. Stila div con background, padding e border-radius.",
    intro:
      "Due tag dentro lo stesso genitore sono 'fratelli': stanno allo stesso livello dell'albero. Nell'albero li vedrai uno accanto all'altro.",
    targetHtml: `<div>
  <p>Primo paragrafo.</p>
  <p>Secondo paragrafo.</p>
</div>`,
    targetCss: `div {
  background: #282850;
  color: white;
  padding: 16px;
  border-radius: 8px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("div", "Contiene un <div>"),
      tagHasChildren("div", 2, "p", "Il <div> contiene 2 <p> fratelli"),
      hasCssRule("div", "Esiste la regola div"),
      cssRuleHasProperty("div", "background", ANY, "div ha un background"),
      cssRuleHasProperty("div", "padding", ANY, "div ha un padding"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.4 — Div in div
  // ———————————————————————————————————————————————————————
  {
    id: "div-in-div",
    chapter: 3,
    order: 4,
    title: "Un div dentro un altro div",
    consegna:
      "Crea un <div> esterno che contiene un <div> interno, a sua volta con un <p>. Stila div con background, padding e margin (così i due div si distinguono grazie al bordo interno).",
    intro:
      "I div si possono annidare quanto vuoi. Il padding crea un bordo interno che fa 'rientrare' i figli; il margin crea uno spazio esterno tra fratelli o dai genitori.",
    targetHtml: `<div>
  <div>
    <p>Sono dentro a due div!</p>
  </div>
</div>`,
    targetCss: `div {
  background: #ff6b6b;
  color: white;
  padding: 14px;
  margin: 6px;
  border-radius: 6px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("div", "Contiene almeno un <div>"),
      nestedIn("div", "div", "Un <div> è dentro a un altro <div>"),
      nestedIn("p", "div", "Il <p> è dentro a un <div>"),
      hasCssRule("div", "Esiste la regola div"),
      cssRuleHasProperty("div", "background", ANY, "div ha un background"),
      cssRuleHasProperty("div", "padding", ANY, "div ha un padding"),
      cssRuleHasProperty("div", "margin", ANY, "div ha un margin"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.5 — Classe carta
  // ———————————————————————————————————————————————————————
  {
    id: "classe-carta",
    chapter: 3,
    order: 5,
    title: "Dai un nome al div: la classe",
    consegna:
      'Crea un <div class="carta"> che contiene un <h2> e un <p>. Stila .carta con background, color, padding e border-radius.',
    intro:
      'Le classi sui div funzionano come hai visto in cap. 2: <div class="carta"> + nel CSS .carta { ... }. Così stili SOLO il div con quella classe.',
    targetHtml: `<div class="carta">
  <h2>Prodotto speciale</h2>
  <p>Scopri le nostre offerte di oggi!</p>
</div>`,
    targetCss: `.carta {
  background: #1c1c38;
  color: #34d399;
  padding: 20px;
  border-radius: 10px;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("carta", 'Esiste un elemento con class="carta"'),
      nestedIn("h2", "div", "Il <h2> è dentro al <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
      hasCssRule(".carta", "Esiste la regola .carta"),
      cssRuleHasProperty(".carta", "background", ANY, ".carta ha un background"),
      cssRuleHasProperty(".carta", "padding", ANY, ".carta ha un padding"),
      cssRuleHasProperty(".carta", "border-radius", ANY, ".carta ha un border-radius"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.6 — Due classi diverse
  // ———————————————————————————————————————————————————————
  {
    id: "due-classi",
    chapter: 3,
    order: 6,
    title: "Classi diverse per ruoli diversi",
    consegna:
      'Crea due div uno dopo l\'altro: class="titolo" (con un <h1>) e class="contenuto" (con un <p>). Stila .titolo e .contenuto con colori DIVERSI.',
    intro:
      "Le classi permettono di distinguere div che hanno ruoli diversi. Dare stili diversi li fa 'vedere' come due zone distinte della pagina.",
    targetHtml: `<div class="titolo">
  <h1>Benvenuto nel blog</h1>
</div>
<div class="contenuto">
  <p>Ecco il primo articolo di oggi.</p>
</div>`,
    targetCss: `.titolo {
  background: #a78bfa;
  color: white;
  padding: 18px;
  border-radius: 8px 8px 0 0;
}
.contenuto {
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 0 0 8px 8px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("titolo", 'Esiste un div con class="titolo"'),
      hasClass("contenuto", 'Esiste un div con class="contenuto"'),
      hasTag("h1", "Contiene un <h1>"),
      hasTag("p", "Contiene un <p>"),
      hasCssRule(".titolo", "Esiste la regola .titolo"),
      hasCssRule(".contenuto", "Esiste la regola .contenuto"),
      cssRuleHasProperty(".titolo", "background", ANY, ".titolo ha un background"),
      cssRuleHasProperty(".contenuto", "background", ANY, ".contenuto ha un background"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.7 — Classi annidate con stili diversi
  // ———————————————————————————————————————————————————————
  {
    id: "classi-annidate",
    chapter: 3,
    order: 7,
    title: "Classi annidate con stili diversi",
    consegna:
      'Crea un <div class="esterno"> che contiene un <div class="interno"> con un <p>. Stila .esterno con un background; stila .interno con un background DIVERSO, così i due livelli sono visibili.',
    intro:
      "Quando un div sta dentro un altro, dare classi diverse ai due div ti permette di stilarli in modo indipendente. L'albero ti mostra chiaramente i livelli.",
    targetHtml: `<div class="esterno">
  <div class="interno">
    <p>Sono nel div interno, dentro al div esterno.</p>
  </div>
</div>`,
    targetCss: `.esterno {
  background: #1c1c38;
  padding: 20px;
  border-radius: 10px;
}
.interno {
  background: #4ecdc4;
  color: black;
  padding: 14px;
  border-radius: 6px;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("esterno", "Esiste un div.esterno"),
      hasClass("interno", "Esiste un div.interno"),
      nestedIn("div", "div", "Il div.interno è dentro al div.esterno"),
      nestedIn("p", "div", "Il <p> è dentro a un div"),
      hasCssRule(".esterno", "Esiste la regola .esterno"),
      hasCssRule(".interno", "Esiste la regola .interno"),
      cssRuleHasProperty(".esterno", "background", ANY, ".esterno ha un background"),
      cssRuleHasProperty(".interno", "background", ANY, ".interno ha un background"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.8 — Profilo strutturato (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "profilo-strutturato",
    chapter: 3,
    order: 8,
    title: "Mini profilo strutturato",
    consegna:
      "Crea un div.profilo che contiene due div figli: div.header (con un <h1>) e div.body (con due <p>). Stila .profilo, .header e .body con colori e padding che mostrino bene la struttura a 3 livelli.",
    intro:
      "Questo è un consolidamento: classi + nesting + CSS insieme. L'albero mostrerà tre livelli: profilo sopra, header e body in mezzo, h1 e p sotto.",
    targetHtml: `<div class="profilo">
  <div class="header">
    <h1>Mario Rossi</h1>
  </div>
  <div class="body">
    <p>Classe 3A</p>
    <p>Indirizzo informatica</p>
  </div>
</div>`,
    targetCss: `.profilo {
  background: #0c0c18;
  border-radius: 12px;
  padding: 6px;
  font-family: sans-serif;
}
.header {
  background: #a78bfa;
  color: black;
  padding: 14px;
  border-radius: 8px 8px 0 0;
}
.body {
  background: #1c1c38;
  color: #e8e8f0;
  padding: 14px;
  border-radius: 0 0 8px 8px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("profilo", "Esiste un div.profilo"),
      hasClass("header", "Esiste un div.header"),
      hasClass("body", "Esiste un div.body"),
      classHasChildren("body", 2, "p", "Il div.body contiene 2 <p>"),
      hasCssRule(".profilo", "Esiste la regola .profilo"),
      hasCssRule(".header", "Esiste la regola .header"),
      hasCssRule(".body", "Esiste la regola .body"),
      cssRuleHasProperty(".header", "background", ANY, ".header ha un background"),
      cssRuleHasProperty(".body", "background", ANY, ".body ha un background"),
    ],
  },
];
