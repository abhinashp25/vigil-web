export const uid = () => Math.random().toString(36).slice(2, 9)

export const formatTime = d =>
  new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' })
    .format(d instanceof Date ? d : new Date(d))

export const formatDate = d => {
  const dt = d instanceof Date ? d : new Date(d)
  const today = new Date()
  if (dt.toDateString() === today.toDateString()) return 'Today'
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  if (dt.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return dt.toLocaleDateString('en', { month: 'short', day: 'numeric' })
}

export const truncate = (s, n = 38) => s.length > n ? s.slice(0, n) + '…' : s

export function parseContent(text) {
  const parts = [], re = /```(\w*)\n?([\s\S]*?)```/g
  let last = 0, m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) })
    parts.push({ type: 'code', lang: m[1] || 'text', value: m[2].trim() })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  if (!parts.length) parts.push({ type: 'text', value: text })
  return parts
}

export function parseBold(text) {
  const segs = [], re = /\*\*(.*?)\*\*/g
  let last = 0, m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push({ bold: false, text: text.slice(last, m.index) })
    segs.push({ bold: true, text: m[1] })
    last = m.index + m[0].length
  }
  if (last < text.length) segs.push({ bold: false, text: text.slice(last) })
  return segs
}

export function exportMarkdown(conv) {
  if (!conv) return
  const md = [
    `# ${conv.title}\n`,
    `*Exported from VIGIL — ${new Date().toLocaleString()}*\n\n---\n\n`,
    ...conv.messages.map(m => `### ${m.role === 'user' ? 'You' : 'VIGIL'}\n${m.content}\n\n`)
  ].join('')
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([md], { type: 'text/markdown' })),
    download: `vigil-${conv.id}.md`
  })
  a.click(); URL.revokeObjectURL(a.href)
}

export const VOICE_LANGS = [
  { code: 'en-US', label: 'English',  flag: '🇺🇸' },
  { code: 'hi-IN', label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'or-IN', label: 'ଓଡ଼ିଆ',    flag: '🏳️'  },
]

export const MODELS = [
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', badge: 'smart'  },
  { id: 'llama-3.1-8b-instant',    label: 'Llama 3.1 8B',  badge: 'fast'   },
  { id: 'mixtral-8x7b-32768',      label: 'Mixtral 8×7B',  badge: '32k ctx'},
  { id: 'gemma2-9b-it',            label: 'Gemma 2 9B',    badge: 'lite'   },
]

export const SUGGESTIONS = [
  { icon: '✦', text: 'What can you help me with today?' },
  { icon: '⌨', text: 'Write a Python web scraper' },
  { icon: '💬', text: 'आप मुझे क्या सिखा सकते हैं?' },
  { icon: '📖', text: 'ମୋତେ AI ବିଷୟରେ ବୁଝାଅ' },
  { icon: '◈', text: 'Explain transformers simply' },
  { icon: '→', text: 'Help me debug my code' },
]