// Capitolo 5 — Layout classici
// Lo studente combina HTML + CSS + Flexbox per ricreare pattern UI reali:
// card, hero, sidebar, griglie, profili, footer.
//
// Progressione: dalla singola card a layout compositi multi-sezione.
// Starter HTML e CSS sempre vuoti. Consegne esplicite.

import type { Exercise } from "@/types/explorer";
import {
  classHasChildren,
  cssRuleHasProperty,
  hasClass,
  hasCssRule,
  hasTag,
  nestedIn,
} from "../exerciseChecks";

const ANY = /.+/;

export const CH5_EXERCISES: Exercise[] = [
  // ———————————————————————————————————————————————————————
  // 5.1 — Card prodotto
  // ———————————————————————————————————————————————————————
  {
    id: "card-prodotto",
    chapter: 5,
    order: 1,
    title: "Card prodotto",
    consegna:
      'Scrivi un <article class="card"> che contiene <h3 class="titolo">, <p class="prezzo"> e <button class="btn">. Nel CSS stila .card con display: flex, flex-direction: column, gap, background, color, padding e border-radius.',
    intro:
      "Una card è un contenitore che raggruppa informazioni correlate. <article> è semanticamente adatto per contenuti indipendenti. Con display: flex + flex-direction: column metti i figli in colonna e con gap li distanzi.",
    targetHtml: `<article class="card">
  <h3 class="titolo">Prodotto top</h3>
  <p class="prezzo">€ 29,90</p>
  <button class="btn">Aggiungi</button>
</article>`,
    targetCss: `.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 240px;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 12px;
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
  color: black;
  border: none;
  padding: 8px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("article", "Contiene un <article>"),
      hasClass("card", 'L\'<article> ha class="card"'),
      nestedIn("h3", "article", "C'è un <h3> dentro l'article"),
      hasClass("titolo", 'L\'<h3> ha class="titolo"'),
      hasClass("prezzo", 'Esiste un elemento con class="prezzo"'),
      nestedIn("button", "article", "C'è un <button> dentro l'article"),
      hasClass("btn", 'Il <button> ha class="btn"'),
      hasCssRule(".card", "Esiste la regola .card"),
      cssRuleHasProperty(".card", "display", "flex", ".card ha display: flex"),
      cssRuleHasProperty(
        ".card",
        "flex-direction",
        "column",
        ".card ha flex-direction: column",
      ),
      cssRuleHasProperty(".card", "background", ANY, ".card ha un background"),
      cssRuleHasProperty(".card", "padding", ANY, ".card ha un padding"),
      cssRuleHasProperty(".card", "border-radius", ANY, ".card ha un border-radius"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.2 — Hero section
  // ———————————————————————————————————————————————————————
  {
    id: "hero-section",
    chapter: 5,
    order: 2,
    title: "Hero section",
    consegna:
      'Crea una <section class="hero"> con dentro un <h1>, un <p> e un <button>. Nel CSS stila .hero con display: flex, flex-direction: column, align-items: center, gap, padding abbondante (40px+), background e color. Aggiungi anche text-align: center.',
    intro:
      "La hero è la sezione più in alto di un sito: grande, centrata, con un messaggio forte e un pulsante chiamato 'call to action' (CTA). Usa flex in colonna e align-items: center per centrare orizzontalmente tutti i figli.",
    targetHtml: `<section class="hero">
  <h1>Benvenuto sul mio sito!</h1>
  <p>Scopri le cose fantastiche che ho da mostrarti.</p>
  <button>Inizia ora</button>
</section>`,
    targetCss: `.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 20px;
  background: #1c1c38;
  color: white;
  text-align: center;
  border-radius: 12px;
  font-family: sans-serif;
}
.hero h1 {
  margin: 0;
  font-size: 36px;
}
.hero p {
  margin: 0;
  font-size: 18px;
  color: #aaa;
}
.hero button {
  background: #34d399;
  color: black;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("section", "Contiene un <section>"),
      hasClass("hero", 'Il <section> ha class="hero"'),
      nestedIn("h1", "section", "C'è un <h1> dentro la section"),
      nestedIn("p", "section", "C'è un <p> dentro la section"),
      nestedIn("button", "section", "C'è un <button> dentro la section"),
      hasCssRule(".hero", "Esiste la regola .hero"),
      cssRuleHasProperty(".hero", "display", "flex", ".hero ha display: flex"),
      cssRuleHasProperty(
        ".hero",
        "flex-direction",
        "column",
        ".hero ha flex-direction: column",
      ),
      cssRuleHasProperty(
        ".hero",
        "align-items",
        "center",
        ".hero ha align-items: center",
      ),
      cssRuleHasProperty(".hero", "padding", ANY, ".hero ha un padding"),
      cssRuleHasProperty(".hero", "background", ANY, ".hero ha un background"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.3 — Due colonne: sidebar + contenuto
  // ———————————————————————————————————————————————————————
  {
    id: "sidebar-contenuto",
    chapter: 5,
    order: 3,
    title: "Sidebar + contenuto",
    consegna:
      'Crea un <div class="layout"> con dentro <aside class="sidebar"> (con un <h3> e 3 <a> uno sotto l\'altro) e <main class="contenuto"> (con un <h2> e un <p>). Nel CSS stila .layout con display: flex e gap; .sidebar con width fissa (es. 180px), background, padding; .contenuto con flex: 1, background, padding.',
    intro:
      "Un classico layout da blog/dashboard: barra laterale stretta con navigazione, contenuto principale largo. La sidebar ha width fissa; il contenuto usa flex: 1 per prendere tutto il resto dello spazio disponibile.",
    targetHtml: `<div class="layout">
  <aside class="sidebar">
    <h3>Menu</h3>
    <a href="#">Home</a>
    <a href="#">Articoli</a>
    <a href="#">Contatti</a>
  </aside>
  <main class="contenuto">
    <h2>Benvenuto</h2>
    <p>Questo è il contenuto principale della pagina. Qui di solito va il testo dell'articolo, le informazioni del prodotto, o qualsiasi altra cosa sia centrale per la pagina.</p>
  </main>
</div>`,
    targetCss: `.layout {
  display: flex;
  gap: 12px;
  font-family: sans-serif;
}
.sidebar {
  width: 180px;
  background: #282850;
  color: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sidebar h3 {
  margin: 0 0 8px 0;
  color: #4ecdc4;
}
.sidebar a {
  color: #aaa;
  text-decoration: none;
}
.contenuto {
  flex: 1;
  background: #1c1c38;
  color: #e8e8f0;
  padding: 18px;
  border-radius: 8px;
}
.contenuto h2 {
  margin: 0 0 10px 0;
  color: #34d399;
}
.contenuto p {
  margin: 0;
  line-height: 1.6;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("layout", "Esiste .layout"),
      hasTag("aside", "Contiene un <aside>"),
      hasClass("sidebar", 'L\'<aside> ha class="sidebar"'),
      hasTag("main", "Contiene un <main>"),
      hasClass("contenuto", 'Il <main> ha class="contenuto"'),
      hasCssRule(".layout", "Esiste la regola .layout"),
      cssRuleHasProperty(".layout", "display", "flex", ".layout ha display: flex"),
      hasCssRule(".sidebar", "Esiste la regola .sidebar"),
      cssRuleHasProperty(".sidebar", "width", ANY, ".sidebar ha una width"),
      hasCssRule(".contenuto", "Esiste la regola .contenuto"),
      cssRuleHasProperty(".contenuto", "flex", ANY, ".contenuto ha flex impostato"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.4 — Griglia di 3 card
  // ———————————————————————————————————————————————————————
  {
    id: "griglia-card",
    chapter: 5,
    order: 4,
    title: "Griglia di 3 card",
    consegna:
      'Crea un <div class="griglia"> con 3 <article class="card"> dentro. Ogni card ha <h3> e <p>. Nel CSS: .griglia con display: flex, gap; .card con flex: 1, background, padding, border-radius.',
    intro:
      "Un pattern ricorrente è la griglia di card affiancate. display: flex + gap sul contenitore, flex: 1 sulle card per farle occupare uguale spazio e adattarsi alla larghezza disponibile.",
    targetHtml: `<div class="griglia">
  <article class="card">
    <h3>Card uno</h3>
    <p>Un breve testo descrittivo.</p>
  </article>
  <article class="card">
    <h3>Card due</h3>
    <p>Un altro breve testo descrittivo.</p>
  </article>
  <article class="card">
    <h3>Card tre</h3>
    <p>E una terza breve descrizione.</p>
  </article>
</div>`,
    targetCss: `.griglia {
  display: flex;
  gap: 14px;
  font-family: sans-serif;
}
.card {
  flex: 1;
  background: #282850;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.card h3 {
  margin: 0 0 8px 0;
  color: #34d399;
}
.card p {
  margin: 0;
  line-height: 1.5;
  color: #aaa;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("griglia", "Esiste .griglia"),
      classHasChildren("griglia", 3, "article", ".griglia contiene 3 <article>"),
      hasClass("card", 'Gli article hanno class="card"'),
      hasCssRule(".griglia", "Esiste la regola .griglia"),
      cssRuleHasProperty(".griglia", "display", "flex", ".griglia ha display: flex"),
      cssRuleHasProperty(".griglia", "gap", ANY, ".griglia ha un gap"),
      hasCssRule(".card", "Esiste la regola .card"),
      cssRuleHasProperty(".card", "flex", ANY, ".card ha flex impostato"),
      cssRuleHasProperty(".card", "background", ANY, ".card ha un background"),
      cssRuleHasProperty(".card", "padding", ANY, ".card ha un padding"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.5 — Profilo utente (img + info in riga)
  // ———————————————————————————————————————————————————————
  {
    id: "profilo-utente",
    chapter: 5,
    order: 5,
    title: "Profilo utente",
    consegna:
      'Crea un <div class="profilo"> con <img class="avatar"> e un <div class="info"> che contiene <h3> e <p>. Nel CSS: .profilo con display: flex, align-items: center, gap, background, padding, border-radius; .avatar con width/height fissi (es. 80px) e border-radius: 50% (per farla tonda); .info con flex: 1.',
    intro:
      "Un altro pattern comune: immagine a sinistra, testo a destra, allineati verticalmente. align-items: center sul flex container allinea verticalmente al centro; border-radius: 50% rende un'immagine quadrata un cerchio perfetto.",
    targetHtml: `<div class="profilo">
  <img class="avatar" src="https://picsum.photos/seed/user/80/80" alt="Avatar">
  <div class="info">
    <h3>Mario Rossi</h3>
    <p>Studente di informatica, classe 3A</p>
  </div>
</div>`,
    targetCss: `.profilo {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #1c1c38;
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: sans-serif;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info {
  flex: 1;
}
.info h3 {
  margin: 0 0 4px 0;
  color: #34d399;
}
.info p {
  margin: 0;
  color: #aaa;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("profilo", "Esiste .profilo"),
      hasTag("img", "Contiene un'immagine <img>"),
      hasClass("avatar", 'L\'immagine ha class="avatar"'),
      hasClass("info", "Esiste .info"),
      nestedIn("h3", "div", "C'è un <h3> dentro un <div>"),
      nestedIn("p", "div", "C'è un <p> dentro un <div>"),
      hasCssRule(".profilo", "Esiste la regola .profilo"),
      cssRuleHasProperty(".profilo", "display", "flex", ".profilo ha display: flex"),
      cssRuleHasProperty(
        ".profilo",
        "align-items",
        "center",
        ".profilo ha align-items: center",
      ),
      cssRuleHasProperty(".profilo", "gap", ANY, ".profilo ha un gap"),
      hasCssRule(".avatar", "Esiste la regola .avatar"),
      cssRuleHasProperty(".avatar", "width", ANY, ".avatar ha una width"),
      cssRuleHasProperty(
        ".avatar",
        "border-radius",
        ANY,
        ".avatar ha un border-radius",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.6 — Footer con colonne
  // ———————————————————————————————————————————————————————
  {
    id: "footer-sito",
    chapter: 5,
    order: 6,
    title: "Footer del sito",
    consegna:
      'Crea un <footer class="pieno"> con 3 <div class="colonna"> dentro. Ogni colonna contiene un <h4> e 3 <a> (in verticale). Nel CSS: .pieno con display: flex, gap, background, padding, color; .colonna con flex: 1, display: flex, flex-direction: column, gap.',
    intro:
      "Un footer tipico ha più colonne di link (categorie, social, informazioni). È un consolidamento: flex annidati (flex container che contiene flex container), gap per distanziare, flex: 1 per larghezze uguali.",
    targetHtml: `<footer class="pieno">
  <div class="colonna">
    <h4>Prodotti</h4>
    <a href="#">Novità</a>
    <a href="#">Più venduti</a>
    <a href="#">Sconti</a>
  </div>
  <div class="colonna">
    <h4>Azienda</h4>
    <a href="#">Chi siamo</a>
    <a href="#">Lavora con noi</a>
    <a href="#">Contatti</a>
  </div>
  <div class="colonna">
    <h4>Supporto</h4>
    <a href="#">FAQ</a>
    <a href="#">Spedizioni</a>
    <a href="#">Resi</a>
  </div>
</footer>`,
    targetCss: `.pieno {
  display: flex;
  gap: 30px;
  background: #0c0c18;
  color: #e8e8f0;
  padding: 30px 20px;
  border-radius: 8px;
  font-family: sans-serif;
}
.colonna {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.colonna h4 {
  margin: 0 0 8px 0;
  color: #34d399;
  font-size: 14px;
  text-transform: uppercase;
}
.colonna a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasTag("footer", "Contiene un <footer>"),
      hasClass("pieno", 'Il <footer> ha class="pieno"'),
      classHasChildren("pieno", 3, "div", ".pieno contiene 3 <div>"),
      hasClass("colonna", 'I figli hanno class="colonna"'),
      hasCssRule(".pieno", "Esiste la regola .pieno"),
      cssRuleHasProperty(".pieno", "display", "flex", ".pieno ha display: flex"),
      cssRuleHasProperty(".pieno", "gap", ANY, ".pieno ha un gap"),
      cssRuleHasProperty(".pieno", "padding", ANY, ".pieno ha un padding"),
      hasCssRule(".colonna", "Esiste la regola .colonna"),
      cssRuleHasProperty(".colonna", "flex", ANY, ".colonna ha flex impostato"),
      cssRuleHasProperty(".colonna", "display", "flex", ".colonna ha display: flex"),
      cssRuleHasProperty(
        ".colonna",
        "flex-direction",
        "column",
        ".colonna ha flex-direction: column",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.7 — Navbar + Hero (prima pagina multi-sezione)
  // ———————————————————————————————————————————————————————
  {
    id: "navbar-hero",
    chapter: 5,
    order: 7,
    title: "Navbar + Hero",
    consegna:
      'Crea un <div class="pagina"> che contiene una <nav class="navbar"> (con un .logo e 3 <a>) e sotto una <section class="hero"> (con un <h1>, un <p>, un <button>). Nel CSS: .pagina con display: flex e flex-direction: column (e gap se vuoi); .navbar con display: flex e justify-content: space-between; .hero con display: flex, flex-direction: column, align-items: center e padding abbondante.',
    intro:
      "Una 'pagina' è spesso una pila verticale di sezioni: header, hero, contenuto, footer. flex-direction: column sul contenitore esterno mette le sezioni una sotto l'altra. Ogni sezione poi può avere il suo flex interno.",
    targetHtml: `<div class="pagina">
  <nav class="navbar">
    <div class="logo">MioSito</div>
    <a href="#">Home</a>
    <a href="#">Servizi</a>
    <a href="#">Contatti</a>
  </nav>
  <section class="hero">
    <h1>Il futuro parte da qui</h1>
    <p>Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.</p>
    <button>Inizia subito</button>
  </section>
</div>`,
    targetCss: `.pagina {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: #1a1a2e;
  color: white;
  border-radius: 8px;
}
.navbar .logo {
  font-weight: 900;
  font-size: 18px;
}
.navbar a {
  color: #aaa;
  text-decoration: none;
  margin-left: 14px;
}
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 20px;
  background: #1c1c38;
  color: white;
  text-align: center;
  border-radius: 12px;
}
.hero h1 {
  margin: 0;
  font-size: 32px;
}
.hero p {
  margin: 0;
  color: #aaa;
}
.hero button {
  background: #34d399;
  color: black;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("pagina", "Esiste .pagina"),
      hasTag("nav", "Contiene un <nav>"),
      hasClass("navbar", 'Il <nav> ha class="navbar"'),
      hasTag("section", "Contiene un <section>"),
      hasClass("hero", 'Il <section> ha class="hero"'),
      nestedIn("h1", "section", "C'è un <h1> nella hero"),
      nestedIn("button", "section", "C'è un <button> nella hero"),
      hasCssRule(".pagina", "Esiste la regola .pagina"),
      cssRuleHasProperty(".pagina", "display", "flex", ".pagina ha display: flex"),
      cssRuleHasProperty(
        ".pagina",
        "flex-direction",
        "column",
        ".pagina ha flex-direction: column",
      ),
      hasCssRule(".navbar", "Esiste la regola .navbar"),
      cssRuleHasProperty(".navbar", "display", "flex", ".navbar ha display: flex"),
      cssRuleHasProperty(
        ".navbar",
        "justify-content",
        "space-between",
        ".navbar ha justify-content: space-between",
      ),
      hasCssRule(".hero", "Esiste la regola .hero"),
      cssRuleHasProperty(".hero", "display", "flex", ".hero ha display: flex"),
      cssRuleHasProperty(
        ".hero",
        "flex-direction",
        "column",
        ".hero ha flex-direction: column",
      ),
      cssRuleHasProperty(
        ".hero",
        "align-items",
        "center",
        ".hero ha align-items: center",
      ),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.8 — Pricing table (3 piani, centrale evidenziato)
  // ———————————————————————————————————————————————————————
  {
    id: "pricing-table",
    chapter: 5,
    order: 8,
    title: "Tabella prezzi",
    consegna:
      'Crea un <div class="prezzi"> con 3 <article class="piano"> (nome, prezzo, bottone). Al piano centrale aggiungi ANCHE la classe "evidenza" (due classi: class="piano evidenza"). Nel CSS: .prezzi con display: flex, gap; .piano con flex: 1, display: flex, flex-direction: column, gap, padding, background, border-radius; .evidenza con un background diverso (più chiaro) e bordo colorato per farlo spiccare.',
    intro:
      "Un elemento può avere PIÙ classi separate da spazio: class=\"piano evidenza\". Entrambe le regole CSS (.piano e .evidenza) si applicano. La seconda può sovrascrivere proprietà della prima: così distingui il piano 'consigliato' dagli altri.",
    targetHtml: `<div class="prezzi">
  <article class="piano">
    <h3>Base</h3>
    <p class="prezzo">€ 9</p>
    <button>Scegli</button>
  </article>
  <article class="piano evidenza">
    <h3>Pro</h3>
    <p class="prezzo">€ 19</p>
    <button>Scegli</button>
  </article>
  <article class="piano">
    <h3>Premium</h3>
    <p class="prezzo">€ 39</p>
    <button>Scegli</button>
  </article>
</div>`,
    targetCss: `.prezzi {
  display: flex;
  gap: 14px;
  font-family: sans-serif;
}
.piano {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: #1c1c38;
  color: white;
  border-radius: 10px;
  text-align: center;
}
.piano h3 {
  margin: 0;
  color: #4ecdc4;
}
.piano .prezzo {
  margin: 0;
  font-size: 32px;
  font-weight: 900;
}
.piano button {
  background: #4ecdc4;
  color: black;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
.evidenza {
  background: #282850;
  border: 3px solid #34d399;
}
.evidenza button {
  background: #34d399;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("prezzi", "Esiste .prezzi"),
      classHasChildren("prezzi", 3, "article", ".prezzi contiene 3 <article>"),
      hasClass("piano", 'Gli article hanno class="piano"'),
      hasClass("evidenza", 'Un piano ha anche class="evidenza"'),
      hasCssRule(".prezzi", "Esiste la regola .prezzi"),
      cssRuleHasProperty(".prezzi", "display", "flex", ".prezzi ha display: flex"),
      cssRuleHasProperty(".prezzi", "gap", ANY, ".prezzi ha un gap"),
      hasCssRule(".piano", "Esiste la regola .piano"),
      cssRuleHasProperty(".piano", "flex", ANY, ".piano ha flex impostato"),
      cssRuleHasProperty(
        ".piano",
        "flex-direction",
        "column",
        ".piano ha flex-direction: column",
      ),
      hasCssRule(".evidenza", "Esiste la regola .evidenza"),
      cssRuleHasProperty(".evidenza", "background", ANY, ".evidenza ha un background"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.9 — Dashboard: header + sidebar + main
  // ———————————————————————————————————————————————————————
  {
    id: "dashboard-layout",
    chapter: 5,
    order: 9,
    title: "Dashboard: header + sidebar + main",
    consegna:
      'Crea un <div class="app"> con: un <header class="topbar"> (con un <h2> e 2 <a>), e sotto un <div class="corpo"> che contiene <aside class="sidebar"> (con 4 <a>) e <main class="area"> (con un <h2> e un <p>). Nel CSS: .app con display: flex e flex-direction: column; .topbar con display: flex e justify-content: space-between; .corpo con display: flex; .sidebar con width fissa (es. 160px); .area con flex: 1.',
    intro:
      "Una dashboard classica ha tre zone: topbar che spanna tutto in alto, sidebar stretta a sinistra, area principale larga a destra. Il trucco è flex annidato: .app è una colonna, .corpo dentro è una riga.",
    targetHtml: `<div class="app">
  <header class="topbar">
    <h2>Dashboard</h2>
    <a href="#">Account</a>
  </header>
  <div class="corpo">
    <aside class="sidebar">
      <a href="#">Home</a>
      <a href="#">Ordini</a>
      <a href="#">Clienti</a>
      <a href="#">Report</a>
    </aside>
    <main class="area">
      <h2>Panoramica</h2>
      <p>Qui trovi i dati più importanti del tuo account.</p>
    </main>
  </div>
</div>`,
    targetCss: `.app {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: sans-serif;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #0c0c18;
  color: white;
  border-radius: 8px;
}
.topbar h2 {
  margin: 0;
  color: #34d399;
}
.topbar a {
  color: #aaa;
  text-decoration: none;
}
.corpo {
  display: flex;
  gap: 10px;
}
.sidebar {
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #282850;
  border-radius: 8px;
}
.sidebar a {
  color: #aaa;
  text-decoration: none;
}
.area {
  flex: 1;
  padding: 20px;
  background: #1c1c38;
  color: #e8e8f0;
  border-radius: 8px;
}
.area h2 {
  margin: 0 0 10px 0;
  color: #4ecdc4;
}
.area p {
  margin: 0;
  line-height: 1.6;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("app", "Esiste .app"),
      hasTag("header", "Contiene un <header>"),
      hasClass("topbar", 'Il <header> ha class="topbar"'),
      hasClass("corpo", "Esiste .corpo"),
      hasTag("aside", "Contiene un <aside>"),
      hasClass("sidebar", 'L\'<aside> ha class="sidebar"'),
      hasTag("main", "Contiene un <main>"),
      hasClass("area", 'Il <main> ha class="area"'),
      hasCssRule(".app", "Esiste la regola .app"),
      cssRuleHasProperty(".app", "display", "flex", ".app ha display: flex"),
      cssRuleHasProperty(
        ".app",
        "flex-direction",
        "column",
        ".app ha flex-direction: column",
      ),
      hasCssRule(".corpo", "Esiste la regola .corpo"),
      cssRuleHasProperty(".corpo", "display", "flex", ".corpo ha display: flex"),
      hasCssRule(".sidebar", "Esiste la regola .sidebar"),
      cssRuleHasProperty(".sidebar", "width", ANY, ".sidebar ha una width"),
      hasCssRule(".area", "Esiste la regola .area"),
      cssRuleHasProperty(".area", "flex", ANY, ".area ha flex impostato"),
    ],
  },

  // ———————————————————————————————————————————————————————
  // 5.10 — Pagina completa (consolidamento finale)
  // ———————————————————————————————————————————————————————
  {
    id: "pagina-completa",
    chapter: 5,
    order: 10,
    title: "Una pagina completa",
    consegna:
      'Crea un <div class="pagina"> con 4 sezioni impilate: <nav class="navbar"> (logo + 3 link), <section class="hero"> (h1 + p + button), <section class="griglia"> (3 <article class="card"> con h3+p), e <footer class="pie"> (testo di copyright). Nel CSS stila TUTTO: .pagina con flex-direction: column; .navbar flex justify-content space-between; .hero flex column align-items center; .griglia flex con gap; .card flex:1; .pie padding con testo centrato.',
    intro:
      "Questo è il consolidamento finale del capitolo. Metti insieme tutto: layout verticale della pagina, navbar con flex, hero centrata, griglia di card affiancate con flex:1, footer in fondo. È una pagina web vera.",
    targetHtml: `<div class="pagina">
  <nav class="navbar">
    <div class="logo">MioSito</div>
    <a href="#">Home</a>
    <a href="#">Prodotti</a>
    <a href="#">Contatti</a>
  </nav>
  <section class="hero">
    <h1>Benvenuto</h1>
    <p>La tua nuova esperienza digitale inizia qui.</p>
    <button>Scopri di più</button>
  </section>
  <section class="griglia">
    <article class="card">
      <h3>Veloce</h3>
      <p>Le pagine si caricano in un battito di ciglia.</p>
    </article>
    <article class="card">
      <h3>Sicuro</h3>
      <p>I tuoi dati sono al sicuro con noi.</p>
    </article>
    <article class="card">
      <h3>Affidabile</h3>
      <p>Il servizio è disponibile sempre, tutto l'anno.</p>
    </article>
  </section>
  <footer class="pie">
    <p>© 2026 MioSito. Tutti i diritti riservati.</p>
  </footer>
</div>`,
    targetCss: `.pagina {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: #1a1a2e;
  color: white;
  border-radius: 8px;
}
.navbar .logo {
  font-weight: 900;
}
.navbar a {
  color: #aaa;
  text-decoration: none;
  margin-left: 14px;
}
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 50px 20px;
  background: #1c1c38;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.hero h1 {
  margin: 0;
  font-size: 32px;
}
.hero p {
  margin: 0;
  color: #aaa;
}
.hero button {
  background: #34d399;
  color: black;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.griglia {
  display: flex;
  gap: 12px;
}
.card {
  flex: 1;
  padding: 20px;
  background: #282850;
  color: white;
  border-radius: 10px;
}
.card h3 {
  margin: 0 0 8px 0;
  color: #4ecdc4;
}
.card p {
  margin: 0;
  color: #aaa;
  line-height: 1.5;
}
.pie {
  padding: 16px;
  text-align: center;
  background: #0c0c18;
  color: #aaa;
  border-radius: 8px;
}
.pie p {
  margin: 0;
  font-size: 13px;
}`,
    starterHtml: ``,
    starterCss: ``,
    checks: [
      hasClass("pagina", "Esiste .pagina"),
      hasTag("nav", "Contiene un <nav>"),
      hasTag("section", "Contiene almeno una <section>"),
      hasClass("hero", "Esiste .hero"),
      hasClass("griglia", "Esiste .griglia"),
      hasTag("article", "Contiene almeno un <article>"),
      classHasChildren("griglia", 3, "article", ".griglia contiene 3 <article>"),
      hasClass("card", 'Gli article hanno class="card"'),
      hasTag("footer", "Contiene un <footer>"),
      hasClass("pie", 'Il <footer> ha class="pie"'),
      hasCssRule(".pagina", "Esiste la regola .pagina"),
      cssRuleHasProperty(
        ".pagina",
        "flex-direction",
        "column",
        ".pagina ha flex-direction: column",
      ),
      hasCssRule(".navbar", "Esiste la regola .navbar"),
      cssRuleHasProperty(".navbar", "display", "flex", ".navbar ha display: flex"),
      cssRuleHasProperty(
        ".navbar",
        "justify-content",
        "space-between",
        ".navbar ha justify-content: space-between",
      ),
      hasCssRule(".hero", "Esiste la regola .hero"),
      cssRuleHasProperty(
        ".hero",
        "align-items",
        "center",
        ".hero ha align-items: center",
      ),
      hasCssRule(".griglia", "Esiste la regola .griglia"),
      cssRuleHasProperty(".griglia", "display", "flex", ".griglia ha display: flex"),
      hasCssRule(".card", "Esiste la regola .card"),
      cssRuleHasProperty(".card", "flex", ANY, ".card ha flex impostato"),
    ],
  },
];
