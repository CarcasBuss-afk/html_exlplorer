// Parser HTML "educational": estrae TUTTI i tag (div, button, a, nav, ul, li,
// h1-h6, img, input, ecc.), assegna ID univoci, mantiene il mapping alle
// righe del sorgente e inietta data-explorer-id nell'HTML restituito.
//
// Non è un parser HTML completo: per uno strumento didattico basta.

import type { HtmlNode, ParsedHtml } from "@/types/explorer";
import { colorForIndex } from "./colors";

// Void elements HTML: non possono avere figli, nessun tag di chiusura.
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

// Tag che ignoriamo completamente (contenuto opaco o non-UI).
const SKIP_TAGS = new Set(["script", "style"]);

// Token: commento HTML | tag di apertura/chiusura di qualsiasi elemento.
const TOKEN_RE = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/g;
const CLASS_RE = /class\s*=\s*["']([^"']*)["']/i;
const ID_RE = /\bid\s*=\s*["']([^"']*)["']/i;

function lineAt(source: string, pos: number): number {
  let line = 1;
  for (let i = 0; i < pos; i++) {
    if (source.charCodeAt(i) === 10) line++;
  }
  return line;
}

function buildLabel(
  tagName: string,
  classes: string[],
  idAttr: string | null,
): string {
  if (idAttr) return `${tagName}#${idAttr}`;
  if (classes.length > 0) return `${tagName}.${classes[0]}`;
  return tagName;
}

export function parseHtml(source: string): ParsedHtml {
  const divs = new Map<string, HtmlNode>();
  const rootIds: string[] = [];
  const stack: string[] = [];

  let idCounter = 0;
  let injected = "";
  let lastCopy = 0;

  // Quando siamo dentro un SKIP_TAG (script/style), ignoriamo i token interni
  // finché non incontriamo il tag di chiusura corrispondente.
  let skipUntil: string | null = null;

  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_RE.exec(source)) !== null) {
    // Commento HTML: non è un token significativo
    if (match[0].startsWith("<!--")) {
      continue;
    }

    const isClose = !!match[1];
    const tagOriginal = match[2];
    const tagName = tagOriginal.toLowerCase();
    const attrs = match[3] ?? "";
    const tagStart = match.index;
    const tagEnd = match.index + match[0].length;
    const line = lineAt(source, tagStart);

    // Siamo dentro script/style? Aspetta la chiusura.
    if (skipUntil) {
      if (isClose && tagName === skipUntil) {
        skipUntil = null;
      }
      continue;
    }

    // Apertura di script/style: non entrare nel parsing, ma lascia il contenuto
    // così com'è nell'HTML iniettato.
    if (!isClose && SKIP_TAGS.has(tagName)) {
      skipUntil = tagName;
      continue;
    }

    if (isClose) {
      // Trova il tag di apertura corrispondente più interno nello stack.
      // Se c'è disallineamento (tag misti), chiude tutti i non-matching interni.
      let matchedIdx = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
        const openNode = divs.get(stack[i]);
        if (openNode && openNode.tagName === tagName) {
          matchedIdx = i;
          break;
        }
      }
      if (matchedIdx >= 0) {
        // Chiudi tutti quelli sopra (HTML non-well-formed tollerato)
        for (let i = stack.length - 1; i >= matchedIdx; i--) {
          const n = divs.get(stack[i]);
          if (n) n.lineEnd = line;
        }
        stack.splice(matchedIdx);
      }
      injected += source.slice(lastCopy, tagEnd);
      lastCopy = tagEnd;
    } else {
      const id = `d${idCounter++}`;
      const parentId = stack.length > 0 ? stack[stack.length - 1] : null;
      const depth = stack.length;

      const classMatch = CLASS_RE.exec(attrs);
      const classes = classMatch
        ? classMatch[1].trim().split(/\s+/).filter(Boolean)
        : [];
      const idMatch = ID_RE.exec(attrs);
      const idAttr = idMatch ? idMatch[1] : null;

      const isVoid = VOID_ELEMENTS.has(tagName);
      // Self-closing stile XHTML: <tag ... />
      const isSelfClosing = attrs.trimEnd().endsWith("/");

      const node: HtmlNode = {
        id,
        tagName,
        classes,
        idAttr,
        lineStart: line,
        lineEnd: line,
        parentId,
        childIds: [],
        depth,
        color: colorForIndex(idCounter - 1),
        label: buildLabel(tagName, classes, idAttr),
        isVoid,
      };
      divs.set(id, node);
      if (parentId) divs.get(parentId)!.childIds.push(id);
      else rootIds.push(id);

      // Iniettiamo data-explorer-id nel tag di apertura, mantenendo
      // gli attributi originali dell'utente e il case del tag name.
      injected += source.slice(lastCopy, tagStart);
      injected += `<${tagOriginal} data-explorer-id="${id}"${attrs}>`;
      lastCopy = tagEnd;

      if (!isVoid && !isSelfClosing) {
        stack.push(id);
      } else {
        // Per void/self-closing, lineEnd = lineStart (già così di default)
      }
    }
  }
  injected += source.slice(lastCopy);

  return { divs, rootIds, injectedHtml: injected, source };
}

// Costruisce la catena dei genitori per un dato nodo (dal più vicino alla radice).
export function parentChain(
  divs: Map<string, HtmlNode>,
  id: string,
): HtmlNode[] {
  const chain: HtmlNode[] = [];
  let cur = divs.get(id)?.parentId ?? null;
  while (cur) {
    const n = divs.get(cur);
    if (!n) break;
    chain.push(n);
    cur = n.parentId;
  }
  return chain;
}

// Restituisce i fratelli di un nodo (escluso il nodo stesso).
export function siblings(
  divs: Map<string, HtmlNode>,
  id: string,
): HtmlNode[] {
  const node = divs.get(id);
  if (!node) return [];
  const parentChildren = node.parentId
    ? divs.get(node.parentId)?.childIds ?? []
    : [...divs.values()].filter((n) => n.parentId === null).map((n) => n.id);
  return parentChildren.filter((cid) => cid !== id).map((cid) => divs.get(cid)!);
}
