@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Alexandria", "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Outfit", ui-monospace, SFMono-Regular, monospace;
}

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --accent: #2563eb;
}

body {
  font-family: var(--font-sans);
  direction: rtl;
  background-color: var(--background);
  color: var(--foreground);
  overflow-x: hidden;
  margin: 0;
}

.text-gradient {
  background: linear-gradient(to bottom right, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #f8fafc;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
