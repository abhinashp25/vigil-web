import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM = `You are VIGIL — an advanced neural intelligence. Precise, direct, genuinely helpful.

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
- Headings with # ## ###`

const MODELS = {
  'llama-3.3-70b-versatile':true,'llama-3.1-8b-instant':true,
  'mixtral-8x7b-32768':true,'gemma2-9b-it':true,
}

export async function POST(req) {
  try {
    const { messages, model='llama-3.3-70b-versatile' } = await req.json()
    const safeModel = MODELS[model] ? model : 'llama-3.3-70b-versatile'
    const encoder = new TextEncoder()
    const ts = new TransformStream()
    const writer = ts.writable.getWriter()
    ;(async()=>{
      try {
        const c = await groq.chat.completions.create({
          model:safeModel, temperature:0.7, max_tokens:2048, stream:true,
          messages:[{role:'system',content:SYSTEM},...messages.map(m=>({role:m.role,content:m.content}))]
        })
        for await (const chunk of c) {
          const t=chunk.choices[0]?.delta?.content||''
          if(t) await writer.write(encoder.encode(`data: ${JSON.stringify({text:t})}\n\n`))
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'))
      } catch(e) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({error:e.message})}\n\n`))
      } finally { await writer.close() }
    })()
    return new Response(ts.readable,{headers:{'Content-Type':'text/event-stream','Cache-Control':'no-cache'}})
  } catch(e) {
    return new Response(JSON.stringify({error:e.message}),{status:500})
  }
}