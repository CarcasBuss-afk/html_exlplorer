// Gestione errori centralizzata

/**
 * Errore personalizzato dell'applicazione.
 * Aggiunge un codice errore e un messaggio user-friendly.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string = "GENERIC_ERROR",
    public userMessage: string = "Si è verificato un errore. Riprova più tardi."
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Gestisce un errore in modo centralizzato.
 * Logga in console e restituisce un messaggio sicuro per l'utente.
 */
export function handleError(error: unknown): string {
  if (error instanceof AppError) {
    console.error(`[${error.code}] ${error.message}`);
    return error.userMessage;
  }

  if (error instanceof Error) {
    console.error(`[Errore] ${error.message}`);
    return "Si è verificato un errore imprevisto.";
  }

  console.error("[Errore sconosciuto]", error);
  return "Si è verificato un errore imprevisto.";
}

/**
 * Estrae il messaggio da un errore di tipo sconosciuto.
 * Utile nei blocchi catch dove error è di tipo `unknown`.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Errore sconosciuto";
}
