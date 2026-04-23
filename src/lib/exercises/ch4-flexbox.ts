// Capitolo 4 — Flexbox
// Concetto chiave: display: flex sul genitore mette i figli in riga
// (o colonna) e dà controllo su allineamento e distribuzione dello spazio.
//
// Strategia: starter HTML e CSS entrambi VUOTI. Consegne esplicite con
// le proprietà flex da usare; la teoria approfondisce il concetto.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
} from "../exerciseChecks";

const ANY = /.+/;

export const CH4_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 4.3 — Galleria con flex
  // ———————————————————————————————————————————————————————
  {
    id: "galleria-flex",
    chapter: 4,
    order: 3,
    title: "Galleria con flex",
    consegna:
      'Crea un <div class="galleria"> con dentro 3 <div class="box"> (con "Uno", "Due", "Tre"). Nel CSS: .galleria con display: flex e gap; .box con flex: 1, background, padding e border-radius.',
    intro:
      "display: flex sul genitore mette i figli in riga. gap aggiunge spazio tra loro. Dando flex: 1 ai figli, occupano tutti la stessa larghezza e riempiono il contenitore.",
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
  color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("galleria", "Esiste un elemento .galleria"),
      classHasChildren("galleria", 3, "div", "La galleria contiene 3 <div>"),
      hasClass("box", 'I figli hanno class="box"'),
      hasCssRule(".galleria", "Esiste la regola .galleria"),
      cssRuleHasProperty(".galleria", "display", "flex", ".galleria ha display: flex"),
      hasCssRule(".box", "Esiste la regola .box"),
      cssRuleHasProperty(".box", "background", ANY, ".box ha un background"),
      cssRuleHasProperty(".box", "padding", ANY, ".box ha un padding"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 4.5 — Navbar completa
  // ———————————————————————————————————————————————————————
  {
    id: "navbar-base",
    chapter: 4,
    order: 5,
    title: "La tua prima navbar",
    consegna:
      'Scrivi un <nav class="navbar"> con dentro <div class="logo"> e <div class="menu"> (il menu contiene 3 <a>). Nel CSS: .navbar con display: flex e justify-content: space-between; .menu con display: flex e gap.',
    intro:
      "Una navbar è un insieme di elementi disposti in riga. Con display: flex sul .navbar i figli vanno in riga; justify-content: space-between li spinge ai due lati opposti (logo a sinistra, menu a destra).",
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
  color: white;
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
    starterCss: ``,
    checks: [
      hasTag("nav", "Contiene un <nav>"),
      hasClass("navbar", 'Il <nav> ha class="navbar"'),
      hasClass("logo", "Esiste .logo"),
      hasClass("menu", "Esiste .menu"),
      classHasChildren("menu", 3, "a", ".menu contiene 3 <a>"),
      hasCssRule(".navbar", "Esiste la regola .navbar"),
      cssRuleHasProperty(".navbar", "display", "flex", ".navbar ha display: flex"),
      cssRuleHasProperty(
        ".navbar",
        "justify-content",
        ANY,
        ".navbar ha justify-content",
      ),
      hasCssRule(".menu", "Esiste la regola .menu"),
      cssRuleHasProperty(".menu", "display", "flex", ".menu ha display: flex"),
    ],
  },
];
