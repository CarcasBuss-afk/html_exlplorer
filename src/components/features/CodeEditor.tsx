"use client";

// Wrapper attorno a Monaco con:
// - tema dark custom
// - decorations dinamiche per evidenziare righe (da lineStart a lineEnd)
// - callback su cambio cursore per hover "dal codice"

import { Editor, type OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import type * as MonacoNs from "monaco-editor";
import { setupMonaco } from "@/lib/monacoSetup";

type MonacoType = typeof MonacoNs;
type StandaloneEditor = MonacoNs.editor.IStandaloneCodeEditor;

export interface HighlightRange {
  lineStart: number;
  lineEnd: number;
  color: string;
  // Se true, evidenziazione "debole" (es. CSS parent, o regola matchata secondaria)
  soft?: boolean;
}

interface Props {
  language: "html" | "css";
  value: string;
  onChange: (v: string) => void;
  highlights: HighlightRange[];
  onCursorLine?: (line: number) => void;
  // Richiesto quando l'utente clicca fuori dal testo:
  // serve a pulire la selezione sincronizzata tra i pannelli.
  onClearSelection?: () => void;
  fontSize?: number;
}

const THEME_NAME = "explorer-dark";

function defineTheme(monaco: MonacoType) {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "tag", foreground: "ff6b6b" },
      { token: "attribute.name", foreground: "a78bfa" },
      { token: "attribute.value", foreground: "fbbf24" },
      { token: "string", foreground: "fbbf24" },
      { token: "comment", foreground: "3a3a50", fontStyle: "italic" },
      { token: "delimiter", foreground: "7777aa" },
      // CSS
      { token: "tag.css", foreground: "f472b6" },
      { token: "attribute.name.css", foreground: "4ecdc4" },
      { token: "attribute.value.css", foreground: "34d399" },
      { token: "keyword.css", foreground: "4ecdc4" },
      { token: "number.css", foreground: "34d399" },
    ],
    colors: {
      "editor.background": "#0c0c18",
      "editor.foreground": "#e8e8f0",
      "editorLineNumber.foreground": "#2a2a3a",
      "editorLineNumber.activeForeground": "#7777aa",
      "editor.lineHighlightBackground": "#161628",
      "editorCursor.foreground": "#4ecdc4",
      "editor.selectionBackground": "#282850",
      "editor.inactiveSelectionBackground": "#1c1c38",
      "editorIndentGuide.background1": "#1c1c38",
    },
  });
}

export default function CodeEditor({
  language,
  value,
  onChange,
  highlights,
  onCursorLine,
  onClearSelection,
  fontSize = 12,
}: Props) {
  const editorRef = useRef<StandaloneEditor | null>(null);
  const monacoRef = useRef<MonacoType | null>(null);
  const decorationsRef = useRef<string[]>([]);
  const styleInjectedRef = useRef(false);
  const [ready, setReady] = useState(false);

  // Ref sempre aggiornate alla versione corrente delle callback.
  // Monaco registra i listener una sola volta al mount: senza queste ref
  // la chiusura catturerebbe il parsed/activeElement iniziali (stale).
  const onCursorLineRef = useRef(onCursorLine);
  const onClearSelectionRef = useRef(onClearSelection);
  useEffect(() => {
    onCursorLineRef.current = onCursorLine;
  }, [onCursorLine]);
  useEffect(() => {
    onClearSelectionRef.current = onClearSelection;
  }, [onClearSelection]);

  // Configura Monaco con i worker locali prima di montare l'Editor.
  useEffect(() => {
    setupMonaco().then(() => setReady(true));
  }, []);

  // Inietta le classi CSS per i decoratori (unico per tutta la pagina)
  useEffect(() => {
    if (styleInjectedRef.current) return;
    styleInjectedRef.current = true;
    const id = "__explorer_editor_decorations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    // 20 classi colorate (una per indice della palette) + una soft
    const palette = [
      "#ff6b6b",
      "#fbbf24",
      "#4ecdc4",
      "#a78bfa",
      "#f472b6",
      "#fb923c",
      "#34d399",
      "#818cf8",
      "#c084fc",
      "#60a5fa",
    ];
    let css = "";
    palette.forEach((c, i) => {
      css += `.xp-hl-${i} { background: ${c}1f; border-left: 3px solid ${c}; box-sizing: border-box; }\n`;
      css += `.xp-hl-${i}-soft { background: ${c}10; border-left: 2px solid ${c}80; box-sizing: border-box; }\n`;
    });
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    defineTheme(monaco);
    monaco.editor.setTheme(THEME_NAME);

    editor.onDidChangeCursorPosition((e) => {
      onCursorLineRef.current?.(e.position.lineNumber);
    });

    // Click fuori dal testo (zona nera sotto/oltre il codice): deseleziona.
    const MT = monaco.editor.MouseTargetType;
    editor.onMouseDown((e) => {
      const t = e.target?.type;
      if (t === MT.CONTENT_EMPTY || t === MT.OUTSIDE_EDITOR) {
        onClearSelectionRef.current?.();
      }
    });
  };

  // Applica decorations a ogni cambio di highlights
  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const palette = [
      "#ff6b6b",
      "#fbbf24",
      "#4ecdc4",
      "#a78bfa",
      "#f472b6",
      "#fb923c",
      "#34d399",
      "#818cf8",
      "#c084fc",
      "#60a5fa",
    ];

    const decos = highlights.map((h) => {
      const idx = palette.indexOf(h.color.toLowerCase());
      const safeIdx = idx >= 0 ? idx : 0;
      const cls = h.soft ? `xp-hl-${safeIdx}-soft` : `xp-hl-${safeIdx}`;
      return {
        range: new monaco.Range(h.lineStart, 1, h.lineEnd, 1),
        options: {
          isWholeLine: true,
          className: cls,
          linesDecorationsClassName: cls,
        },
      };
    });

    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
      decos,
    );

    // Auto-scroll alla prima highlight forte
    const primary = highlights.find((h) => !h.soft);
    if (primary) {
      editor.revealLineInCenterIfOutsideViewport(primary.lineStart);
    }
  }, [highlights]);

  if (!ready) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[var(--mu)]">
        Caricamento editor…
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme={THEME_NAME}
      onMount={handleMount}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize,
        fontFamily:
          "ui-monospace, 'Space Mono', SFMono-Regular, Consolas, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        renderWhitespace: "none",
        tabSize: 2,
        wordWrap: "on",
        smoothScrolling: true,
        padding: { top: 8, bottom: 8 },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        // Rende i popup (suggerimenti, hover, parameter hints) position:fixed
        // sul body, così non vengono tagliati dalle colonne con overflow:hidden.
        fixedOverflowWidgets: true,
        // IntelliSense / autocomplete
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
        tabCompletion: "on",
        wordBasedSuggestions: "currentDocument",
        parameterHints: { enabled: true },
        // Formattazione
        formatOnPaste: true,
        formatOnType: true,
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "advanced",
      }}
    />
  );
}
