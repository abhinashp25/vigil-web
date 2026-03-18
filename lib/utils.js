export const uid = () => Math.random().toString(36).slice(2,9)
export const fmtTime = d => new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit'}).format(d instanceof Date?d:new Date(d))
export const fmtDate = d => {
  const dt = d instanceof Date?d:new Date(d), t=new Date()
  if(dt.toDateString()===t.toDateString()) return 'Today'
  const y=new Date(t); y.setDate(t.getDate()-1)
  if(dt.toDateString()===y.toDateString()) return 'Yesterday'
  return dt.toLocaleDateString('en',{month:'short',day:'numeric'})
}
export const trunc = (s,n=36) => s.length>n?s.slice(0,n)+'…':s

export function parseContent(text) {
  const parts=[],re=/```(\w*)\n?([\s\S]*?)```/g
  let last=0,m
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
  const segs=[],re=/\*\*(.*?)\*\*/g
  let last=0,m
  while((m=re.exec(text))!==null){
    if(m.index>last) segs.push({b:false,t:text.slice(last,m.index)})
    segs.push({b:true,t:m[1]})
    last=m.index+m[0].length
  }
  if(last<text.length) segs.push({b:false,t:text.slice(last)})
  return segs
}

export function exportMd(conv) {
  if(!conv)return
  const md=['# '+conv.title+'\n\n*VIGIL Export — '+new Date().toLocaleString()+'*\n\n---\n\n',
    ...conv.messages.map(m=>`### ${m.role==='user'?'You':'VIGIL'}\n${m.content}\n\n`)].join('')
  const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(new Blob([md],{type:'text/markdown'})),download:`vigil-${conv.id}.md`})
  a.click();URL.revokeObjectURL(a.href)
}

export const VOICE_LANGS = [
  {code:'en-US',label:'English',flag:'🇺🇸'},
  {code:'hi-IN',label:'हिंदी',  flag:'🇮🇳'},
  {code:'bn-IN',label:'Bengali', flag:'🇮🇳'},
  {code:'te-IN',label:'Telugu',  flag:'🇮🇳'},
]

export const MODELS = [
  {id:'llama-3.3-70b-versatile',label:'Llama 3.3 70B',badge:'best'},
  {id:'llama-3.1-8b-instant',   label:'Llama 3.1 8B', badge:'fast'},
  {id:'mixtral-8x7b-32768',     label:'Mixtral 8×7B', badge:'32k'},
  {id:'gemma2-9b-it',           label:'Gemma 2 9B',   badge:'lite'},
]

export const SUGGESTIONS = [
  {icon:'✦',text:'What can you help me with?'},
  {icon:'⌨',text:'Write a Python web scraper'},
  {icon:'💬',text:'आप मुझे क्या सिखा सकते हैं?'},
  {icon:'⚡',text:'Explain neural networks simply'},
  {icon:'→',text:'Help me debug my code'},
  {icon:'◈',text:'Give me 10 startup ideas'},
]

// Nav sections — like ChatGPT sidebar
export const NAV_SECTIONS = [
  {id:'chats',    icon:'💬', label:'Chats'},
  {id:'starred',  icon:'★',  label:'Starred'},
  {id:'projects', icon:'◫',  label:'Projects'},
]