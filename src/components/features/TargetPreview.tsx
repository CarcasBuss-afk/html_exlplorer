"use client";

// Iframe read-only per mostrare il modello di un esercizio.
// A differenza di BrowserFrame non ha hover sync, né Raggi X, né match CSS:
// è un rendering "solo vetrina" del risultato da replicare.

import { useMemo } from "react";

interface Props {
  html: string;
  css: string;
  previewTheme: "light" | "dark";
}

function buildTargetSrcDoc(
  html: string,
  css: string,
  previewTheme: "light" | "dark",
): string {
  const bg = previewTheme === "dark" ? "#1c1c2e" : "#fafafa";
  const fg = previewTheme === "dark" ? "#e8e8f0" : "#111";

  // Blocca i click sui link dentro la preview target (stessa logica del
  // BrowserFrame: evita navigazione accidentale).
  const blockNavScript = `
(function(){
  document.addEventListener('click', function(e){
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (a) e.preventDefault();
  }, true);
})();
`;

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; background: ${bg}; color: ${fg}; min-height: 100vh; box-sizing: border-box; }
  * { box-sizing: border-box; }
${css}
</style>
</head>
<body>
${html}
<script>${blockNavScript}</script>
</body>
</html>`;
}

export default function TargetPreview({ html, css, previewTheme }: Props) {
  const srcDoc = useMemo(
    () => buildTargetSrcDoc(html, css, previewTheme),
    [html, css, previewTheme],
  );

  return (
    <div className="bg-[#111122] rounded-lg border border-[var(--bd)] overflow-hidden h-full w-full flex flex-col">
      <div className="bg-[var(--sf2)] px-2 py-1.5 flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <div className="bg-[var(--sf)] rounded px-2 py-0.5 font-mono text-[10px] text-[var(--mu)] flex-1 ml-1">
          🎯 modello.local
        </div>
      </div>
      <iframe
        srcDoc={srcDoc}
        title="modello"
        className="flex-1 w-full border-0 bg-white pointer-events-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
