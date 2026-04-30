"use client";

// Pannello chat del tutor AI: slide-in da destra in modalità esercizio.
// Lo studente fa domande sui concetti già visti; il tutor (Claude Haiku
// 4.5) risponde con indizi e spiegazioni, MAI con codice completo.
// Limite hard-coded: 10 messaggi user per esercizio. Conversazione
// resettata a ogni cambio esercizio.

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X, Loader2 } from "lucide-react";
import type { TutorMessage } from "@/types/explorer";

interface Props {
  open: boolean;
  onClose: () => void;
  exerciseId: string;
  exerciseTitle: string;
}

const MAX_USER_MESSAGES = 10;

export default function TutorChat({
  open,
  onClose,
  exerciseId,
  exerciseTitle,
}: Props) {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Reset conversazione a ogni cambio esercizio.
  useEffect(() => {
    setMessages([]);
    setInput("");
    setError(null);
    setLoading(false);
  }, [exerciseId]);

  // Auto-scroll all'ultimo messaggio.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input all'apertura.
  useEffect(() => {
    if (open) {
      // Piccolo delay per la transizione di apertura.
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const userCount = messages.filter((m) => m.role === "user").length;
  const remaining = MAX_USER_MESSAGES - userCount;
  const canSend = remaining > 0 && !loading && input.trim().length > 0;

  async function send() {
    if (!canSend) return;
    const text = input.trim();
    const next: TutorMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ exerciseId, messages: next }),
      });
      const data = (await r.json()) as {
        role?: string;
        content?: string;
        error?: string;
      };
      if (!r.ok || !data.content) {
        setError(data.error ?? "Errore sconosciuto.");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content as string },
        ]);
      }
    } catch {
      setError("Impossibile contattare il tutor. Controlla la connessione.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Backdrop semi-trasparente, click per chiudere */}
      {open ? (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      ) : null}

      {/* Pannello slide-in */}
      <aside
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[100vw] bg-[var(--sf)] border-l border-[var(--bd)] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--bd)] bg-[var(--sf2)]">
          <Sparkles size={16} className="text-[#a78bfa]" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13px] text-[var(--tx)]">
              Tutor HTML/CSS
            </div>
            <div className="text-[11px] text-[var(--mu)] truncate">
              {exerciseTitle}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[var(--bd)] text-[var(--mu)] hover:text-[var(--tx)] transition-colors"
            title="Chiudi tutor"
          >
            <X size={16} />
          </button>
        </div>

        {/* Counter */}
        <div className="px-4 py-2 border-b border-[var(--bd)] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
          <span className="text-[var(--mu)]">
            Messaggi rimasti
          </span>
          <span
            className={
              remaining === 0
                ? "text-[#ff6b6b] font-bold"
                : remaining <= 1
                  ? "text-[#fbbf24] font-bold"
                  : "text-[#34d399] font-bold"
            }
          >
            {remaining}/{MAX_USER_MESSAGES}
          </span>
        </div>

        {/* Lista messaggi */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto explorer-scroll px-4 py-3 space-y-3"
        >
          {messages.length === 0 ? (
            <div className="text-[12px] text-[var(--mu)] leading-relaxed">
              <p className="mb-2">
                Ciao! Sono qui per aiutarti con questo esercizio.
              </p>
              <p className="mb-2">
                Posso spiegarti i concetti che hai già visto nel corso, ma
                <strong className="text-[var(--tx)]"> non ti darò la soluzione</strong>:
                il codice lo scrivi tu.
              </p>
              <p>
                Esempi di domande utili:
              </p>
              <ul className="mt-1 ml-4 list-disc space-y-0.5">
                <li>&quot;Come faccio a centrare il testo?&quot;</li>
                <li>&quot;Cosa serve per dare uno sfondo a un elemento?&quot;</li>
                <li>&quot;Qual è la differenza tra padding e margin?&quot;</li>
              </ul>
            </div>
          ) : null}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "ml-auto max-w-[85%] bg-[#a78bfa] text-black px-3 py-2 rounded-lg whitespace-pre-wrap"
                  : "mr-auto max-w-[90%] bg-[var(--sf2)] text-[var(--tx)] px-3 py-2 rounded-lg whitespace-pre-wrap border border-[var(--bd)]"
              }`}
            >
              {m.content}
            </div>
          ))}

          {loading ? (
            <div className="flex items-center gap-2 text-[12px] text-[var(--mu)]">
              <Loader2 size={14} className="animate-spin" />
              <span>Il tutor sta pensando...</span>
            </div>
          ) : null}

          {error ? (
            <div className="text-[12px] text-[#ff6b6b] bg-[rgba(255,107,107,0.08)] border border-[#ff6b6b]/40 rounded px-3 py-2">
              {error}
            </div>
          ) : null}
        </div>

        {/* Input */}
        <div className="border-t border-[var(--bd)] p-3 bg-[var(--sf2)]">
          {remaining === 0 ? (
            <div className="text-[12px] text-[var(--mu)] text-center py-2">
              Hai usato tutti i messaggi per questo esercizio.
              <br />
              Rileggi la teoria e prova ad andare avanti da solo!
            </div>
          ) : (
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Fai una domanda sull'esercizio..."
                rows={2}
                className="flex-1 resize-none bg-[var(--sf)] border border-[var(--bd)] rounded px-2.5 py-2 text-[13px] text-[var(--tx)] placeholder:text-[var(--mu)] focus:outline-none focus:border-[#a78bfa]"
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={!canSend}
                className="flex items-center justify-center w-9 h-9 rounded bg-[#a78bfa] text-black hover:bg-[#8b6dfb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Invia (Invio)"
              >
                <Send size={15} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
