// Estrae HTML (body) e CSS (tag <style>) da un file HTML.
// Funziona con i file esportati da downloadHtmlFile e con HTML generici.

export interface ImportedProject {
  html: string;
  css: string;
}

export function parseHtmlFile(text: string): ImportedProject {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  // Concatena tutti i blocchi <style> (anche se di solito è uno solo).
  const styles = Array.from(doc.querySelectorAll("style"));
  const css = styles
    .map((s) => s.textContent ?? "")
    .join("\n")
    .trim();

  const html = (doc.body?.innerHTML ?? "").trim();

  return { html, css };
}
