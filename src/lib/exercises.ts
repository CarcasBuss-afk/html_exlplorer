// Catalogo degli esercizi didattici.
// Ogni esercizio ha un modello (target) da replicare, uno starter da cui
// partire, e una lista di check auto-verificati sul DOM/CSS dello studente.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
  nestedIn,
} from "./exerciseChecks";

export const EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // Livello 1 — Prima navbar: solo struttura HTML, CSS già pronto
  // ———————————————————————————————————————————————————————
  {
    id: "navbar-base",
    level: 1,
    title: "La tua prima navbar",
    consegna:
      "Costruisci una navbar con un logo a sinistra e 3 link. Il CSS è già pronto: concentrati solo sulla struttura HTML.",
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
    starterHtml: `<!-- Costruisci qui la tua navbar.
     Suggerimento: usa <nav class="navbar">,
     dentro metti un <div class="logo"> e un <div class="menu"> con 3 <a>. -->
`,
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

  // ———————————————————————————————————————————————————————
  // Livello 2 — Card prodotto: nesting base + classi
  // ———————————————————————————————————————————————————————
  {
    id: "card-prodotto",
    level: 2,
    title: "Card prodotto",
    consegna:
      "Crea una card con un titolo, un prezzo e un pulsante. Usa un <article> come contenitore principale.",
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
    starterHtml: `<!-- Crea un <article class="card"> che contiene:
     un <h3 class="titolo">, un <p class="prezzo"> e un <button class="btn">. -->
`,
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

  // ———————————————————————————————————————————————————————
  // Livello 3 — Layout flex: struttura + CSS da scrivere
  // ———————————————————————————————————————————————————————
  {
    id: "galleria-flex",
    level: 3,
    title: "Galleria con flex",
    consegna:
      "Crea una galleria di 3 box affiancati. Stavolta devi scrivere anche il CSS: usa display: flex sul contenitore.",
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
    starterHtml: `<!-- Crea un <div class="galleria"> che contiene 3 <div class="box">.
     Dentro ogni box metti una parola (Uno, Due, Tre). -->
`,
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
        "\\.galleria",
        "display",
        "flex",
        ".galleria ha display: flex",
      ),
      hasCssRule(".box", "Esiste la regola .box"),
    ],
  },
];

export function findExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
