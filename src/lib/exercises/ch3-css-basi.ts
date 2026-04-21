// Capitolo 3 — CSS basi
// Concetto chiave: il CSS dà stile all'HTML. Lo studente impara selettori
// (tag/class/id), colori, padding, margin, border, border-radius.
//
// Strategia: l'HTML è pre-compilato e non va toccato. Lo studente lavora
// solo nel pannello CSS. Ogni esercizio aggiunge UNA proprietà nuova.

import type { Exercise } from "@/types/explorer";
import { cssRuleHasProperty, hasCssRule } from "../exerciseChecks";

// Qualsiasi valore non vuoto: usato per i check "ha impostato la proprietà".
const ANY_VALUE = /.+/;

export const CH3_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 3.1 — Il primo colore
  // ———————————————————————————————————————————————————————
  {
    id: "primo-colore",
    chapter: 3,
    order: 1,
    title: "Il tuo primo colore",
    consegna:
      "Cambia il colore del paragrafo. Aggiungi una regola CSS che usa il selettore p e la proprietà color.",
    intro:
      "Il CSS funziona così: selettore { proprietà: valore; }. Esempio: p { color: red; } cambia il colore di TUTTI i paragrafi della pagina.",
    targetHtml: `<h1>Benvenuto</h1>
<p>Questo paragrafo ha un colore diverso da quello normale.</p>`,
    targetCss: `p {
  color: #4ecdc4;
}`,
    starterHtml: `<h1>Benvenuto</h1>
<p>Questo paragrafo ha un colore diverso da quello normale.</p>`,
    starterCss: ``,
    checks: [
      hasCssRule("p", "Esiste una regola per il selettore p"),
      cssRuleHasProperty("p", "color", ANY_VALUE, "La regola p ha un color"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.2 — Uno sfondo colorato
  // ———————————————————————————————————————————————————————
  {
    id: "sfondo-colorato",
    chapter: 3,
    order: 2,
    title: "Uno sfondo colorato",
    consegna:
      "Aggiungi un colore di sfondo al titolo h1 usando la proprietà background.",
    intro:
      "background imposta il colore dietro l'elemento. Insieme a color (che è il colore del testo) ti permette di creare contrasti leggibili.",
    targetHtml: `<h1>Titolo importante</h1>
<p>Un paragrafo normale.</p>`,
    targetCss: `h1 {
  background: #fbbf24;
  color: #000;
  padding: 10px;
}`,
    starterHtml: `<h1>Titolo importante</h1>
<p>Un paragrafo normale.</p>`,
    starterCss: ``,
    checks: [
      hasCssRule("h1", "Esiste una regola per h1"),
      cssRuleHasProperty("h1", "background", ANY_VALUE, "h1 ha un background"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.3 — Selettore per classe
  // ———————————————————————————————————————————————————————
  {
    id: "selettore-classe",
    chapter: 3,
    order: 3,
    title: "Selettore per classe",
    consegna:
      "Dai un colore di sfondo al div con classe evidenza usando il selettore .evidenza.",
    intro:
      "Per selezionare una classe usa il PUNTO prima del nome: .evidenza { ... } applica lo stile a tutti gli elementi con class=\"evidenza\".",
    targetHtml: `<div class="evidenza">Questo div è importante!</div>
<div>Questo è un div normale.</div>`,
    targetCss: `.evidenza {
  background: #ff6b6b;
  color: white;
  padding: 12px;
}`,
    starterHtml: `<div class="evidenza">Questo div è importante!</div>
<div>Questo è un div normale.</div>`,
    starterCss: ``,
    checks: [
      hasCssRule(".evidenza", "Esiste una regola per .evidenza"),
      cssRuleHasProperty(
        ".evidenza",
        "background",
        ANY_VALUE,
        ".evidenza ha un background",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.4 — Selettore per id
  // ———————————————————————————————————————————————————————
  {
    id: "selettore-id",
    chapter: 3,
    order: 4,
    title: "Selettore per id",
    consegna:
      "Dai uno stile al div con id principale usando il selettore #principale.",
    intro:
      "Per selezionare un id usa il CANCELLETTO prima del nome: #principale { ... }. Ricorda: l'id è unico nella pagina.",
    targetHtml: `<div id="principale">Sezione principale</div>
<div>Sezione normale</div>`,
    targetCss: `#principale {
  background: #a78bfa;
  color: white;
  padding: 14px;
  font-weight: 900;
}`,
    starterHtml: `<div id="principale">Sezione principale</div>
<div>Sezione normale</div>`,
    starterCss: ``,
    checks: [
      hasCssRule("#principale", "Esiste una regola per #principale"),
      cssRuleHasProperty(
        "#principale",
        "background",
        ANY_VALUE,
        "#principale ha un background",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.5 — Padding: lo spazio interno
  // ———————————————————————————————————————————————————————
  {
    id: "padding",
    chapter: 3,
    order: 5,
    title: "Padding: lo spazio interno",
    consegna:
      "Aggiungi spazio INTERNO al div.scatola usando la proprietà padding.",
    intro:
      "padding è lo spazio tra il bordo del box e il suo contenuto. Più padding = più aria dentro. Si misura in pixel (es. padding: 20px).",
    targetHtml: `<div class="scatola">Guarda quanto sono comodo qui dentro!</div>`,
    targetCss: `.scatola {
  background: #282850;
  color: white;
  padding: 24px;
}`,
    starterHtml: `<div class="scatola">Guarda quanto sono comodo qui dentro!</div>`,
    starterCss: `.scatola {
  background: #282850;
  color: white;
}
`,
    checks: [
      hasCssRule(".scatola", "Esiste una regola per .scatola"),
      cssRuleHasProperty(
        ".scatola",
        "padding",
        ANY_VALUE,
        ".scatola ha un padding",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.6 — Margin: lo spazio esterno
  // ———————————————————————————————————————————————————————
  {
    id: "margin",
    chapter: 3,
    order: 6,
    title: "Margin: lo spazio esterno",
    consegna:
      "Aggiungi spazio ESTERNO tra i due div.blocco usando la proprietà margin.",
    intro:
      "margin è lo spazio fuori dal box. Separa l'elemento da quelli vicini. Se hai due div attaccati, dare margin li allontana tra loro.",
    targetHtml: `<div class="blocco">Primo blocco</div>
<div class="blocco">Secondo blocco</div>`,
    targetCss: `.blocco {
  background: #4ecdc4;
  color: black;
  padding: 16px;
  margin: 20px;
}`,
    starterHtml: `<div class="blocco">Primo blocco</div>
<div class="blocco">Secondo blocco</div>`,
    starterCss: `.blocco {
  background: #4ecdc4;
  color: black;
  padding: 16px;
}
`,
    checks: [
      hasCssRule(".blocco", "Esiste una regola per .blocco"),
      cssRuleHasProperty(".blocco", "margin", ANY_VALUE, ".blocco ha un margin"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.7 — Bordi e angoli arrotondati
  // ———————————————————————————————————————————————————————
  {
    id: "bordi-arrotondati",
    chapter: 3,
    order: 7,
    title: "Bordi e angoli arrotondati",
    consegna:
      "Aggiungi al div.pillola un bordo (border) e angoli arrotondati (border-radius).",
    intro:
      "border disegna una cornice attorno al box. Sintassi: border: 2px solid red. border-radius arrotonda gli angoli: più grande il valore, più arrotondati.",
    targetHtml: `<div class="pillola">Sono una pillola!</div>`,
    targetCss: `.pillola {
  display: inline-block;
  padding: 10px 20px;
  background: #fbbf24;
  color: black;
  border: 3px solid #ff6b6b;
  border-radius: 999px;
  font-weight: 700;
}`,
    starterHtml: `<div class="pillola">Sono una pillola!</div>`,
    starterCss: `.pillola {
  display: inline-block;
  padding: 10px 20px;
  background: #fbbf24;
  color: black;
  font-weight: 700;
}
`,
    checks: [
      hasCssRule(".pillola", "Esiste una regola per .pillola"),
      cssRuleHasProperty(".pillola", "border", ANY_VALUE, ".pillola ha un border"),
      cssRuleHasProperty(
        ".pillola",
        "border-radius",
        ANY_VALUE,
        ".pillola ha un border-radius",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 3.8 — Card stilizzata (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "card-stilizzata",
    chapter: 3,
    order: 8,
    title: "Una card stilizzata",
    consegna:
      "Stilizza il div.card aggiungendo: background, color, padding, border-radius. Usa il titolo come preferisci.",
    intro:
      "Consolidiamo tutto: una card ha sfondo, testo ben contrastato, respiro interno (padding) e angoli arrotondati. Scegli tu i colori!",
    targetHtml: `<div class="card">
  <h3>La mia card</h3>
  <p>Un testo che descrive qualcosa di interessante.</p>
</div>`,
    targetCss: `.card {
  background: #1c1c38;
  color: #e8e8f0;
  padding: 20px;
  border-radius: 12px;
  width: 280px;
  font-family: sans-serif;
}
.card h3 {
  margin: 0 0 8px 0;
  color: #34d399;
}
.card p {
  margin: 0;
  line-height: 1.5;
}`,
    starterHtml: `<div class="card">
  <h3>La mia card</h3>
  <p>Un testo che descrive qualcosa di interessante.</p>
</div>`,
    starterCss: ``,
    checks: [
      hasCssRule(".card", "Esiste una regola per .card"),
      cssRuleHasProperty(".card", "background", ANY_VALUE, ".card ha un background"),
      cssRuleHasProperty(".card", "color", ANY_VALUE, ".card ha un color"),
      cssRuleHasProperty(".card", "padding", ANY_VALUE, ".card ha un padding"),
      cssRuleHasProperty(
        ".card",
        "border-radius",
        ANY_VALUE,
        ".card ha un border-radius",
      ),
    ],
  },
];
