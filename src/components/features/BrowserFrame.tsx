"use client";

// Preview isolato in iframe. L'iframe riceve:
// - l'HTML utente (con data-explorer-id iniettato)
// - il CSS utente
// - uno script interno che:
//   * emette hover/unhover via postMessage al parent
//   * riceve richieste di highlight dal parent
//   * calcola quali selettori CSS matchano un elemento (element.matches)
//
// La comunicazione usa window.postMessage con un marker { source: 'explorer' | 'explorer-host' }.

import { useEffect, useMemo, useRef } from "react";
import type { HtmlNode, ParsedHtml } from "@/types/explorer";
import { useHighlight } from "@/hooks/useHighlight";

interface Props {
  parsed: ParsedHtml;
  cssSource: string;
  allSelectors: { id: string; selector: string }[];
  previewTheme: "light" | "dark";
}

// Script iniettato nell'iframe. Mantenuto come stringa per srcdoc.
const IFRAME_SCRIPT = `
(function() {
  const HOST = 'explorer-host';
  const SELF = 'explorer';
  const post = (type, extra) => parent.postMessage(Object.assign({ source: SELF, type }, extra || {}), '*');

  // Stile dinamico per highlight e raggi X
  const style = document.createElement('style');
  style.textContent = \`
    body { position: relative; }
    [data-explorer-id] { transition: outline 0.2s ease, background 0.2s ease; position: relative; }
    .__xp-active { outline: 2.5px solid var(--xp-c) !important; outline-offset: 2px !important; background: color-mix(in srgb, var(--xp-c) 10%, transparent) !important; z-index: 2; }
    .__xp-parent { outline: 2px dashed var(--xp-c) !important; outline-offset: 2px !important; }
    body.__xp-xray [data-explorer-id] {
      outline: 2px solid var(--xp-self-c, #888) !important;
      outline-offset: 1px !important;
      background: color-mix(in srgb, var(--xp-self-c, #888) 6%, transparent) !important;
    }
    .__xp-label {
      position: absolute; top: -11px; left: 4px;
      font: 700 10px/1 ui-monospace, monospace;
      padding: 2px 6px; border-radius: 3px;
      color: #000;
      pointer-events: none; z-index: 10; white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    /* Per void element (img, input, ecc.) usiamo label flottante sul body */
    .__xp-label-float { z-index: 10000; }
    /* In modalità Raggi X, etichette piccole e meno invadenti */
    body.__xp-xray .__xp-label {
      top: -9px; font-size: 9px; padding: 1px 4px; opacity: 0.95;
    }
  \`;
  document.head.appendChild(style);

  // Void elements: non possono avere figli, label va messa come elemento flottante.
  const VOID = { AREA:1, BASE:1, BR:1, COL:1, EMBED:1, HR:1, IMG:1, INPUT:1, LINK:1, META:1, SOURCE:1, TRACK:1, WBR:1 };

  function addLabel(el, color, text) {
    const lbl = document.createElement('span');
    lbl.className = '__xp-label';
    lbl.style.background = color;
    lbl.textContent = text;
    if (VOID[el.tagName]) {
      const rect = el.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();
      lbl.classList.add('__xp-label-float');
      lbl.style.left = (rect.left - bodyRect.left + 4) + 'px';
      lbl.style.top = (rect.top - bodyRect.top - 12) + 'px';
      document.body.appendChild(lbl);
    } else {
      el.appendChild(lbl);
    }
    return lbl;
  }

  document.addEventListener('mouseover', function(e) {
    const t = e.target.closest ? e.target.closest('[data-explorer-id]') : null;
    if (t) post('hover', { id: t.getAttribute('data-explorer-id') });
  }, true);
  document.addEventListener('mouseout', function(e) {
    const t = e.target.closest ? e.target.closest('[data-explorer-id]') : null;
    if (!t) return;
    const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('[data-explorer-id]') : null;
    if (!to) post('unhover', {});
  }, true);

  // Touch support
  document.addEventListener('touchstart', function(e) {
    const t = e.target.closest ? e.target.closest('[data-explorer-id]') : null;
    if (t) post('hover', { id: t.getAttribute('data-explorer-id') });
    else post('unhover', {});
  }, { passive: true });

  function clearAll() {
    document.querySelectorAll('.__xp-active, .__xp-parent').forEach(function(el) {
      el.classList.remove('__xp-active');
      el.classList.remove('__xp-parent');
      el.style.removeProperty('--xp-c');
    });
    document.querySelectorAll('.__xp-label').forEach(function(el) { el.remove(); });
  }

  window.addEventListener('message', function(e) {
    const d = e.data;
    if (!d || d.source !== HOST) return;
    if (d.type === 'highlight') {
      clearAll();
      if (!d.id) return;
      const el = document.querySelector('[data-explorer-id="' + d.id + '"]');
      if (el) {
        el.classList.add('__xp-active');
        el.style.setProperty('--xp-c', d.color);
        addLabel(el, d.color, d.label);
      }
      (d.parents || []).forEach(function(p) {
        const pe = document.querySelector('[data-explorer-id="' + p.id + '"]');
        if (pe) {
          pe.classList.add('__xp-parent');
          pe.style.setProperty('--xp-c', p.color);
        }
      });
    } else if (d.type === 'clear') {
      clearAll();
    } else if (d.type === 'xray') {
      clearAll();
      if (d.on) {
        document.body.classList.add('__xp-xray');
        document.querySelectorAll('[data-explorer-id]').forEach(function(el) {
          const c = el.getAttribute('data-xp-color') || '#888';
          el.style.setProperty('--xp-self-c', c);
          addLabel(el, c, el.getAttribute('data-xp-label') || 'div');
        });
      } else {
        document.body.classList.remove('__xp-xray');
        document.querySelectorAll('.__xp-label').forEach(function(el) { el.remove(); });
      }
    } else if (d.type === 'match-css') {
      const el = document.querySelector('[data-explorer-id="' + d.id + '"]');
      const matched = [];
      if (el) {
        (d.selectors || []).forEach(function(s) {
          try {
            if (el.matches(s.selector)) matched.push(s.ruleId);
          } catch (err) { /* selettore non valido: skip */ }
        });
      }
      post('css-matched', { id: d.id, ruleIds: matched });
    }
  });

  post('ready', {});
})();
`;

function buildSrcDoc(
  parsed: ParsedHtml,
  cssSource: string,
  divs: Map<string, HtmlNode>,
  previewTheme: "light" | "dark",
): string {
  // Arricchiamo ogni div con data-xp-color e data-xp-label via stringa
  // (già iniettati nel parsed, ma li aggiungiamo qui in modo semplice).
  let html = parsed.injectedHtml;
  for (const [id, node] of divs) {
    const marker = `data-explorer-id="${id}"`;
    html = html.replace(
      marker,
      `${marker} data-xp-color="${node.color}" data-xp-label="${node.label}"`,
    );
  }

  const bg = previewTheme === "dark" ? "#1c1c2e" : "#fafafa";
  const fg = previewTheme === "dark" ? "#e8e8f0" : "#111";

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; background: ${bg}; color: ${fg}; min-height: 100vh; box-sizing: border-box; }
  * { box-sizing: border-box; }
${cssSource}
</style>
</head>
<body>
${html}
<script>${IFRAME_SCRIPT}</script>
</body>
</html>`;
}

export default function BrowserFrame({
  parsed,
  cssSource,
  allSelectors,
  previewTheme,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { activeElement, mode, setMatchedRules, setActive } = useHighlight();

  const srcDoc = useMemo(
    () => buildSrcDoc(parsed, cssSource, parsed.divs, previewTheme),
    [parsed, cssSource, previewTheme],
  );

  // Ricevi messaggi dall'iframe
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const d = e.data;
      if (!d || d.source !== "explorer") return;
      if (d.type === "hover" && typeof d.id === "string") {
        setActive(d.id);
      } else if (d.type === "unhover") {
        setActive(null);
      } else if (d.type === "css-matched" && Array.isArray(d.ruleIds)) {
        setMatchedRules(d.ruleIds);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [setActive, setMatchedRules]);

  // Al cambio di activeElement/mode, notifica l'iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const win = iframe.contentWindow;

    if (mode === "xray") {
      win.postMessage({ source: "explorer-host", type: "xray", on: true }, "*");
      return;
    } else {
      win.postMessage(
        { source: "explorer-host", type: "xray", on: false },
        "*",
      );
    }

    if (!activeElement) {
      win.postMessage({ source: "explorer-host", type: "clear" }, "*");
      return;
    }

    const node = parsed.divs.get(activeElement);
    if (!node) return;

    // Catena dei genitori
    const parents: { id: string; color: string }[] = [];
    let p = node.parentId;
    while (p) {
      const pn = parsed.divs.get(p);
      if (!pn) break;
      parents.push({ id: pn.id, color: pn.color });
      p = pn.parentId;
    }

    win.postMessage(
      {
        source: "explorer-host",
        type: "highlight",
        id: node.id,
        color: node.color,
        label: node.label,
        parents,
      },
      "*",
    );

    // Chiedi quali regole CSS matchano
    if (allSelectors.length > 0) {
      win.postMessage(
        {
          source: "explorer-host",
          type: "match-css",
          id: node.id,
          selectors: allSelectors.map((s) => ({
            ruleId: s.id,
            selector: s.selector,
          })),
        },
        "*",
      );
    } else {
      setMatchedRules([]);
    }
  }, [activeElement, mode, parsed, allSelectors, setMatchedRules]);

  return (
    <div className="bg-[#111122] rounded-lg border border-[var(--bd)] overflow-hidden h-full w-full flex flex-col">
      <div className="bg-[var(--sf2)] px-2 py-1.5 flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="bg-[var(--sf)] rounded px-2 py-0.5 font-mono text-[10px] text-[var(--mu)] flex-1 ml-1">
          https://preview.local
        </div>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        title="preview"
        className="flex-1 w-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
