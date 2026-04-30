// Capitolo 4 — Flexbox
// Concetto chiave: display: flex sul genitore mette i figli in riga
// (o colonna) e dà controllo su allineamento e distribuzione dello spazio.
//
// Progressione molto lenta: ogni esercizio aggiunge UNA proprietà nuova.
// Starter HTML e CSS sempre vuoti. Consegne esplicite.

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
  // 4.1 — Primo display: flex
  // ———————————————————————————————————————————————————————
  {
    id: "tre-scatole-riga",
    chapter: 4,
    order: 1,
    title: "Tre scatole in riga",
    consegna:
      'Crea un <div class="riga"> che contiene 3 <div class="box"> con dentro i numeri 1, 2, 3. Nel CSS stila .riga con display: flex; stila .box con background, padding, color.',
    intro:
      "Normalmente i div vanno uno SOTTO l'altro. display: flex sul genitore li mette uno ACCANTO all'altro, in riga. È la prima cosa che fa flexbox.",
    targetHtml: `<div class="riga">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
    targetCss: `.riga {
  display: flex;
}
.box {
  background: #4ecdc4;
  color: black;
  padding: 20px;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("riga", "Esiste un elemento .riga"),
      classHasChildren("riga", 3, "div", ".riga contiene 3 <div>"),
      hasClass("box", 'I figli hanno class="box"'),
      hasCssRule(".riga", "Esiste la regola .riga"),
      cssRuleHasProperty(".riga", "display", "flex", ".riga ha display: flex"),
      hasCssRule(".box", "Esiste la regola .box"),
      cssRuleHasProperty(".box", "background", ANY, ".box ha un background"),
      cssRuleHasProperty(".box", "padding", ANY, ".box ha un padding"),
    ],
    topics: ["display-flex", "flexbox", "asse-principale"],
  },

  // ———————————————————————————————————————————————————————
  // 4.2 — gap fra fratelli
  // ———————————————————————————————————————————————————————
  {
    id: "gap-fra-fratelli",
    chapter: 4,
    order: 2,
    title: "Distanziare con gap",
    consegna:
      'Come l\'esercizio precedente: .riga con 3 .box. Questa volta aggiungi alla .riga anche gap: 16px per distanziare i box.',
    intro:
      "gap è uno spazio fisso fra tutti i figli di un contenitore flex. Molto più pulito che mettere margin su ogni figlio.",
    targetHtml: `<div class="riga">
  <div class="box">Uno</div>
  <div class="box">Due</div>
  <div class="box">Tre</div>
</div>`,
    targetCss: `.riga {
  display: flex;
  gap: 16px;
}
.box {
  background: #a78bfa;
  color: black;
  padding: 20px;
  font-weight: 700;
  font-family: sans-serif;
  border-radius: 6px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("riga", "Esiste .riga"),
      classHasChildren("riga", 3, "div", ".riga contiene 3 <div>"),
      hasClass("box", ".box presente"),
      hasCssRule(".riga", "Esiste la regola .riga"),
      cssRuleHasProperty(".riga", "display", "flex", ".riga ha display: flex"),
      cssRuleHasProperty(".riga", "gap", ANY, ".riga ha un gap"),
      cssRuleHasProperty(".box", "background", ANY, ".box ha un background"),
    ],
    topics: ["gap"],
  },

  // ———————————————————————————————————————————————————————
  // 4.3 — Galleria con flex: 1
  // ———————————————————————————————————————————————————————
  {
    id: "galleria-flex",
    chapter: 4,
    order: 3,
    title: "Galleria con flex",
    consegna:
      'Crea una <div class="galleria"> con 3 <div class="box"> dentro. Nel CSS: .galleria con display: flex e gap; .box con flex: 1, background, padding, border-radius.',
    intro:
      "Dando flex: 1 ai figli, occupano tutti la stessa larghezza e riempiono il contenitore. Se allarghi la finestra, si allargano con lei.",
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
      classHasChildren("galleria", 3, "div", ".galleria contiene 3 <div>"),
      hasClass("box", 'I figli hanno class="box"'),
      hasCssRule(".galleria", "Esiste la regola .galleria"),
      cssRuleHasProperty(".galleria", "display", "flex", ".galleria ha display: flex"),
      hasCssRule(".box", "Esiste la regola .box"),
      cssRuleHasProperty(".box", "flex", ANY, ".box ha la proprietà flex"),
      cssRuleHasProperty(".box", "background", ANY, ".box ha un background"),
    ],
    topics: ["flex-1", "flex-grow", "larghezze-uguali"],
  },

  // ———————————————————————————————————————————————————————
  // 4.4 — Direzione colonna
  // ———————————————————————————————————————————————————————
  {
    id: "direzione-colonna",
    chapter: 4,
    order: 4,
    title: "Direzione colonna",
    consegna:
      'Crea una <div class="colonna"> con 3 <div class="box"> dentro. Nel CSS stila .colonna con display: flex, flex-direction: column e gap: 10px; stila .box con background e padding.',
    intro:
      "flex-direction: column cambia la direzione principale: i figli tornano a essere uno sotto l'altro, ma adesso puoi usare gap, justify-content e align-items come in riga.",
    targetHtml: `<div class="colonna">
  <div class="box">Primo</div>
  <div class="box">Secondo</div>
  <div class="box">Terzo</div>
</div>`,
    targetCss: `.colonna {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
}
.box {
  background: #fb923c;
  color: black;
  padding: 16px;
  border-radius: 6px;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("colonna", "Esiste .colonna"),
      classHasChildren("colonna", 3, "div", ".colonna contiene 3 <div>"),
      hasClass("box", ".box presente"),
      hasCssRule(".colonna", "Esiste la regola .colonna"),
      cssRuleHasProperty(".colonna", "display", "flex", ".colonna ha display: flex"),
      cssRuleHasProperty(
        ".colonna",
        "flex-direction",
        "column",
        ".colonna ha flex-direction: column",
      ),
      cssRuleHasProperty(".colonna", "gap", ANY, ".colonna ha un gap"),
    ],
    topics: ["flex-direction", "flex-direction-column", "asse-trasversale"],
  },

  // ———————————————————————————————————————————————————————
  // 4.5 — Navbar completa (space-between)
  // ———————————————————————————————————————————————————————
  {
    id: "navbar-base",
    chapter: 4,
    order: 5,
    title: "La tua prima navbar",
    consegna:
      'Scrivi un <nav class="navbar"> con dentro <div class="logo"> e <div class="menu"> (il menu contiene 3 <a>). Nel CSS: .navbar con display: flex e justify-content: space-between; .menu con display: flex e gap.',
    intro:
      "justify-content: space-between spinge il primo figlio a sinistra, l'ultimo a destra, e distribuisce lo spazio in mezzo. Perfetto per una navbar con logo a sx e menu a dx.",
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
        "space-between",
        ".navbar ha justify-content: space-between",
      ),
      hasCssRule(".menu", "Esiste la regola .menu"),
      cssRuleHasProperty(".menu", "display", "flex", ".menu ha display: flex"),
    ],
    topics: [
      "nav",
      "justify-content",
      "space-between",
      "align-items",
      "font-size",
      "text-decoration",
    ],
  },

  // ———————————————————————————————————————————————————————
  // 4.6 — Centrare tutto
  // ———————————————————————————————————————————————————————
  {
    id: "centrare-tutto",
    chapter: 4,
    order: 6,
    title: "Centrare tutto",
    consegna:
      'Crea una <div class="centroide"> che contiene un <div class="punto">. Nel CSS stila .centroide con display: flex, justify-content: center, align-items: center, height: 300px e background; stila .punto con background e padding.',
    intro:
      "In un contenitore flex, justify-content allinea sull'asse principale, align-items sull'asse trasversale. Mettendo center su entrambi, il figlio è perfettamente al centro — orizzontale E verticale.",
    targetHtml: `<div class="centroide">
  <div class="punto">Sono al centro!</div>
</div>`,
    targetCss: `.centroide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: #1c1c38;
  border-radius: 10px;
}
.punto {
  background: #34d399;
  color: black;
  padding: 20px 30px;
  border-radius: 8px;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("centroide", "Esiste .centroide"),
      hasClass("punto", "Esiste .punto"),
      hasCssRule(".centroide", "Esiste la regola .centroide"),
      cssRuleHasProperty(".centroide", "display", "flex", ".centroide ha display: flex"),
      cssRuleHasProperty(
        ".centroide",
        "justify-content",
        "center",
        ".centroide ha justify-content: center",
      ),
      cssRuleHasProperty(
        ".centroide",
        "align-items",
        "center",
        ".centroide ha align-items: center",
      ),
      cssRuleHasProperty(".centroide", "height", ANY, ".centroide ha un'altezza"),
      hasCssRule(".punto", "Esiste la regola .punto"),
      cssRuleHasProperty(".punto", "background", ANY, ".punto ha un background"),
    ],
    topics: ["justify-content-center", "align-items-center", "height", "centratura"],
  },

  // ———————————————————————————————————————————————————————
  // 4.7 — space-around vs space-between
  // ———————————————————————————————————————————————————————
  {
    id: "spazi-around-between",
    chapter: 4,
    order: 7,
    title: "Space-around vs Space-between",
    consegna:
      'Crea DUE righe: la prima <div class="riga-between"> con 3 .box e justify-content: space-between; la seconda <div class="riga-around"> con 3 .box e justify-content: space-around. Osserva la differenza tra le due.',
    intro:
      "space-between: spazio uguale TRA i figli, niente ai bordi. space-around: spazio uguale anche AI BORDI (ma metà rispetto a quello tra i figli). Entrambi sono modi diversi di distribuire lo spazio vuoto.",
    targetHtml: `<div class="riga-between">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>
<div class="riga-around">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
    targetCss: `.riga-between {
  display: flex;
  justify-content: space-between;
  background: #161628;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
}
.riga-around {
  display: flex;
  justify-content: space-around;
  background: #161628;
  padding: 12px;
  border-radius: 6px;
}
.box {
  background: #ff6b6b;
  color: white;
  padding: 14px 20px;
  border-radius: 6px;
  font-weight: 700;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("riga-between", "Esiste .riga-between"),
      hasClass("riga-around", "Esiste .riga-around"),
      hasClass("box", "Esistono .box"),
      hasCssRule(".riga-between", "Esiste la regola .riga-between"),
      cssRuleHasProperty(
        ".riga-between",
        "display",
        "flex",
        ".riga-between ha display: flex",
      ),
      cssRuleHasProperty(
        ".riga-between",
        "justify-content",
        "space-between",
        ".riga-between ha justify-content: space-between",
      ),
      hasCssRule(".riga-around", "Esiste la regola .riga-around"),
      cssRuleHasProperty(
        ".riga-around",
        "display",
        "flex",
        ".riga-around ha display: flex",
      ),
      cssRuleHasProperty(
        ".riga-around",
        "justify-content",
        "space-around",
        ".riga-around ha justify-content: space-around",
      ),
    ],
    topics: ["space-around", "space-evenly", "distribuzione-spazio"],
  },

  // ———————————————————————————————————————————————————————
  // 4.8 — Card con flex verticale (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "card-flex-verticale",
    chapter: 4,
    order: 8,
    title: "Card a 3 sezioni con flex verticale",
    consegna:
      'Crea una <div class="card"> che contiene 3 figli: <div class="header"> (con un <h3>), <div class="body"> (con un <p>), <div class="footer"> (con un <button>). Stila .card con display: flex, flex-direction: column, gap, background, padding, border-radius. Dai stili anche a header/body/footer.',
    intro:
      "Flex non serve solo per righe orizzontali. Con flex-direction: column puoi distribuire header/body/footer di una card con gap uniforme e stili separati. È un pattern base per quasi ogni UI.",
    targetHtml: `<div class="card">
  <div class="header">
    <h3>Articolo del giorno</h3>
  </div>
  <div class="body">
    <p>Un breve estratto dell'articolo che invoglia a cliccare per leggere di più.</p>
  </div>
  <div class="footer">
    <button>Leggi tutto</button>
  </div>
</div>`,
    targetCss: `.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 16px;
  border-radius: 12px;
  width: 300px;
  font-family: sans-serif;
}
.header h3 {
  margin: 0;
  color: #34d399;
}
.body p {
  margin: 0;
  line-height: 1.5;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.footer button {
  background: #4ecdc4;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("card", "Esiste .card"),
      hasClass("header", "Esiste .header"),
      hasClass("body", "Esiste .body"),
      hasClass("footer", "Esiste .footer"),
      hasTag("h3", "Contiene un <h3>"),
      hasTag("p", "Contiene un <p>"),
      hasTag("button", "Contiene un <button>"),
      hasCssRule(".card", "Esiste la regola .card"),
      cssRuleHasProperty(".card", "display", "flex", ".card ha display: flex"),
      cssRuleHasProperty(
        ".card",
        "flex-direction",
        "column",
        ".card ha flex-direction: column",
      ),
      cssRuleHasProperty(".card", "gap", ANY, ".card ha un gap"),
      cssRuleHasProperty(".card", "background", ANY, ".card ha un background"),
      cssRuleHasProperty(".card", "padding", ANY, ".card ha un padding"),
      cssRuleHasProperty(".card", "border-radius", ANY, ".card ha un border-radius"),
    ],
    topics: [
      "button",
      "flex-end",
      "line-height",
      "cursor-pointer",
      "card-pattern",
      "width",
    ],
  },
];
