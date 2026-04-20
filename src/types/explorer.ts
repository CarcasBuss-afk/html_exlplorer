// Tipi condivisi per il DIV Explorer

export interface HtmlNode {
  id: string;
  tagName: string; // es. "div", "button", "a", "nav", "ul"
  classes: string[];
  idAttr: string | null;
  lineStart: number;
  lineEnd: number;
  parentId: string | null;
  childIds: string[];
  depth: number;
  color: string;
  // Etichetta leggibile (es. "div.navbar" o "button#login" o "a")
  label: string;
  // True se è un void element (img, input, br, hr, ecc.) — nessun figlio
  isVoid: boolean;
}

// Alias di retrocompatibilità
export type DivNode = HtmlNode;

export interface CssRule {
  id: string;
  selector: string;
  lineStart: number;
  lineEnd: number;
}

export interface ParsedHtml {
  // Mappa id→nodo (inserzione ordinata per ordine di apparizione)
  // Nome "divs" mantenuto per continuità con il naming iniziale, ma contiene
  // tutti gli elementi HTML, non solo i div.
  divs: Map<string, HtmlNode>;
  // ID degli elementi di primo livello
  rootIds: string[];
  // HTML con data-explorer-id iniettato, pronto per l'iframe
  injectedHtml: string;
  // HTML originale scritto dall'utente
  source: string;
}

export type HighlightMode = "hover" | "xray";

export interface ExplorerMessage {
  source: "explorer" | "explorer-host";
  type: string;
  [key: string]: unknown;
}

// ——————————————————————————————————————————————————————————
// Sistema esercizi
// ——————————————————————————————————————————————————————————

// Risultato di un singolo check eseguito sul codice dello studente.
export interface CheckResult {
  ok: boolean;
  // Messaggio breve mostrato nella checklist (es. "Contiene un <nav>")
  message: string;
}

// Contesto passato a ogni check: HTML parsato + regole CSS + sorgente CSS
// grezzo (utile per controllare proprietà tipo "display: flex").
export interface CheckContext {
  parsed: ParsedHtml;
  cssRules: CssRule[];
  cssSource: string;
}

// Funzione di verifica: riceve il contesto e ritorna ok/messaggio.
export type CheckFn = (ctx: CheckContext) => CheckResult;

// Definizione di un esercizio didattico.
export interface Exercise {
  id: string;
  level: number; // 1, 2, 3... per ordinamento e badge livello
  title: string;
  // Una riga di consegna per lo studente (il target è visivo, non testuale)
  consegna: string;
  // Codice del modello da replicare (renderizzato read-only)
  targetHtml: string;
  targetCss: string;
  // Codice iniziale da cui parte lo studente
  starterHtml: string;
  starterCss: string;
  // Lista di check eseguiti ad ogni modifica del codice
  checks: CheckFn[];
}

// Mappa degli esercizi completati salvata in localStorage.
export type ExerciseProgress = Record<string, boolean>;
