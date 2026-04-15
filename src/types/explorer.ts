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
