# Skill: Setup Iniziale Progetto

## Quando si attiva
Quando l'utente chiede di "inizializzare il progetto", "preparare il progetto", "fare lo scaffold".

## Procedura

### 1. Struttura cartelle
Creare tutte le cartelle standard:
- `src/app/api/`
- `src/components/ui/`, `src/components/layout/`, `src/components/features/`
- `src/lib/`, `src/hooks/`, `src/styles/`, `src/types/`
- `public/images/`
- `scripts/`

### 2. File utility (`src/lib/utils.ts`)
Creare con funzioni base:
- `cn()` per merge classi Tailwind (con `clsx` e `tailwind-merge`)

### 3. File errori (`src/lib/errors.ts`)
Creare con:
- Classe `AppError` personalizzata
- Funzione `handleError()` per gestione centralizzata
- Funzione `getErrorMessage()` per messaggi user-friendly

### 4. Error Boundary (`src/components/layout/ErrorBoundary.tsx`)
Creare un error boundary React che:
- Cattura errori nel render tree
- Mostra un messaggio user-friendly in italiano
- Logga l'errore in console
- Ha pulsante "Riprova"

### 5. Layout base (`src/app/layout.tsx`)
Verificare che il layout root abbia:
- Metadata base configurata
- Font configurato
- ErrorBoundary wrappato attorno ai children

### 6. Script utility (`scripts/clean.sh`)
Creare lo script di pulizia e renderlo eseguibile con `chmod +x`.

### 7. Installazione dipendenze
```bash
npm install clsx tailwind-merge lucide-react
```
