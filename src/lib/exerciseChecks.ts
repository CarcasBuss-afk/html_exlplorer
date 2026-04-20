// Helper per costruire i check degli esercizi in modo leggibile.
// Ogni helper ritorna una CheckFn che legge il CheckContext.

import type { CheckFn, HtmlNode, ParsedHtml } from "@/types/explorer";

// ——————————————————————————————————————————————————————————
// Helper interni per interrogare l'albero
// ——————————————————————————————————————————————————————————

function allNodes(parsed: ParsedHtml): HtmlNode[] {
  return [...parsed.divs.values()];
}

function findByTag(parsed: ParsedHtml, tag: string): HtmlNode[] {
  const t = tag.toLowerCase();
  return allNodes(parsed).filter((n) => n.tagName === t);
}

function findByClass(parsed: ParsedHtml, cls: string): HtmlNode[] {
  return allNodes(parsed).filter((n) => n.classes.includes(cls));
}

function findById(parsed: ParsedHtml, id: string): HtmlNode[] {
  return allNodes(parsed).filter((n) => n.idAttr === id);
}

function countChildren(
  parsed: ParsedHtml,
  parent: HtmlNode,
  predicate?: (n: HtmlNode) => boolean,
): number {
  const children = parent.childIds
    .map((cid) => parsed.divs.get(cid))
    .filter((n): n is HtmlNode => !!n);
  return predicate ? children.filter(predicate).length : children.length;
}

// ——————————————————————————————————————————————————————————
// Check builders
// ——————————————————————————————————————————————————————————

// Esiste almeno un elemento con il tag dato.
export function hasTag(tag: string, message?: string): CheckFn {
  return ({ parsed }) => ({
    ok: findByTag(parsed, tag).length > 0,
    message: message ?? `Contiene un <${tag}>`,
  });
}

// Esiste un elemento con la classe data.
export function hasClass(cls: string, message?: string): CheckFn {
  return ({ parsed }) => ({
    ok: findByClass(parsed, cls).length > 0,
    message: message ?? `Esiste un elemento con classe .${cls}`,
  });
}

// Esiste un elemento con l'id dato.
export function hasId(id: string, message?: string): CheckFn {
  return ({ parsed }) => ({
    ok: findById(parsed, id).length > 0,
    message: message ?? `Esiste un elemento con id #${id}`,
  });
}

// Il primo elemento col tag dato contiene almeno N figli diretti
// (totale o di un tag specifico).
export function tagHasChildren(
  parentTag: string,
  minCount: number,
  childTag?: string,
  message?: string,
): CheckFn {
  const defaultMsg =
    message ??
    `Il <${parentTag}> contiene almeno ${minCount} ${childTag ? `<${childTag}>` : "figli"}`;
  return ({ parsed }) => {
    const parent = findByTag(parsed, parentTag)[0];
    if (!parent) return { ok: false, message: defaultMsg };
    const n = childTag
      ? countChildren(
          parsed,
          parent,
          (c) => c.tagName === childTag.toLowerCase(),
        )
      : countChildren(parsed, parent);
    return { ok: n >= minCount, message: defaultMsg };
  };
}

// Il primo elemento con la classe data contiene almeno N figli diretti.
export function classHasChildren(
  parentClass: string,
  minCount: number,
  childTag?: string,
  message?: string,
): CheckFn {
  const defaultMsg =
    message ??
    `.${parentClass} contiene almeno ${minCount} ${childTag ? `<${childTag}>` : "figli"}`;
  return ({ parsed }) => {
    const parent = findByClass(parsed, parentClass)[0];
    if (!parent) return { ok: false, message: defaultMsg };
    const n = childTag
      ? countChildren(
          parsed,
          parent,
          (c) => c.tagName === childTag.toLowerCase(),
        )
      : countChildren(parsed, parent);
    return { ok: n >= minCount, message: defaultMsg };
  };
}

// Almeno un elemento col tag childTag è annidato (a qualsiasi profondità)
// dentro un antenato col tag ancestorTag.
export function nestedIn(
  childTag: string,
  ancestorTag: string,
  message?: string,
): CheckFn {
  const defaultMsg = message ?? `<${childTag}> è dentro a <${ancestorTag}>`;
  return ({ parsed }) => {
    const children = findByTag(parsed, childTag);
    const anc = ancestorTag.toLowerCase();
    const ok = children.some((c) => {
      let cur = c.parentId;
      while (cur) {
        const p = parsed.divs.get(cur);
        if (!p) break;
        if (p.tagName === anc) return true;
        cur = p.parentId;
      }
      return false;
    });
    return { ok, message: defaultMsg };
  };
}

// Esiste una regola CSS con il selettore dato (match esatto, normalizzato
// sugli spazi; supporta selettori composti tipo "h1, h2").
export function hasCssRule(selector: string, message?: string): CheckFn {
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
  const target = normalize(selector);
  const defaultMsg = message ?? `Esiste la regola CSS "${selector}"`;
  return ({ cssRules }) => ({
    ok: cssRules.some((r) =>
      r.selector.split(",").some((s) => normalize(s) === target),
    ),
    message: defaultMsg,
  });
}

// Una regola CSS esiste E il suo corpo contiene una proprietà con valore
// (stringa esatta o regex). Controllo testuale sul sorgente CSS.
export function cssRuleHasProperty(
  selector: string,
  property: string,
  value: string | RegExp,
  message?: string,
): CheckFn {
  const defaultMsg =
    message ??
    `${selector} ha ${property}: ${value instanceof RegExp ? value.source : value}`;
  return ({ cssSource }) => {
    const selRe = new RegExp(
      `${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`,
      "i",
    );
    const m = selRe.exec(cssSource);
    if (!m) return { ok: false, message: defaultMsg };
    const body = m[1];
    const propRe = new RegExp(`${property}\\s*:\\s*([^;]+)`, "i");
    const pm = propRe.exec(body);
    if (!pm) return { ok: false, message: defaultMsg };
    const actual = pm[1].trim();
    const ok = value instanceof RegExp ? value.test(actual) : actual === value;
    return { ok, message: defaultMsg };
  };
}
