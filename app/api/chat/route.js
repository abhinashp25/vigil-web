import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM = `You are VIGIL — an advanced neural intelligence assistant. You are precise, thoughtful, and genuinely helpful.

LANGUAGE DETECTION (critical — always follow):
- Detect the user's language from their message
- If Hindi (हिंदी) → respond fully in Hindi
- If Odia (ଓଡ଼ିଆ) → respond fully in Odia  
- If English → respond in English
- Mixed languages → match the dominant language
- Never override the user's chosen language

FORMATTING:
- Code → always use triple backtick blocks with language name
- Bold → use **text** for key terms
- Lists → numbered for steps, bullets for items
- Be thorough but concise — no filler text
- Mathematical expressions → use plain text notation`

const MODELS = {
  'llama-3.3-70b-versatile': true,
  'llama-3.1-8b-instant':    true,
  'mixtral-8x7b-32768':      true,
  'gemma2-9b-it':            true,
}

export async function POST(req) {
  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = await req.json()
    const safeModel = MODELS[model] ? model : 'llama-3.3-70b-versatile'

    const encoder = new TextEncoder()
    const stream  = new TransformStream()
    const writer  = stream.writable.getWriter()

    ;(async () => {
      try {
        const completion = await groq.chat.completions.create({
          model: safeModel,
          temperature: 0.7,
          max_tokens: 2048,
          messages: [
            { role: 'system', content: SYSTEM },
            ...messages.map(m => ({ role: m.role, content: m.content }))
          ],
          stream: true,
        })
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) await writer.write(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`))
      } finally {
        await writer.close()
      }
    })()

    return new Response(stream.readable, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}