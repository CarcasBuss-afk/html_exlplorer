// Utility per scaricare un blob come file.
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Genera un file HTML completo con CSS inline e fa partire il download.
export function downloadHtmlFile(
  html: string,
  css: string,
  filename = "mio-progetto.html",
): void {
  const content = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Il mio progetto</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
</body>
</html>
`;
  downloadBlob(new Blob([content], { type: "text/html" }), filename);
}

// Scarica HTML e CSS come file separati (index.html che linka style.css).
export function downloadSeparateFiles(html: string, css: string): void {
  const htmlContent = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Il mio progetto</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${html}
</body>
</html>
`;
  downloadBlob(new Blob([htmlContent], { type: "text/html" }), "index.html");
  setTimeout(() => {
    downloadBlob(new Blob([css], { type: "text/css" }), "style.css");
  }, 300);
}

// Esporta il nodo SVG dell'albero come file PNG scaricabile.
export function downloadSvgAsPng(
  svg: SVGSVGElement,
  filename = "albero.png",
  scale = 2,
): void {
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const w = svg.viewBox.baseVal.width || svg.clientWidth || 800;
    const h = svg.viewBox.baseVal.height || svg.clientHeight || 400;
    canvas.width = w * scale;
    canvas.height = h * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0c0c18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
    URL.revokeObjectURL(url);
  };
  img.src = url;
}
