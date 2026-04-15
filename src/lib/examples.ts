// Template HTML+CSS precaricati per dare agli studenti un punto di partenza.
// Usiamo HTML semantico: <nav>, <button>, <a>, <section>, <form>, ecc.

export interface Example {
  id: string;
  label: string;
  html: string;
  css: string;
}

export const EXAMPLES: Example[] = [
  {
    id: "navbar",
    label: "Navbar",
    html: `<nav class="navbar">

  <div class="logo">
    MioSito
  </div>

  <div class="menu">
    <a href="#">Home</a>
    <a href="#">Chi siamo</a>
    <a href="#">Contatti</a>
  </div>

  <div class="azioni">
    <button>Login</button>
    <button class="primario">Registrati</button>
  </div>

</nav>`,
    css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  font-family: sans-serif;
}

.logo {
  padding: 6px 10px;
  font-weight: 900;
  font-size: 18px;
}

.menu {
  display: flex;
  gap: 6px;
  padding: 6px 10px;
}

.menu a {
  padding: 6px 14px;
  color: #aaa;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 700;
}

.azioni {
  display: flex;
  gap: 8px;
  padding: 6px 10px;
}

button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #333;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
}

button.primario {
  background: #34d399;
  color: #000;
}
`,
  },
  {
    id: "card",
    label: "Card",
    html: `<article class="card">
  <header class="card-header">
    <h3 class="titolo">Prodotto top</h3>
    <span class="badge">NEW</span>
  </header>
  <div class="card-body">
    <p class="prezzo">€ 29,90</p>
    <p class="descrizione">
      Un prodotto fantastico che ti cambierà la vita.
    </p>
  </div>
  <footer class="card-footer">
    <button class="btn">Aggiungi</button>
  </footer>
</article>`,
    css: `.card {
  width: 280px;
  background: #1c1c38;
  border-radius: 12px;
  overflow: hidden;
  color: #e8e8f0;
  font-family: sans-serif;
}

.card-header {
  padding: 14px;
  background: #282850;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titolo {
  margin: 0;
  font-weight: 700;
  font-size: 16px;
}

.badge {
  background: #f472b6;
  color: #000;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
}

.card-body {
  padding: 14px;
}

.prezzo {
  margin: 0 0 6px 0;
  font-size: 22px;
  font-weight: 900;
  color: #34d399;
}

.descrizione {
  margin: 0;
  color: #aaa;
  font-size: 13px;
  line-height: 1.5;
}

.card-footer {
  padding: 12px 14px;
  border-top: 1px solid #282850;
}

.btn {
  width: 100%;
  background: #4ecdc4;
  color: #000;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
`,
  },
  {
    id: "form",
    label: "Form di login",
    html: `<form class="login">
  <h2 class="titolo">Accedi</h2>

  <div class="campo">
    <label>Email</label>
    <input type="email" placeholder="tu@esempio.it">
  </div>

  <div class="campo">
    <label>Password</label>
    <input type="password" placeholder="••••••••">
  </div>

  <div class="azioni">
    <button class="btn">Entra</button>
    <a href="#" class="link">Password dimenticata?</a>
  </div>
</form>`,
    css: `.login {
  width: 300px;
  background: #161628;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: #e8e8f0;
  font-family: sans-serif;
}

.titolo {
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 900;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.campo label {
  font-size: 12px;
  color: #aaa;
}

.campo input {
  background: #282850;
  color: #e8e8f0;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-family: monospace;
}

.azioni {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
}

.btn {
  background: #a78bfa;
  color: #000;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}

.link {
  text-align: center;
  font-size: 12px;
  color: #4ecdc4;
  text-decoration: none;
}
`,
  },
  {
    id: "flex",
    label: "Layout flex",
    html: `<main class="pagina">
  <section class="hero">
    <h1 class="hero-titolo">Benvenuto</h1>
  </section>

  <div class="griglia">
    <div class="box">Uno</div>
    <div class="box">Due</div>
    <div class="box">Tre</div>
  </div>
</main>`,
    css: `.pagina {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  font-family: sans-serif;
}

.hero {
  background: linear-gradient(135deg, #ff6b6b, #f472b6);
  padding: 30px;
  border-radius: 10px;
  color: #fff;
}

.hero-titolo {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
}

.griglia {
  display: flex;
  gap: 12px;
}

.box {
  flex: 1;
  background: #282850;
  color: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
}
`,
  },
];

export const DEFAULT_EXAMPLE = EXAMPLES[0];
