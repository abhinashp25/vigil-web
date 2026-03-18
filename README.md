<div align="center">

```
██╗   ██╗██╗ ██████╗ ██╗██╗
██║   ██║██║██╔════╝ ██║██║
██║   ██║██║██║  ███╗██║██║
╚██╗ ██╔╝██║██║   ██║██║██║
 ╚████╔╝ ██║╚██████╔╝██║███████╗
  ╚═══╝  ╚═╝ ╚═════╝ ╚═╝╚══════╝
```

**Neural intelligence. Always on.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-Free_API-orange?style=flat-square)](https://console.groq.com)
[![Llama](https://img.shields.io/badge/Llama_3.3-70B-blue?style=flat-square)](https://ai.meta.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Made with](https://img.shields.io/badge/Made_with-pure_JavaScript-yellow?style=flat-square)]()

[Live Demo](#) · [Report Bug](https://github.com/abhinashp25/vigil-web/issues) · [Request Feature](https://github.com/abhinashp25/vigil-web/issues)

<br/>

![VIGIL Screenshot](https://raw.githubusercontent.com/abhinashp25/vigil-web/main/public/preview.png)

</div>

---

## What is VIGIL?

VIGIL is a full-stack AI chat application built entirely from scratch — no UI libraries, no component kits, no templates. Every pixel was hand-coded. It runs on the Groq API (completely free) and streams responses in real time using Llama 3.3 70B, one of the most capable open models available.

This project started as an experiment to understand how AI chat products like ChatGPT and Gemini actually work under the hood — then evolved into something production-ready.

---

## Features

### Core
- **Real-time streaming** — token-by-token response streaming via Server-Sent Events
- **4 AI models** — switch between Llama 3.3 70B, Llama 3.1 8B, Mixtral 8×7B, and Gemma 2 9B
- **Multilingual** — automatically detects and responds in English, हिंदी, or any language you write in
- **Voice input** — speak your message in English or Hindi with language selector
- **Temperature control** — adjust model creativity from the settings panel

### Interface
- **Glassmorphism UI** — animated aurora background with liquid glass panels
- **ChatGPT-style sidebar** — Chats, Starred, and Projects sections with SVG icons
- **Conversation search** — filter history instantly
- **Date grouping** — Today, Yesterday, and older conversations grouped automatically
- **Code blocks** — syntax highlighting with line numbers and one-click copy
- **Message actions** — copy, star, and regenerate any message on hover
- **Export chat** — download any conversation as a Markdown file
- **Settings panel** — model picker and temperature slider in a glass modal
- **Stop generation** — cancel a response mid-stream
- **Character counter** — live count for long messages
- **Toast notifications** — subtle feedback for every action

### Technical
- No external UI dependencies — pure React with inline styles
- Server-side streaming with `TransformStream` and `ReadableStream`
- Automatic language detection via system prompt
- Proper SSR guards for browser-only APIs (SpeechRecognition)
- Atomic saves — no data loss on checkpoint

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| AI Provider | [Groq Cloud](https://console.groq.com) — free tier |
| Primary Model | Llama 3.3 70B Versatile |
| Styling | Pure CSS + inline styles (zero UI libraries) |
| Fonts | Inter + JetBrains Mono |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 18+
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/abhinashp25/vigil-web.git
cd vigil-web

# Install dependencies
npm install

# Create your environment file
echo "GROQ_API_KEY=your_key_here" > .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — VIGIL is running.

### Getting a free API key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with Google or GitHub — no credit card required
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`) into `.env.local`

---

## Project structure

```
vigil-web/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js          # Streaming API route (Groq integration)
│   ├── globals.css               # Design system — CSS variables + animations
│   ├── layout.js                 # Root layout + metadata
│   └── page.js                   # Full application (Aurora, Sidebar, Chat, Input)
│
├── components/
│   ├── CodeBlock.js              # Syntax highlighted code with line numbers
│   └── MessageContent.js        # Markdown renderer (bold, lists, headings, code)
│
├── lib/
│   └── utils.js                  # Helpers — uid, formatTime, parsers, constants
│
├── .env.local                    # Your API key (never committed)
├── .gitignore                    # Comprehensive ignore rules
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

---

## Deployment

### Deploy to Vercel (recommended — free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# When prompted, add your environment variable:
# GROQ_API_KEY = gsk_your_key_here
```

Your app will be live at `https://your-project.vercel.app`

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com | ✅ Yes |

---

## Available models

| Model | Best for | Context |
|---|---|---|
| `llama-3.3-70b-versatile` | Complex reasoning, best quality | 128k |
| `llama-3.1-8b-instant` | Fast responses, simple tasks | 128k |
| `mixtral-8x7b-32768` | Long documents, large context | 32k |
| `gemma2-9b-it` | Lightweight, efficient | 8k |

All models are **completely free** via Groq.

---

## Voice input

Voice input uses the browser's built-in Web Speech API.

| Browser | Support |
|---|---|
| Chrome | ✅ Full support |
| Edge | ✅ Full support |
| Safari | ⚠️ Partial |
| Firefox | ❌ Not supported |

**Supported voice languages:**
- 🇺🇸 English (`en-US`)
- 🇮🇳 Hindi (`hi-IN`)
- 🇮🇳 Bengali (`bn-IN`)
- 🇮🇳 Telugu (`te-IN`)

---

## Roadmap

- [ ] Persistent conversations (localStorage or database)
- [ ] Image upload and vision models
- [ ] Custom system prompt editor
- [ ] PWA support (offline capable)
- [ ] Multi-agent DNA exchange (VIGIL × VIGIL)
- [ ] Web search integration
- [ ] Mobile app (React Native)

---

## The origin story

This project grew out of studying [@karpathy's microgpt](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95) — a complete transformer in 200 lines of pure Python. Understanding how language models work from the autograd engine upward made building the interface feel natural. VIGIL the chat app is the frontend face of VIGIL the training engine.

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'add amazing feature'

# Push and open a PR
git push origin feature/amazing-feature
```

---

## License

MIT — do whatever you want with this.

---

<div align="center">

Built by [Abhinash Pradhan](https://github.com/abhinashp25)

⭐ Star this repo if it helped you understand how AI products are built

</div>