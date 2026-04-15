# DIV Explorer — Brief per sviluppo Next.js

## Panoramica progetto

**Obiettivo**: Creare uno strumento didattico interattivo per insegnare a studenti di 16 anni (livello base) come funzionano i `<div>` in HTML — concetti di raggruppamento, nesting, relazioni genitore/figlio/fratello.

**Metafora chiave**: I div sono INVISIBILI nel browser. Lo strumento li rende visibili "come una radiografia" al passaggio del mouse.

**Target**: Studenti 16 anni, livello base. Serve qualcosa di molto visivo, poco testo, colori forti, collegato al loro mondo (navbar di un sito web).

---

## Funzionalità della versione attuale (HTML statico funzionante)

### Layout 3 colonne (ottimizzato per schermi 16:9)

1. **Colonna 1 — Preview + Albero** (flex 1.5): browser finto con navbar interattiva + albero SVG infografico della gerarchia
2. **Colonna 2 — Codice HTML** (flex 1): codice con syntax highlighting statico (span colorati)
3. **Colonna 3 — Codice CSS** (flex 1): codice CSS con syntax highlighting statico

Tutte le colonne sono **riducibili** cliccando sull'header (collassano a 28px con titolo verticale).

### Interazione principale: Hover sincronizzato

Quando l'utente passa il mouse su UN qualsiasi elemento (nella navbar, nel codice HTML, nel codice CSS, o nell'albero SVG), si illuminano TUTTI i pannelli contemporaneamente:

- **Navbar**: il div hoverato mostra bordo colorato + etichetta (es. `div.menu`), e anche tutti i div genitori nella catena si illuminano con bordi
- **Codice HTML**: le righe corrispondenti si evidenziano con bordo sinistro colorato + sfondo tenue
- **Codice CSS**: le regole CSS corrispondenti si evidenziano allo stesso modo
- **Albero SVG**: il nodo corrispondente si illumina con glow
- **Tooltip fisso in basso**: mostra ruolo (GENITORE / FIGLIO / GENITORE+FIGLIO) + descrizione testuale della relazione

L'hover funziona in TUTTE le direzioni: navbar→codice, codice→navbar, albero→tutto.

### Modalità Raggi X

Un bottone "💀 Raggi X" che mostra TUTTI i div contemporaneamente con bordi colorati ed etichette — utile per il momento "aha!" in classe.

### Struttura dati della navbar esempio

```
navbar (GENITORE di tutto)
├── logo (FIGLIO di navbar, FRATELLO di menu e azioni)
├── menu (FIGLIO di navbar, GENITORE dei link, FRATELLO di logo e azioni)
│   ├── <a> Home (FIGLIO di menu, FRATELLO)
│   ├── <a> Chi siamo (FIGLIO di menu, FRATELLO)
│   └── <a> Contatti (FIGLIO di menu, FRATELLO)
└── azioni (FIGLIO di navbar, GENITORE dei bottoni, FRATELLO di logo e menu)
    ├── <button> Login (FIGLIO di azioni, FRATELLO)
    └── <button> Registrati (FIGLIO di azioni, FRATELLO)
```

### Catena dei genitori (per hover)

Quando si hovera un figlio, devono illuminarsi anche tutti i genitori:
- `link1/link2/link3` → illumina anche `menu` e `nav`
- `btn1/btn2` → illumina anche `actions` e `nav`
- `logo/menu/actions` → illumina anche `nav`
- `nav` → solo `nav`

### Mapping CSS condiviso

Alcuni elementi condividono le stesse regole CSS:
- `link2` e `link3` usano lo stesso CSS di `link1` (`.menu a`)
- `btn2` usa lo stesso CSS di `btn1` (`button`)

---

## Design e palette colori

### Tema dark

```
Background:    #0c0c18
Surface:       #161628
Surface2:      #1c1c38
Surface3:      #282850
Text:          #e8e8f0
Muted:         #7777aa
Border:        #252548
```

### Colori per elemento (ogni div ha il suo colore unico)

```
navbar:     #ff6b6b (rosso)
logo:       #fbbf24 (giallo)
menu:       #4ecdc4 (teal)
link Home:  #a78bfa (viola chiaro)
link Chi:   #818cf8 (indaco)
link Cont:  #c084fc (viola)
azioni:     #f472b6 (rosa)
btn Login:  #fb923c (arancione)
btn Reg:    #34d399 (verde)
```

### Syntax highlighting

HTML:
- Tag: rosso (#ff6b6b)
- Attributi: viola (#a78bfa)
- Valori: giallo (#fbbf24)
- Testo: muted (#7777aa)

CSS:
- Selettori: rosa (#f472b6)
- Proprietà: teal (#4ecdc4)
- Valori: verde (#34d399)
- Punteggiatura: grigio (#555)

### Font

- Titoli e UI: `Nunito` (700, 900)
- Codice e monospace: `Space Mono` (400, 700)

---

## Requisiti per la versione Next.js

### Stack suggerito

- **Next.js 14+ (App Router)**
- **React** con componenti client (`'use client'`)
- **Tailwind CSS** per lo styling (con CSS custom properties per i colori degli elementi)
- **Framer Motion** (opzionale) per animazioni fluide

### Architettura componenti suggerita

```
app/
  page.tsx                    # Layout principale 3 colonne
  components/
    TopBar.tsx                # Barra superiore con titolo e bottoni modalità
    BottomBar.tsx             # Barra concetti chiave
    InfoTooltip.tsx           # Tooltip fisso in basso
    panels/
      PreviewPanel.tsx        # Colonna 1: browser + albero
      HtmlCodePanel.tsx       # Colonna 2: codice HTML colorato
      CssCodePanel.tsx        # Colonna 3: codice CSS colorato
      CollapsiblePanel.tsx    # Wrapper riducibile per ogni colonna
    preview/
      BrowserFrame.tsx        # Cornice browser finta
      InteractiveNavbar.tsx   # La navbar con hover
      NavbarElement.tsx       # Singolo elemento hoverable
    tree/
      HierarchyTree.tsx       # Albero SVG della gerarchia
      TreeNode.tsx            # Singolo nodo dell'albero
    code/
      CodeBlock.tsx           # Blocco codice con syntax highlighting
      CodeLine.tsx            # Singola riga evidenziabile
  hooks/
    useHighlight.ts           # Stato globale: quale elemento è hoverato
  lib/
    navbarData.ts             # Dati strutturati della navbar
    colors.ts                 # Palette colori
```

### Stato globale dell'highlight

Il cuore dell'app è uno stato condiviso che dice "quale elemento è attualmente hoverato". Suggerisco un Context React:

```typescript
// Concetto
interface HighlightState {
  activeElement: string | null;  // 'nav', 'logo', 'menu', 'link1', etc.
  mode: 'hover' | 'xray';
}

// Quando activeElement cambia, TUTTI i pannelli reagiscono:
// - Navbar: mostra bordi su activeElement + genitori
// - HTML code: evidenzia righe con data-group === activeElement
// - CSS code: evidenzia righe con data-group === activeElement (+ mapping condiviso)
// - Tree: illumina nodo corrispondente
// - Tooltip: mostra info dell'elemento
```

### Dati strutturati

```typescript
interface NavElement {
  id: string;            // 'nav', 'logo', 'menu', 'link1', etc.
  label: string;         // 'div.navbar', 'div.logo', etc.
  color: string;         // '#ff6b6b'
  role: string;          // 'GENITORE', 'FIGLIO', 'GENITORE + FIGLIO'
  description: string;   // Testo italiano per il tooltip
  parents: string[];     // ['menu', 'nav'] — catena genitori
  cssMapping?: string;   // Se condivide CSS con un altro (es. link2 → link1)
}
```

---

## Funzionalità FUTURE (fase 2) — Editor live

Nella conversazione abbiamo provato ad aggiungere un editor live per modificare HTML e CSS, ma l'implementazione in HTML statico era troppo fragile. Con Next.js si può fare meglio:

### Approccio suggerito per l'editor

1. Usare **Monaco Editor** (lo stesso di VS Code) o **CodeMirror 6** per i pannelli codice — supportano syntax highlighting nativo, editing, e line highlighting via API
2. Usare un **iframe con srcdoc** per il preview live — in Next.js funziona senza i problemi dell'ambiente Claude
3. Il tree SVG può essere **generato dinamicamente** dal DOM parsato dell'HTML utente
4. L'hover nel preview iframe comunica col parent via `postMessage`

### Flusso dell'editor

```
Utente modifica HTML/CSS → debounce 500ms → aggiorna srcdoc iframe → ri-parsa DOM per albero
```

---

## File di riferimento

Il file `div-explorer.html` incluso in questo progetto è la versione HTML statica **funzionante e testata** che va usata come riferimento visivo e comportamentale. Aprilo in un browser per vedere esattamente come deve funzionare la versione Next.js.

### Punti critici emersi durante lo sviluppo

1. **I div DEVONO essere invisibili di default** — nessun bordo, nessun colore. Appaiono SOLO al passaggio del mouse. Questo è il concetto didattico fondamentale.

2. **La catena dei genitori è essenziale** — quando hoveri un figlio, DEVONO illuminarsi anche tutti i genitori nella catena fino alla radice. Senza questo, gli studenti non capiscono il nesting.

3. **L'albero deve essere grande e leggibile** — nodi almeno 110×36px, font almeno 10-13px, viewBox ampio (740×340). Include indicatori "← fratelli →" con linee tratteggiate e label "Livello 0/1/2".

4. **Syntax highlighting con colori distinti** — i colori del codice devono rispettare le convenzioni (tag rossi, attributi viola, valori giallo per HTML; selettori rosa, proprietà teal, valori verde per CSS).

5. **Tutto in italiano** — interfaccia, tooltip, commenti nel codice, label dell'albero.

6. **Layout 16:9** — progettato per proiezione in classe su schermo grande. Le 3 colonne devono essere visibili contemporaneamente senza scroll orizzontale.

7. **Touch support** — deve funzionare anche su tablet (touch invece di hover).

---

## Come iniziare

```bash
npx create-next-app@latest div-explorer --typescript --tailwind --app
cd div-explorer
# Copiare div-explorer.html nella cartella public/ come riferimento
# Iniziare dall'architettura componenti sopra descritta
# Implementare prima la versione statica (fase 1), poi l'editor (fase 2)
```

Priorità di implementazione:
1. Layout 3 colonne riducibili
2. Navbar interattiva con hover → div visibili
3. Stato globale highlight + sincronizzazione pannelli
4. Codice HTML/CSS con syntax highlighting e line highlighting
5. Albero SVG con nodi interattivi
6. Modalità Raggi X
7. Tooltip informativo
8. Responsive / touch
9. (Fase 2) Editor live con Monaco/CodeMirror + iframe preview
