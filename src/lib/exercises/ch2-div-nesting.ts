// Capitolo 2 — Div e nesting
// Concetto chiave: il <div> è un contenitore INVISIBILE che serve a
// raggruppare elementi. Lo studente impara classi, id e nesting.
//
// Strategia CSS:
// - 2.1 parte con CSS vuoto per far scoprire che i div sono invisibili
//   (si consiglia di usare Raggi X per vederli).
// - 2.2 in poi il CSS pre-compilato rende i div visibili con un bordo
//   tratteggiato così lo studente vede la struttura che sta costruendo.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  hasClass,
  hasId,
  hasTag,
  nestedIn,
  tagHasChildren,
} from "../exerciseChecks";

// CSS "debug" condiviso da quasi tutti gli esercizi del capitolo:
// rende i div visibili come box tratteggiati.
const DEBUG_DIV_CSS = `div {
  padding: 10px;
  margin: 6px;
  border: 2px dashed #4ecdc4;
  border-radius: 6px;
  background: rgba(78, 205, 196, 0.06);
}
h1, h2, h3 { margin: 4px 0; font-family: sans-serif; }
p { margin: 4px 0; font-family: sans-serif; }
`;

export const CH2_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 2.1 — Il primo div (invisibile!)
  // ———————————————————————————————————————————————————————
  {
    id: "primo-div",
    chapter: 2,
    order: 1,
    title: "Il tuo primo div",
    consegna: "Racchiudi un paragrafo dentro un <div>.",
    intro:
      "Il <div> è un contenitore INVISIBILE: serve a raggruppare elementi. Se non vedi niente di nuovo, premi il bottone RAGGI X in alto per vedere i div!",
    targetHtml: `<div>
  <p>Sono dentro un div, anche se non si vede!</p>
</div>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("div", "Contiene un <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.2 — Div con titolo e paragrafo
  // ———————————————————————————————————————————————————————
  {
    id: "div-con-titolo-e-p",
    chapter: 2,
    order: 2,
    title: "Un div con titolo e paragrafo",
    consegna:
      "Crea un <div> che contiene un <h2> e un <p>. Osserva l'albero della gerarchia.",
    intro:
      "Dentro un div puoi mettere altri tag. Nell'albero a destra vedi chi contiene chi: il div è il genitore, h2 e p sono i suoi figli.",
    targetHtml: `<div>
  <h2>Notizia del giorno</h2>
  <p>Oggi è una giornata fantastica per imparare HTML.</p>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasTag("div", "Contiene un <div>"),
      nestedIn("h2", "div", "Il <h2> è dentro al <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.3 — Due paragrafi fratelli
  // ———————————————————————————————————————————————————————
  {
    id: "fratelli-p",
    chapter: 2,
    order: 3,
    title: "Due paragrafi fratelli",
    consegna: "Crea un <div> che contiene esattamente due <p>.",
    intro:
      "Due tag dentro lo stesso genitore sono 'fratelli': stanno allo stesso livello dell'albero. Nell'albero li vedrai uno accanto all'altro.",
    targetHtml: `<div>
  <p>Primo paragrafo.</p>
  <p>Secondo paragrafo.</p>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasTag("div", "Contiene un <div>"),
      tagHasChildren("div", 2, "p", "Il <div> contiene 2 <p> fratelli"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.4 — Div dentro div (nesting multi-livello)
  // ———————————————————————————————————————————————————————
  {
    id: "div-in-div",
    chapter: 2,
    order: 4,
    title: "Un div dentro un altro div",
    consegna:
      "Crea un <div> esterno che contiene un <div> interno, che a sua volta contiene un <p>.",
    intro:
      "I div si possono annidare quanto vuoi. L'albero mostra tutti i livelli di profondità. Ogni nodo più in basso è dentro a quello sopra.",
    targetHtml: `<div>
  <div>
    <p>Sono dentro a due div!</p>
  </div>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasTag("div", "Contiene almeno un <div>"),
      nestedIn("div", "div", "Un <div> è dentro a un altro <div>"),
      nestedIn("p", "div", "Il <p> è dentro a un <div>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.5 — La classe
  // ———————————————————————————————————————————————————————
  {
    id: "classe-carta",
    chapter: 2,
    order: 5,
    title: 'Dai un nome al div: la classe',
    consegna:
      'Crea un <div class="carta"> che contiene un <h2> e un <p>.',
    intro:
      "La classe è un'etichetta che mettiamo sugli elementi: <div class=\"carta\">. Ci servirà più avanti per dargli lo stile con il CSS.",
    targetHtml: `<div class="carta">
  <h2>Prodotto speciale</h2>
  <p>Scopri le nostre offerte di oggi!</p>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasClass("carta", 'Esiste un elemento con class="carta"'),
      nestedIn("h2", "div", "Il <h2> è dentro al <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.6 — Due classi diverse
  // ———————————————————————————————————————————————————————
  {
    id: "due-classi",
    chapter: 2,
    order: 6,
    title: "Classi diverse per ruoli diversi",
    consegna:
      'Crea due div uno dopo l\'altro: uno con class="titolo" e uno con class="contenuto". Metti un <h1> nel primo e un <p> nel secondo.',
    intro:
      "Le classi permettono di distinguere elementi dello stesso tipo: un div.titolo è diverso da un div.contenuto, anche se sono entrambi <div>.",
    targetHtml: `<div class="titolo">
  <h1>Benvenuto nel blog</h1>
</div>
<div class="contenuto">
  <p>Ecco il contenuto del primo articolo.</p>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasClass("titolo", 'Esiste un div con class="titolo"'),
      hasClass("contenuto", 'Esiste un div con class="contenuto"'),
      hasTag("h1", "Contiene un <h1>"),
      hasTag("p", "Contiene un <p>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.7 — L'id: un nome unico
  // ———————————————————————————————————————————————————————
  {
    id: "id-principale",
    chapter: 2,
    order: 7,
    title: "L'id: un nome unico",
    consegna:
      'Crea un div con id="principale" che contiene un <h1> e un <p>.',
    intro:
      "L'id è come la classe ma UNICO: in tutta la pagina può esistere un solo elemento con quell'id. Si scrive con id=\"nome\" (niente punto, niente virgolette doppie).",
    targetHtml: `<div id="principale">
  <h1>Sezione principale</h1>
  <p>Qui c'è il contenuto più importante della pagina.</p>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasId("principale", 'Esiste un elemento con id="principale"'),
      nestedIn("h1", "div", "Il <h1> è dentro al <div>"),
      nestedIn("p", "div", "Il <p> è dentro al <div>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 2.8 — Mini profilo strutturato (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "profilo-strutturato",
    chapter: 2,
    order: 8,
    title: "Mini profilo strutturato",
    consegna:
      'Crea un div.profilo che contiene due div figli: un div.header (con un <h1>) e un div.body (con due <p>).',
    intro:
      "Qui metti insieme classi e nesting. L'albero mostrerà tre livelli: profilo sopra, header e body in mezzo, h1 e p sotto.",
    targetHtml: `<div class="profilo">
  <div class="header">
    <h1>Mario Rossi</h1>
  </div>
  <div class="body">
    <p>Classe 3A</p>
    <p>Indirizzo informatica</p>
  </div>
</div>`,
    targetCss: DEBUG_DIV_CSS,
    starterHtml: ``,
    starterCss: DEBUG_DIV_CSS,
    checks: [
      hasClass("profilo", "Esiste un div.profilo"),
      hasClass("header", "Esiste un div.header"),
      hasClass("body", "Esiste un div.body"),
      classHasChildren("body", 2, "p", "Il div.body contiene 2 <p>"),
    ],
  },
];
