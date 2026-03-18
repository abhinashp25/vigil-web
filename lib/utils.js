export function uid() { return Math.random().toString(36).slice(2,9) }

export function formatTime(date) {
  return new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit'})
    .format(date instanceof Date ? date : new Date(date))
}

export function truncate(str, n=44) {
  return str.length > n ? str.slice(0,n)+'…' : str
}

export function parseContent(text) {
  const parts=[], re=/```(\w*)\n?([\s\S]*?)```/g
  let last=0, m
  while((m=re.exec(text))!==null){
    if(m.index>last) parts.push({type:'text',value:text.slice(last,m.index)})
    parts.push({type:'code',lang:m[1]||'text',value:m[2].trim()})
    last=m.index+m[0].length
  }
  if(last<text.length) parts.push({type:'text',value:text.slice(last)})
  if(!parts.length) parts.push({type:'text',value:text})
  return parts
}

export function parseBold(text) {
  const segs=[], re=/\*\*(.*?)\*\*/g
  let last=0, m
  while((m=re.exec(text))!==null){
    if(m.index>last) segs.push({bold:false,text:text.slice(last,m.index)})
    segs.push({bold:true,text:m[1]})
    last=m.index+m[0].length
  }
  if(last<text.length) segs.push({bold:false,text:text.slice(last)})
  return segs
}

export function exportMarkdown(conv) {
  if (!conv) return
  const lines = [`# ${conv.title}\n`, `*Exported from VIGIL — ${new Date().toLocaleString()}*\n\n---\n`]
  for (const m of conv.messages) {
    lines.push(`### ${m.role === 'user' ? 'You' : 'VIGIL'}\n`)
    lines.push(m.content + '\n\n')
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `vigil-${conv.id}.md`
  a.click()
}

export const MODELS = [
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', tag: 'best' },
  { id: 'llama-3.1-8b-instant',    label: 'Llama 3.1 8B',  tag: 'fast' },
  { id: 'mixtral-8x7b-32768',      label: 'Mixtral 8x7B',  tag: 'long' },
  { id: 'gemma2-9b-it',            label: 'Gemma 2 9B',    tag: 'lite' },
]

export const SUGGESTIONS = [
  { icon: '⚡', text: 'Explain how transformer attention works' },
  { icon: '🔨', text: 'Build a REST API with Python FastAPI' },
  { icon: '💡', text: 'Give me 10 futuristic startup ideas' },
  { icon: '🧠', text: 'What makes a neural network learn?' },
  { icon: '📄', text: 'Write a cold email that actually converts' },
  { icon: '🚀', text: 'How do I deploy this to production?' },
]