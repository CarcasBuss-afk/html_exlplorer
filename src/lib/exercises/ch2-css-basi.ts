// Capitolo 2 — CSS basi
// Concetto chiave: il CSS dà stile agli elementi HTML che lo studente
// ha imparato nel cap. 1. Niente <div> in questo capitolo: li vedremo
// nel cap. 3, quando lo studente saprà già stilizzarli.
//
// Strategia: starter HTML e CSS entrambi VUOTI. Lo studente scrive
// l'HTML (rinforzando il cap. 1) E il CSS (nuovo). Le consegne sono
// esplicite sia sulla struttura HTML sia sulle proprietà CSS richieste.

import type { Exercise } from "@/types/explorer";
import {
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
} from "../exerciseChecks";

// Valore qualsiasi (per i check "ha impostato la proprietà").
const ANY = /.+/;

export const CH2_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 2.1 — Primo colore
  // ———————————————————————————————————————————————————————
  {
    id: "primo-colore",
    chapter: 2,
    order: 1,
    title: "Il tuo primo colore",
    consegna:
      "Scrivi un paragrafo <p> con del testo. Poi nel CSS aggiungi una regola p { } con la proprietà color per cambiare il colore del testo.",
    intro:
      "Il CSS funziona così: selettore { proprietà: valore; }. Esempio: p { color: red; } cambia il colore di TUTTI i paragrafi. Il selettore p prende tutti i tag <p> della pagina.",
    targetHtml: `<p>Questo paragrafo ha un colore diverso dal normale.</p>`,
    targetCss: `p {
  color: #4ecdc4;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene un <p>"),
      hasCssRule("p", "Esiste la regola p"),
      cssRuleHasProperty("p", "color", ANY, "La regola p ha un color"),
    ],
    topics: ["css-base", "selettore-tag", "regola-css", "color"],
  },

  // ———————————————————————————————————————————————————————
  // 2.2 — Sfondo colorato
  // ———————————————————————————————————————————————————————
  {
    id: "sfondo-colorato",
    chapter: 2,
    order: 2,
    title: "Uno sfondo colorato",
    consegna:
      "Scrivi un titolo <h1>. Nel CSS aggiungi una regola h1 { } con background (lo sfondo) e padding (per dargli un po' di aria).",
    intro:
      "background colora lo sfondo dietro all'elemento. Abbinalo a color per il testo e a padding per aggiungere spazio interno: così il titolo diventa una specie di banner.",
    targetHtml: `<h1>Titolo importante</h1>`,
    targetCss: `h1 {
  background: #fbbf24;
  color: #000;
  padding: 12px 16px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h1", "Contiene un <h1>"),
      hasCssRule("h1", "Esiste la regola h1"),
      cssRuleHasProperty("h1", "background", ANY, "h1 ha un background"),
      cssRuleHasProperty("h1", "padding", ANY, "h1 ha un padding"),
    ],
    topics: ["background", "padding"],
  },

  // ———————————————————————————————————————————————————————
  // 2.3 — Selettore per classe
  // ———————————————————————————————————————————————————————
  {
    id: "selettore-classe",
    chapter: 2,
    order: 3,
    title: "Selettore per classe",
    consegna:
      'Scrivi due paragrafi: uno con class="evidenza" e uno normale. Nel CSS scrivi .evidenza { } con background e color (tieni fuori gli altri p).',
    intro:
      "Per selezionare una classe usa il PUNTO prima del nome: .evidenza { ... } applica lo stile SOLO agli elementi con class=\"evidenza\".",
    targetHtml: `<p class="evidenza">Questo paragrafo è importante!</p>
<p>Questo è un paragrafo normale.</p>`,
    targetCss: `.evidenza {
  background: #ff6b6b;
  color: white;
  padding: 10px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene almeno un <p>"),
      hasClass("evidenza", 'Un <p> ha class="evidenza"'),
      hasCssRule(".evidenza", "Esiste la regola .evidenza"),
      cssRuleHasProperty(".evidenza", "background", ANY, ".evidenza ha un background"),
    ],
    topics: ["class", "attributo-class", "selettore-classe"],
  },

  // ———————————————————————————————————————————————————————
  // 2.4 — Centrare il testo
  // ———————————————————————————————————————————————————————
  {
    id: "testo-centrato",
    chapter: 2,
    order: 4,
    title: "Centrare il testo",
    consegna:
      'Scrivi DUE paragrafi: uno con class="centrato" e uno normale. Nel CSS stila .centrato con text-align: center, background e padding.',
    intro:
      "text-align: center centra il testo dentro al suo box. Come per color e background, puoi applicarlo a un selettore di classe per colpire solo certi elementi.",
    targetHtml: `<p class="centrato">Questo paragrafo è centrato!</p>
<p>Questo paragrafo è allineato normalmente (a sinistra).</p>`,
    targetCss: `.centrato {
  text-align: center;
  background: #a78bfa;
  color: white;
  padding: 14px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene almeno un <p>"),
      hasClass("centrato", 'Un <p> ha class="centrato"'),
      hasCssRule(".centrato", "Esiste la regola .centrato"),
      cssRuleHasProperty(
        ".centrato",
        "text-align",
        "center",
        ".centrato ha text-align: center",
      ),
      cssRuleHasProperty(".centrato", "background", ANY, ".centrato ha un background"),
    ],
    topics: ["text-align"],
  },

  // ———————————————————————————————————————————————————————
  // 2.5 — Padding
  // ———————————————————————————————————————————————————————
  {
    id: "padding",
    chapter: 2,
    order: 5,
    title: "Padding: lo spazio interno",
    consegna:
      'Scrivi un paragrafo con class="scatola". Nel CSS stila .scatola con background, color e padding (almeno 20px).',
    intro:
      "padding è lo spazio tra il bordo del box e il suo contenuto. Più padding = più aria dentro. Si misura in px (es. padding: 20px). Prova anche due valori: padding: 10px 30px (sopra/sotto, sinistra/destra).",
    targetHtml: `<p class="scatola">Guarda quanto sono comodo qui dentro!</p>`,
    targetCss: `.scatola {
  background: #282850;
  color: white;
  padding: 24px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene un <p>"),
      hasClass("scatola", 'Un <p> ha class="scatola"'),
      hasCssRule(".scatola", "Esiste la regola .scatola"),
      cssRuleHasProperty(".scatola", "background", ANY, ".scatola ha un background"),
      cssRuleHasProperty(".scatola", "padding", ANY, ".scatola ha un padding"),
    ],
    topics: ["padding-shorthand", "px"],
  },

  // ———————————————————————————————————————————————————————
  // 2.6 — Margin
  // ———————————————————————————————————————————————————————
  {
    id: "margin",
    chapter: 2,
    order: 6,
    title: "Margin: lo spazio esterno",
    consegna:
      'Scrivi DUE paragrafi, entrambi con class="blocco". Nel CSS stila .blocco con background, padding e margin: i due blocchi si devono allontanare tra loro.',
    intro:
      "margin è lo spazio FUORI dal box. Mentre il padding allontana il contenuto dal bordo, il margin allontana l'elemento dai suoi vicini.",
    targetHtml: `<p class="blocco">Primo blocco</p>
<p class="blocco">Secondo blocco</p>`,
    targetCss: `.blocco {
  background: #4ecdc4;
  color: black;
  padding: 14px;
  margin: 20px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene almeno un <p>"),
      hasClass("blocco", "Esistono <p> con class=\"blocco\""),
      hasCssRule(".blocco", "Esiste la regola .blocco"),
      cssRuleHasProperty(".blocco", "padding", ANY, ".blocco ha un padding"),
      cssRuleHasProperty(".blocco", "margin", ANY, ".blocco ha un margin"),
    ],
    topics: ["margin", "box-model"],
  },

  // ———————————————————————————————————————————————————————
  // 2.7 — Bordi arrotondati
  // ———————————————————————————————————————————————————————
  {
    id: "bordi-arrotondati",
    chapter: 2,
    order: 7,
    title: "Bordi e angoli arrotondati",
    consegna:
      'Scrivi un paragrafo con class="pillola". Nel CSS stila .pillola con display: inline-block, background, padding, border (es. 3px solid) e border-radius: 999px.',
    intro:
      "border disegna una cornice: border: 2px solid red. border-radius arrotonda gli angoli — con valori grandi (es. 999px) diventa un cerchio/pillola. display: inline-block rende il paragrafo largo quanto il contenuto.",
    targetHtml: `<p class="pillola">Sono una pillola!</p>`,
    targetCss: `.pillola {
  display: inline-block;
  padding: 10px 20px;
  background: #fbbf24;
  color: black;
  border: 3px solid #ff6b6b;
  border-radius: 999px;
  font-weight: 700;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("pillola", 'Un <p> ha class="pillola"'),
      hasCssRule(".pillola", "Esiste la regola .pillola"),
      cssRuleHasProperty(".pillola", "background", ANY, ".pillola ha un background"),
      cssRuleHasProperty(".pillola", "padding", ANY, ".pillola ha un padding"),
      cssRuleHasProperty(".pillola", "border", ANY, ".pillola ha un border"),
      cssRuleHasProperty(".pillola", "border-radius", ANY, ".pillola ha un border-radius"),
    ],
    topics: ["border", "border-radius", "display-inline-block", "font-weight"],
  },

  // ———————————————————————————————————————————————————————
  // 2.8 — Titolo manifesto (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "titolo-manifesto",
    chapter: 2,
    order: 8,
    title: "Titolo manifesto",
    consegna:
      "Scrivi un <h1> con il tuo nome o uno slogan. Nel CSS stila h1 con background, color, padding e border-radius per creare un titolo d'impatto.",
    intro:
      "Metti insieme tutto quello che hai imparato: sfondo + testo contrastato + spazio interno + angoli arrotondati. Scegli i colori che preferisci.",
    targetHtml: `<h1>Benvenuto nel mio sito!</h1>`,
    targetCss: `h1 {
  background: #1c1c38;
  color: #34d399;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  font-family: sans-serif;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h1", "Contiene un <h1>"),
      hasCssRule("h1", "Esiste la regola h1"),
      cssRuleHasProperty("h1", "background", ANY, "h1 ha un background"),
      cssRuleHasProperty("h1", "color", ANY, "h1 ha un color"),
      cssRuleHasProperty("h1", "padding", ANY, "h1 ha un padding"),
      cssRuleHasProperty("h1", "border-radius", ANY, "h1 ha un border-radius"),
    ],
    topics: ["font-family"],
  },
];
