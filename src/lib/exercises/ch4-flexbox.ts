// Capitolo 4 — Flexbox
// Gli esercizi sono placeholder migrati dalla versione precedente.
// Saranno raffinati e completati quando scriveremo il curriculum completo.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
} from "../exerciseChecks";

export const CH4_EXERCISES: Exercise[] = [
  {
    id: "galleria-flex",
    chapter: 4,
    order: 3,
    title: "Galleria con flex",
    consegna:
      "Crea una galleria di 3 box affiancati. Devi scrivere anche il CSS: usa display: flex sul contenitore.",
    intro:
      "display: flex mette i figli di un elemento in riga. Dando flex: 1 a ciascun figlio, occupano lo stesso spazio.",
    targetHtml: `<div class="galleria">
  <div class="box">Uno</div>
  <div class="box">Due</div>
  <div class="box">Tre</div>
</div>`,
    targetCss: `.galleria {
  display: flex;
  gap: 12px;
  padding: 16px;
}
.box {
  flex: 1;
  background: #282850;
  color: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: `/* Scrivi qui le regole .galleria e .box.
   Suggerimento: la galleria deve avere display: flex.
   Ai box conviene dare flex: 1 per farli riempire lo spazio. */
`,
    checks: [
      hasClass("galleria", "C'è un elemento con classe .galleria"),
      classHasChildren("galleria", 3, "div", "La galleria ha 3 box (<div>)"),
      hasClass("box", "I figli hanno classe .box"),
      hasCssRule(".galleria", "Esiste la regola .galleria"),
      cssRuleHasProperty(
        ".galleria",
        "display",
        "flex",
        ".galleria ha display: flex",
      ),
      hasCssRule(".box", "Esiste la regola .box"),
    ],
  },

  {
    id: "navbar-base",
    chapter: 4,
    order: 5,
    title: "La tua prima navbar",
    consegna:
      "Costruisci una navbar con un logo a sinistra e 3 link. Il CSS è già pronto: concentrati solo sulla struttura HTML.",
    intro:
      "Una navbar è un insieme di elementi in riga. Usando justify-content: space-between su un contenitore flex, logo e menu si spingono ai due lati opposti.",
    targetHtml: `<nav class="navbar">
  <div class="logo">MioSito</div>
  <div class="menu">
    <a href="#">Home</a>
    <a href="#">Chi siamo</a>
    <a href="#">Contatti</a>
  </div>
</nav>`,
    targetCss: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  font-family: sans-serif;
}
.logo {
  font-weight: 900;
  font-size: 18px;
}
.menu {
  display: flex;
  gap: 14px;
}
.menu a {
  color: #aaa;
  text-decoration: none;
  font-weight: 700;
}`,
    starterHtml: ``,
    starterCss: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  font-family: sans-serif;
}
.logo {
  font-weight: 900;
  font-size: 18px;
}
.menu {
  display: flex;
  gap: 14px;
}
.menu a {
  color: #aaa;
  text-decoration: none;
  font-weight: 700;
}
`,
    checks: [
      hasTag("nav", "Contiene un <nav>"),
      hasClass("logo", "C'è un elemento con classe .logo"),
      hasClass("menu", "C'è un elemento con classe .menu"),
      classHasChildren("menu", 3, "a", "Il menu contiene almeno 3 link <a>"),
    ],
  },
];
