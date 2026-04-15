"use client";

import { useEffect, useState } from "react";

// Debounce di un valore: utile per evitare di ri-parsare HTML/CSS a ogni keystroke.
export function useDebounced<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
