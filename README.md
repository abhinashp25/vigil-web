# VIGIL — Neural Intelligence Interface

> AI that never sleeps. Understands English, हिंदी & ଓଡ଼ିଆ.

Built from scratch. No templates. No copied UI.

## Features

- Real-time AI streaming responses
- Multilingual — English, Hindi, Odia auto-detected
- Voice input with language selection
- 4 AI models — switch anytime
- Code blocks with line numbers and copy button
- Export conversations as markdown
- Star and copy any message
- Regenerate last response
- Search conversation history

## Tech Stack

- Next.js 14 (App Router)
- Groq API (free, fastest inference)
- Llama 3.3 70B model
- Pure CSS — no Tailwind, no UI libraries
- Zero external UI dependencies

## Run locally
```bash
npm install
echo "GROQ_API_KEY=your_key_here" > .env.local
npm run dev
```

Get a free API key at [console.groq.com](https://console.groq.com)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

*Built by Abhinash Pradhan*