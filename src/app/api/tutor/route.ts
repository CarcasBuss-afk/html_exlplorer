// API route del tutor AI per gli esercizi.
// Riceve {exerciseId, messages} dal client e proxa la chiamata a Claude
// Haiku 4.5. Il system prompt — costruito qui server-side — vincola il
// modello a parlare SOLO degli argomenti già introdotti nel percorso
// didattico fino all'esercizio corrente, e a non dare MAI codice completo.

import { NextResponse } from "next/server";
import { findExercise, getAllowedTopics } from "@/lib/exercises";
import type { TutorMessage } from "@/types/explorer";

export const runtime = "nodejs";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 500;
const MAX_USER_MESSAGES = 10;

function buildSystemPrompt(
  consegna: string,
  intro: string | undefined,
  topics: string[],
): string {
  const topicsList = topics.length > 0 ? topics.join(", ") : "(nessuno)";

  return `Sei un tutor di HTML e CSS per studenti di 16 anni che imparano da zero. Rispondi sempre in italiano, in modo amichevole e incoraggiante.

REGOLE FONDAMENTALI (non negoziabili):

1. NON dare MAI il codice completo della soluzione. Mai. Né dell'esercizio in corso, né di nessun altro.
2. Puoi mostrare frammenti minimi: massimo UNA riga di esempio per chiarire un concetto (es. "p { color: red; }"). Mai blocchi multi-riga pronti da incollare.
3. Guida lo studente con domande, indizi e spiegazioni — non con soluzioni preconfezionate. Lo scopo è farlo ragionare.
4. Spiega in parole semplici, fai analogie concrete, evita il gergo tecnico inutile.

ARGOMENTI CONSENTITI:
Puoi parlare SOLO di questi concetti, tag e proprietà CSS, perché sono gli unici che lo studente ha già visto fino a questo punto del percorso:
${topicsList}

Se la domanda richiede argomenti FUORI da questa lista (es. grid, position, animazioni, hover, javascript, framework, ecc.), rispondi gentilmente: "Quell'argomento lo vedremo più avanti nel corso. Per ora concentrati su quello che hai imparato finora — posso aiutarti con [elenca 2-3 topic della whitelist pertinenti alla domanda]?"

Non inventare proprietà o tag che non sono nella lista, anche se la domanda dello studente li menziona. Resta sempre dentro lo scope.

CONTESTO ESERCIZIO ATTUALE:
Consegna: ${consegna}
${intro ? `Teoria breve: ${intro}` : ""}

Quando lo studente fa una domanda relativa al suo esercizio, aiutalo a capire COSA serve usare e PERCHÉ, ma lascia a lui scrivere il codice. Se è bloccato, suggerisci una direzione, non la soluzione.`;
}

function isValidMessages(value: unknown): value is TutorMessage[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m as { role?: unknown }).role !== undefined &&
      ((m as { role: string }).role === "user" ||
        (m as { role: string }).role === "assistant") &&
      typeof (m as { content?: unknown }).content === "string",
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Tutor non configurato. Manca ANTHROPIC_API_KEY." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido." }, { status: 400 });
  }

  const { exerciseId, messages } = body as {
    exerciseId?: unknown;
    messages?: unknown;
  };

  if (typeof exerciseId !== "string" || !exerciseId) {
    return NextResponse.json(
      { error: "exerciseId mancante." },
      { status: 400 },
    );
  }
  if (!isValidMessages(messages)) {
    return NextResponse.json(
      { error: "Formato messages non valido." },
      { status: 400 },
    );
  }

  const exercise = findExercise(exerciseId);
  if (!exercise) {
    return NextResponse.json(
      { error: "Esercizio non trovato." },
      { status: 404 },
    );
  }

  // Cap messaggi: lo studente può inviare al massimo 5 messaggi per
  // esercizio. Conteggio robusto anche se il client viene manomesso.
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length > MAX_USER_MESSAGES) {
    return NextResponse.json(
      {
        error: `Hai raggiunto il limite di ${MAX_USER_MESSAGES} messaggi per esercizio.`,
      },
      { status: 429 },
    );
  }

  const allowedTopics = getAllowedTopics(exerciseId);
  const systemPrompt = buildSystemPrompt(
    exercise.consegna,
    exercise.intro,
    allowedTopics,
  );

  try {
    const r = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("Errore Anthropic API:", r.status, errText);
      return NextResponse.json(
        { error: "Il tutor non è raggiungibile in questo momento." },
        { status: 502 },
      );
    }

    const data = (await r.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text =
      data.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) {
      return NextResponse.json(
        { error: "Risposta vuota dal tutor." },
        { status: 502 },
      );
    }

    return NextResponse.json({ role: "assistant", content: text });
  } catch (err) {
    console.error("Errore chiamata tutor:", err);
    return NextResponse.json(
      { error: "Errore di rete verso il tutor." },
      { status: 502 },
    );
  }
}
