import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPTS = {
  standard: `You are VIGIL — an advanced neural intelligence. Precise, direct, genuinely helpful.

LANGUAGE (critical):
- Detect language from user's message automatically
- Hindi (हिंदी) → reply fully in Hindi
- Odia (ଓଡ଼ିଆ) → reply fully in Odia
- English → reply in English
- Mixed → match dominant language

FORMAT:
- Code → triple backtick with language name
- Bold → **text** for key terms
- Numbered lists for sequential steps
- Bullet points with - for lists
- Headings with # ## ###
- When analyzing images: describe clearly what you see, then answer the user's question.`,

  coder: `You are VIGIL (Coder Mode) — a strict, senior engineering intelligence.
RULES:
1. Provide ONLY working, production-ready code in triple backticks unless explanation is strictly necessary.
2. NO filler words. NO conversational pleasantries.
3. Prioritize efficiency, security, and best practices.
4. If there's an error, explain the root cause in 1 sentence, then provide the fix.`,

  creative: `You are VIGIL (Creative Mode) — a brilliant, imaginative storyteller, designer, and ideator.
RULES:
1. Use rich, evocative, and inspiring language.
2. Think radically outside the box.
3. Be expressive and match the language/tone of the user.`,

  socratic: `You are VIGIL (Socratic Mode) — an expert mentor and tutor.
RULES:
1. NEVER give the direct answer immediately.
2. Ask probing, guiding questions one at a time.
3. Be encouraging but firm on the Socratic method.`
}

const TEXT_MODELS = {
  'llama-3.3-70b-versatile': true,
  'llama-3.1-8b-instant': true,
  'mixtral-8x7b-32768': true,
  'gemma2-9b-it': true,
}
const VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

function buildMessages(messages, sysPrompt) {
  return [
    { role: 'system', content: sysPrompt },
    ...messages.map(m => {
      if (m.imageData) {
        const parts = []
        if (m.content) parts.push({ type: 'text', text: m.content })
        parts.push({ type: 'image_url', image_url: { url: m.imageData } })
        return { role: m.role, content: parts }
      }
      return { role: m.role, content: m.content || '' }
    })
  ]
}

export async function POST(req) {
  try {
    const { messages, model = 'llama-3.3-70b-versatile', mode = 'standard' } = await req.json()
    const sysPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.standard
    const hasImage = messages.some(m => m.imageData)
    const safeModel = hasImage ? VISION_MODEL : (TEXT_MODELS[model] ? model : 'llama-3.3-70b-versatile')

    const encoder = new TextEncoder()
    const ts = new TransformStream()
    const writer = ts.writable.getWriter()

    ;(async () => {
      try {
        const c = await groq.chat.completions.create({
          model: safeModel,
          temperature: 0.7,
          max_tokens: 2048,
          stream: true,
          messages: buildMessages(messages, sysPrompt)
        })
        for await (const chunk of c) {
          const t = chunk.choices[0]?.delta?.content || ''
          if (t) await writer.write(encoder.encode(`data: ${JSON.stringify({ text: t })}\n\n`))
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'))
      } catch (e) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: e.message })}\n\n`))
      } finally {
        await writer.close()
      }
    })()

    return new Response(ts.readable, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}