// Capitolo 1 — Primi tag HTML
// Concetto chiave: un documento HTML è fatto di tag.
// Qui lo studente incontra i tag più fondamentali: h1-h6, p, a, img.

import type { Exercise } from "@/types/explorer";
import { hasTag } from "../exerciseChecks";

export const CH1_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 1.1 — Il primo titolo
  // ———————————————————————————————————————————————————————
  {
    id: "primo-titolo",
    chapter: 1,
    order: 1,
    title: "Il tuo primo titolo",
    consegna: "Scrivi un titolo principale con il testo che vuoi.",
    intro:
      "Un titolo grande si scrive con <h1>testo</h1>. Il tag <h1> apre, il testo va in mezzo, </h1> chiude.",
    targetHtml: `<h1>Benvenuto nel mio sito!</h1>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [hasTag("h1", "Contiene un <h1>")],
  },

  // ———————————————————————————————————————————————————————
  // 1.2 — Titolo + paragrafo
  // ———————————————————————————————————————————————————————
  {
    id: "titolo-e-paragrafo",
    chapter: 1,
    order: 2,
    title: "Titolo e paragrafo",
    consegna:
      "Scrivi un titolo <h1> e sotto un paragrafo <p> che ti presenti.",
    intro:
      "Un paragrafo è un blocco di testo. Si scrive con <p>testo</p>. Puoi mettere quanti paragrafi vuoi nella pagina.",
    targetHtml: `<h1>Chi sono</h1>
<p>Ciao! Mi chiamo Marco e sto imparando a costruire siti web.</p>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h1", "Contiene un <h1>"),
      hasTag("p", "Contiene un <p>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 1.3 — Tre livelli di titolo
  // ———————————————————————————————————————————————————————
  {
    id: "tre-titoli",
    chapter: 1,
    order: 3,
    title: "Tre livelli di titolo",
    consegna: "Scrivi un <h1>, poi un <h2> e infine un <h3>.",
    intro:
      "I titoli hanno sei livelli: da <h1> (il più grande e importante) a <h6> (il più piccolo). Si usano per dare gerarchia al testo.",
    targetHtml: `<h1>Il mio blog</h1>
<h2>Articolo di oggi</h2>
<h3>Capitolo 1</h3>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h1", "Contiene un <h1>"),
      hasTag("h2", "Contiene un <h2>"),
      hasTag("h3", "Contiene un <h3>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 1.4 — Primo link
  // ———————————————————————————————————————————————————————
  {
    id: "primo-link",
    chapter: 1,
    order: 4,
    title: "Il tuo primo link",
    consegna:
      "Scrivi un paragrafo che contiene un link <a> a un sito qualsiasi.",
    intro:
      "Un link si scrive con <a href=\"https://...\">testo</a>. L'attributo href dice al browser dove andare quando si clicca.",
    targetHtml: `<p>Il mio motore di ricerca preferito è <a href="https://www.google.com">Google</a>.</p>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("p", "Contiene un <p>"),
      hasTag("a", "Contiene un link <a>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 1.5 — Link a Wikipedia (rinforza il concetto)
  // ———————————————————————————————————————————————————————
  {
    id: "link-wikipedia",
    chapter: 1,
    order: 5,
    title: "Un link a Wikipedia",
    consegna:
      "Scrivi un titolo e un paragrafo con un link che porta a Wikipedia.",
    intro:
      "L'attributo href può contenere qualsiasi URL. Per Wikipedia in italiano: https://it.wikipedia.org",
    targetHtml: `<h2>Sapere</h2>
<p>Apri <a href="https://it.wikipedia.org">Wikipedia</a> per imparare qualcosa di nuovo.</p>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h2", "Contiene un <h2>"),
      hasTag("p", "Contiene un <p>"),
      hasTag("a", "Contiene un link <a>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 1.6 — Immagine
  // ———————————————————————————————————————————————————————
  {
    id: "prima-immagine",
    chapter: 1,
    order: 6,
    title: "La tua prima immagine",
    consegna:
      "Aggiungi un'immagine alla pagina. Usa un titolo per introdurla.",
    intro:
      "Il tag <img> è speciale: si chiude da solo, non ha tag di chiusura. Serve l'attributo src (l'URL dell'immagine) e alt (la descrizione testuale).",
    targetHtml: `<h2>La mia foto preferita</h2>
<img src="https://picsum.photos/seed/montagna/300/200" alt="Una montagna al tramonto">`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h2", "Contiene un <h2>"),
      hasTag("img", "Contiene un'immagine <img>"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 1.7 — Mini profilo (consolidamento)
  // ———————————————————————————————————————————————————————
  {
    id: "mini-profilo",
    chapter: 1,
    order: 7,
    title: "Un mini profilo",
    consegna:
      "Crea una pagina di presentazione: un titolo, un'immagine, un paragrafo e un link.",
    intro:
      "Metti insieme tutto quello che hai imparato: <h1>, <img>, <p>, <a>. Ogni tag va su una riga diversa per leggere meglio il codice.",
    targetHtml: `<h1>Ciao, sono Luca</h1>
<img src="https://picsum.photos/seed/avatar/200/200" alt="Il mio avatar">
<p>Studio informatica e nel tempo libero gioco a basket.</p>
<p>Seguimi su <a href="https://instagram.com">Instagram</a>.</p>`,
    targetCss: ``,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("h1", "Contiene un <h1>"),
      hasTag("img", "Contiene un'immagine <img>"),
      hasTag("p", "Contiene almeno un <p>"),
      hasTag("a", "Contiene un link <a>"),
    ],
  },
];
