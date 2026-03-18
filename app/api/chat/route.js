import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM = `You are VIGIL — a next-generation neural intelligence. You are precise, direct, and genuinely helpful.

Rules:
- Use triple backtick code blocks with language name for ALL code
- Use **bold** for key terms
- Use numbered lists for steps
- Be concise but complete — never pad responses
- When you don't know something, say so directly`

const MODELS = {
  'llama-3.3-70b-versatile':   'Llama 3.3 70B',
  'llama-3.1-8b-instant':      'Llama 3.1 8B',
  'mixtral-8x7b-32768':        'Mixtral 8x7B',
  'gemma2-9b-it':              'Gemma 2 9B',
}

export async function POST(request) {
  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = await request.json()
    const safeModel = MODELS[model] ? model : 'llama-3.3-70b-versatile'

    const encoder = new TextEncoder()
    const stream  = new TransformStream()
    const writer  = stream.writable.getWriter()

    ;(async () => {
      try {
        const completion = await groq.chat.completions.create({
          model:      safeModel,
          messages:   [
            { role: 'system', content: SYSTEM },
            ...messages.map(m => ({ role: m.role, content: m.content }))
          ],
          stream:     true,
          max_tokens: 2048,
          temperature: 0.7,
        })

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            await writer.write(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
          }
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