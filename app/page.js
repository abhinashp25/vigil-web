'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import MessageContent from '../components/MessageContent'
import { uid, formatTime, truncate, exportMarkdown, MODELS, SUGGESTIONS } from '../lib/utils'

/* ─── Animated background grid ──────────────────────────────────────────── */
function GridBackground() {
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden'
    }}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`
          linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)
        `,
        backgroundSize:'40px 40px',
        animation:'gridMove 8s linear infinite',
        maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
      }}/>
      <div style={{ position:'absolute', top:'20%', left:'15%', width:'300px', height:'300px', background:'radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%)', borderRadius:'50%' }}/>
      <div style={{ position:'absolute', bottom:'25%', right:'10%', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', borderRadius:'50%' }}/>
    </div>
  )
}

/* ─── Typing dots ────────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'8px 0' }}>
      {[0,1,2].map(i=>(
        <span key={i} style={{
          width:'8px', height:'8px', borderRadius:'50%', background:'#00d4aa',
          display:'inline-block',
          animation:`dot 1s ease-in-out ${i*0.2}s infinite`
        }}/>
      ))}
      <span style={{ fontSize:'12px', color:'#44445a', marginLeft:'6px', fontFamily:'JetBrains Mono,monospace' }}>
        thinking...
      </span>
    </div>
  )
}

/* ─── Model badge ────────────────────────────────────────────────────────── */
function ModelBadge({ modelId, onChange }) {
  const [open, setOpen] = useState(false)
  const current = MODELS.find(m=>m.id===modelId) || MODELS[0]
  return (
    <div style={{ position:'relative' }}>
      <button onClick={()=>setOpen(!open)} style={{
        display:'flex', alignItems:'center', gap:'6px', padding:'5px 10px',
        background: open ? 'rgba(0,212,170,0.12)' : 'rgba(0,212,170,0.06)',
        border:'1px solid rgba(0,212,170,0.2)',
        borderRadius:'20px', cursor:'pointer', color:'#00d4aa',
        fontSize:'11px', fontFamily:'JetBrains Mono,monospace', fontWeight:500,
        transition:'all 0.15s'
      }}>
        <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00d4aa', animation:'pulse 2s ease-in-out infinite', flexShrink:0 }}/>
        {current.label}
        <span style={{ opacity:.5 }}>▾</span>
      </button>
      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 8px)', right:0, minWidth:'200px',
          background:'#0c0c18', border:'1px solid rgba(0,212,170,0.2)',
          borderRadius:'12px', overflow:'hidden', zIndex:100,
          animation:'popIn 0.15s ease', boxShadow:'0 16px 40px rgba(0,0,0,0.5)'
        }}>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>{onChange(m.id);setOpen(false)}} style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 14px', background: m.id===modelId ? 'rgba(0,212,170,0.08)' : 'transparent',
              border:'none', borderBottom:'1px solid rgba(0,212,170,0.06)',
              cursor:'pointer', color: m.id===modelId ? '#00d4aa' : '#8888aa',
              fontSize:'12px', fontFamily:'JetBrains Mono,monospace',
              transition:'all 0.12s', textAlign:'left'
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(0,212,170,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background=m.id===modelId?'rgba(0,212,170,0.08)':'transparent'}
            >
              <span>{m.label}</span>
              <span style={{ fontSize:'10px', padding:'2px 6px', background:'rgba(0,212,170,0.1)', borderRadius:'10px', color:'#00d4aa' }}>{m.tag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Voice input button ─────────────────────────────────────────────────── */
function VoiceBtn({ onResult, disabled }) {
  const [listening, setListening] = useState(false)
  const recRef = useRef(null)

  const toggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Try Chrome.')
      return
    }
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.onresult = e => { onResult(e.results[0][0].transcript); setListening(false) }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recRef.current = rec
    rec.start()
    setListening(true)
  }

  return (
    <button onClick={toggle} disabled={disabled} title="Voice input" style={{
      width:'32px', height:'32px', flexShrink:0, border:'none', borderRadius:'8px',
      background: listening ? 'rgba(255,68,102,0.15)' : 'rgba(0,212,170,0.06)',
      border: `1px solid ${listening ? 'rgba(255,68,102,0.4)' : 'rgba(0,212,170,0.15)'}`,
      color: listening ? '#ff4466' : '#44445a',
      cursor:disabled?'not-allowed':'pointer', fontSize:'14px',
      display:'flex', alignItems:'center', justifyContent:'center',
      animation: listening ? 'glow 1s ease-in-out infinite' : 'none',
      transition:'all 0.2s'
    }}>
      {listening ? '⏹' : '🎤'}
    </button>
  )
}

/* ─── Single message ─────────────────────────────────────────────────────── */
function Message({ msg, streaming, streamText, onCopy, onStar, starred, isLast, onRegenerate }) {
  const [hovering, setHovering] = useState(false)
  const isUser = msg.role === 'user'
  const text   = streaming ? streamText : msg.content

  return (
    <div
      onMouseEnter={()=>setHovering(true)}
      onMouseLeave={()=>setHovering(false)}
      style={{
        display:'flex', gap:'14px', padding:'20px 24px',
        borderBottom:'1px solid rgba(255,255,255,0.02)',
        background: isUser ? 'transparent' : 'rgba(0,212,170,0.02)',
        animation:'fadeUp 0.2s ease', position:'relative'
      }}
    >
      {/* Avatar */}
      <div style={{
        width:'32px', height:'32px', borderRadius:'10px', flexShrink:0,
        background: isUser
          ? 'linear-gradient(135deg,#1e40af,#3b82f6)'
          : 'linear-gradient(135deg,#00d4aa,#00b894)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'12px', fontWeight:700, color:'#fff', marginTop:'1px',
        fontFamily:'Space Mono,monospace', boxShadow: isUser ? 'none' : '0 0 12px rgba(0,212,170,0.3)'
      }}>
        {isUser ? 'U' : 'V'}
      </div>

      {/* Content */}
      <div style={{ flex:1, minWidth:0, maxWidth:'800px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
          <span style={{
            fontSize:'13px', fontWeight:600, letterSpacing:'0.01em',
            color: isUser ? '#60a5fa' : '#00d4aa',
            fontFamily: 'Space Mono, monospace'
          }}>
            {isUser ? 'you' : 'vigil'}
          </span>
          <span style={{ fontSize:'10px', color:'#22222e', fontFamily:'JetBrains Mono,monospace' }}>
            {formatTime(msg.at)}
          </span>
          {starred && <span style={{ fontSize:'12px' }}>★</span>}
        </div>

        {streaming && !streamText
          ? <TypingDots />
          : <>
              <MessageContent text={text}/>
              {streaming && (
                <span style={{ display:'inline-block', width:'2px', height:'16px', background:'#00d4aa', marginLeft:'2px', verticalAlign:'text-bottom', animation:'blink 0.8s step-end infinite' }}/>
              )}
            </>
        }
      </div>

      {/* Action buttons — appear on hover */}
      {!streaming && hovering && (
        <div style={{
          position:'absolute', top:'14px', right:'20px',
          display:'flex', gap:'4px', animation:'fadeIn 0.15s ease'
        }}>
          {[
            { label:'⎘', title:'Copy', action:()=>onCopy(text) },
            { label:'★', title: starred?'Unstar':'Star', action:()=>onStar(msg.id) },
            ...(!isUser && isLast ? [{ label:'↺', title:'Regenerate', action:onRegenerate }] : [])
          ].map((btn,i)=>(
            <button key={i} onClick={btn.action} title={btn.title} style={{
              background:'rgba(0,212,170,0.08)', border:'1px solid rgba(0,212,170,0.15)',
              color:'#44445a', cursor:'pointer', width:'28px', height:'28px',
              borderRadius:'7px', fontSize:'13px', display:'flex', alignItems:'center',
              justifyContent:'center', transition:'all 0.12s'
            }}
              onMouseEnter={e=>{e.target.style.color='#00d4aa';e.target.style.borderColor='rgba(0,212,170,0.4)'}}
              onMouseLeave={e=>{e.target.style.color='#44445a';e.target.style.borderColor='rgba(0,212,170,0.15)'}}
            >{btn.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Empty / welcome state ──────────────────────────────────────────────── */
function EmptyState({ onSend }) {
  const [hov, setHov] = useState(null)
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'75vh', padding:'40px 24px', textAlign:'center', animation:'fadeIn 0.5s ease' }}>
      {/* Logo mark */}
      <div style={{ position:'relative', marginBottom:'24px' }}>
        <div style={{
          width:'72px', height:'72px', borderRadius:'22px',
          background:'linear-gradient(135deg,rgba(0,212,170,0.15),rgba(0,212,170,0.05))',
          border:'1px solid rgba(0,212,170,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'32px', animation:'glow 3s ease-in-out infinite'
        }}>
          <span style={{ fontFamily:'Space Mono,monospace', fontWeight:700, color:'#00d4aa', fontSize:'28px' }}>V</span>
        </div>
        <div style={{ position:'absolute', bottom:'-4px', right:'-4px', width:'18px', height:'18px', borderRadius:'50%', background:'#00d4aa', border:'2px solid #080810', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#080810' }}/>
        </div>
      </div>

      <h1 style={{ fontSize:'28px', fontWeight:600, color:'#eeeef4', marginBottom:'8px', letterSpacing:'-0.03em' }}>
        Neural intelligence. <span style={{ color:'#00d4aa' }}>Always on.</span>
      </h1>
      <p style={{ fontSize:'14px', color:'#44445a', maxWidth:'380px', lineHeight:'1.7', marginBottom:'36px' }}>
        VIGIL never sleeps. Ask anything — it thinks in real time, streams every token, and remembers this entire session.
      </p>

      {/* Feature pills */}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', marginBottom:'36px' }}>
        {['Multi-model AI','Voice input','Code blocks','Export chat','Star messages'].map((f,i)=>(
          <span key={i} style={{ padding:'4px 12px', background:'rgba(0,212,170,0.06)', border:'1px solid rgba(0,212,170,0.15)', borderRadius:'20px', fontSize:'11.5px', color:'#44445a', fontFamily:'JetBrains Mono,monospace' }}>
            {f}
          </span>
        ))}
      </div>

      {/* Suggestions */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:'10px', maxWidth:'580px', width:'100%' }}>
        {SUGGESTIONS.map((s,i)=>(
          <button key={i} onClick={()=>onSend(s.text)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{
              padding:'14px 16px',
              background: hov===i ? 'rgba(0,212,170,0.08)' : 'rgba(0,212,170,0.03)',
              border:`1px solid ${hov===i ? 'rgba(0,212,170,0.3)' : 'rgba(0,212,170,0.1)'}`,
              borderRadius:'12px', cursor:'pointer', fontSize:'13px',
              textAlign:'left', color: hov===i ? '#00d4aa' : '#8888aa',
              fontFamily:'inherit', lineHeight:'1.55', display:'flex',
              alignItems:'flex-start', gap:'10px', transition:'all 0.15s',
              transform: hov===i ? 'translateY(-2px)' : 'none'
            }}>
            <span style={{ fontSize:'16px', flexShrink:0 }}>{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */
function Sidebar({ convs, activeId, onNew, onSelect, onDelete, onExport, searchQuery, onSearch }) {
  const [hov, setHov] = useState(null)
  const filtered = convs.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <aside style={{ width:'260px', minWidth:'260px', background:'#0a0a16', borderRight:'1px solid rgba(0,212,170,0.1)', display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* Logo */}
      <div style={{ padding:'18px 16px', borderBottom:'1px solid rgba(0,212,170,0.08)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'11px' }}>
          <div style={{ width:'34px', height:'34px', borderRadius:'10px', background:'linear-gradient(135deg,rgba(0,212,170,0.2),rgba(0,212,170,0.08))', border:'1px solid rgba(0,212,170,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Space Mono,monospace', fontWeight:700, fontSize:'16px', color:'#00d4aa', flexShrink:0, boxShadow:'0 0 12px rgba(0,212,170,0.15)' }}>V</div>
          <div>
            <div style={{ fontFamily:'Space Mono,monospace', fontWeight:700, fontSize:'14px', letterSpacing:'0.12em', color:'#eeeef4' }}>VIGIL</div>
            <div style={{ fontSize:'9px', color:'#44445a', letterSpacing:'0.18em', fontFamily:'JetBrains Mono,monospace' }}>NEURAL INTERFACE</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding:'10px 12px', flexShrink:0, borderBottom:'1px solid rgba(0,212,170,0.06)' }}>
        <input
          value={searchQuery} onChange={e=>onSearch(e.target.value)}
          placeholder="Search conversations..."
          style={{ width:'100%', padding:'7px 10px', background:'rgba(0,212,170,0.04)', border:'1px solid rgba(0,212,170,0.12)', borderRadius:'8px', color:'#8888aa', fontSize:'12px', fontFamily:'inherit', outline:'none', transition:'border-color 0.2s' }}
          onFocus={e=>e.target.style.borderColor='rgba(0,212,170,0.3)'}
          onBlur={e=>e.target.style.borderColor='rgba(0,212,170,0.12)'}
        />
      </div>

      {/* New chat */}
      <div style={{ padding:'10px 12px', flexShrink:0 }}>
        <button onClick={onNew}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(0,212,170,0.15)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(0,212,170,0.08)'}
          style={{ width:'100%', padding:'9px 13px', background:'rgba(0,212,170,0.08)', border:'1px solid rgba(0,212,170,0.2)', borderRadius:'10px', color:'#00d4aa', cursor:'pointer', fontSize:'12.5px', fontWeight:500, fontFamily:'inherit', display:'flex', alignItems:'center', gap:'8px', transition:'all 0.15s' }}>
          <span style={{ fontSize:'18px', lineHeight:1 }}>＋</span> New conversation
        </button>
      </div>

      {/* Conversation list */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 8px' }}>
        {filtered.length===0 && (
          <div style={{ padding:'24px 12px', textAlign:'center', color:'#22222e', fontSize:'12px', lineHeight:1.8 }}>
            <div style={{ fontSize:'20px', marginBottom:'6px', opacity:.3 }}>💬</div>
            {searchQuery ? 'No results' : 'No conversations yet'}
          </div>
        )}
        {filtered.map(c=>(
          <div key={c.id}
            onClick={()=>onSelect(c.id)}
            onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
            style={{ display:'flex', alignItems:'center', gap:'8px', padding:'9px 8px', borderRadius:'8px', cursor:'pointer', marginBottom:'2px', background:c.id===activeId?'rgba(0,212,170,0.1)':hov===c.id?'rgba(255,255,255,0.03)':'transparent', border:`1px solid ${c.id===activeId?'rgba(0,212,170,0.25)':'transparent'}`, transition:'all 0.12s' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', flexShrink:0, background:c.id===activeId?'#00d4aa':'#22222e', transition:'background 0.2s' }}/>
            <span style={{ flex:1, fontSize:'12.5px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:c.id===activeId?'#6ee7cc':'#44445a', fontFamily:'inherit' }}>
              {truncate(c.title,30)}
            </span>
            <div style={{ display:'flex', gap:'3px', opacity: hov===c.id?1:0, transition:'opacity 0.12s' }}>
              <button onClick={e=>{e.stopPropagation();onExport(c.id)}} title="Export" style={{ background:'none', border:'none', color:'#44445a', cursor:'pointer', fontSize:'11px', padding:'2px 4px', borderRadius:'4px' }}
                onMouseEnter={e=>e.target.style.color='#00d4aa'} onMouseLeave={e=>e.target.style.color='#44445a'}>⎘</button>
              <button onClick={e=>{e.stopPropagation();onDelete(c.id)}} style={{ background:'none', border:'none', color:'#44445a', cursor:'pointer', fontSize:'11px', padding:'2px 4px', borderRadius:'4px' }}
                onMouseEnter={e=>e.target.style.color='#ff4466'} onMouseLeave={e=>e.target.style.color='#44445a'}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding:'10px 16px', borderTop:'1px solid rgba(0,212,170,0.08)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00d4aa', animation:'pulse 2s ease-in-out infinite' }}/>
          <span style={{ fontSize:'11px', color:'#44445a', fontFamily:'JetBrains Mono,monospace' }}>system operational</span>
        </div>
        <div style={{ fontSize:'10px', color:'#22222e', fontFamily:'JetBrains Mono,monospace' }}>
          {convs.length} session{convs.length!==1?'s':''} · free forever
        </div>
      </div>
    </aside>
  )
}

/* ─── Toast notification ─────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null
  return (
    <div style={{ position:'fixed', bottom:'90px', left:'50%', transform:'translateX(-50%)', padding:'10px 20px', background:'rgba(0,212,170,0.15)', border:'1px solid rgba(0,212,170,0.3)', borderRadius:'20px', fontSize:'13px', color:'#00d4aa', zIndex:1000, animation:'fadeUp 0.2s ease', backdropFilter:'blur(10px)', fontFamily:'JetBrains Mono,monospace' }}>
      {msg}
    </div>
  )
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function Home() {
  const [convs,      setConvs]    = useState([])
  const [activeId,   setActiveId] = useState(null)
  const [input,      setInput]    = useState('')
  const [busy,       setBusy]     = useState(false)
  const [streamText, setStream]   = useState('')
  const [sidebarOn,  setSidebar]  = useState(true)
  const [model,      setModel]    = useState('llama-3.3-70b-versatile')
  const [starred,    setStarred]  = useState({})
  const [toast,      setToast]    = useState(null)
  const [search,     setSearch]   = useState('')
  const [charCount,  setCharCount]= useState(0)

  const endRef   = useRef(null)
  const taRef    = useRef(null)
  const abortRef = useRef(null)

  const active = convs.find(c=>c.id===activeId)
  const msgs   = active?.messages || []

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2000) }

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs,streamText])

  useEffect(()=>{
    if(taRef.current){
      taRef.current.style.height='auto'
      taRef.current.style.height=Math.min(taRef.current.scrollHeight,200)+'px'
    }
    setCharCount(input.length)
  },[input])

  const newConv = useCallback(()=>{
    const id=uid()
    setConvs(p=>[{id,title:'New conversation',messages:[],at:new Date()},...p])
    setActiveId(id); setInput('')
  },[])

  const deleteConv = useCallback(id=>{
    setConvs(p=>p.filter(c=>c.id!==id))
    if(activeId===id) setActiveId(null)
  },[activeId])

  const exportConv = useCallback(id=>{
    const conv = convs.find(c=>c.id===id)
    exportMarkdown(conv)
    showToast('Exported as markdown')
  },[convs])

  const copyMessage = useCallback(async(text)=>{
    try { await navigator.clipboard.writeText(text) } catch(_) {}
    showToast('Copied to clipboard')
  },[])

  const toggleStar = useCallback(msgId=>{
    setStarred(p=>({...p,[msgId]:!p[msgId]}))
    showToast(starred[msgId] ? 'Unstarred' : 'Starred')
  },[starred])

  const send = useCallback(async(override)=>{
    const text=(override||input).trim()
    if(!text||busy) return
    setInput(''); setBusy(true); setStream('')

    let cid=activeId, prev=active?.messages||[]
    if(!cid){
      cid=uid(); prev=[]
      const title=text.length>46?text.slice(0,46)+'…':text
      setConvs(p=>[{id:cid,title,messages:[],at:new Date()},...p])
      setActiveId(cid)
    }

    const userMsg  = {role:'user',content:text,id:uid(),at:new Date()}
    const nextMsgs = [...prev,userMsg]
    setConvs(p=>p.map(c=>c.id===cid?{
      ...c,
      title:prev.length===0?(text.length>46?text.slice(0,46)+'…':text):c.title,
      messages:nextMsgs
    }:c))

    abortRef.current=new AbortController()
    let acc=''
    try {
      const res=await fetch('/api/chat',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:nextMsgs,model}),
        signal:abortRef.current.signal
      })
      if(!res.ok) throw new Error(`API error ${res.status}`)
      const reader=res.body.getReader(), dec=new TextDecoder()
      while(true){
        const {done,value}=await reader.read()
        if(done) break
        for(const line of dec.decode(value,{stream:true}).split('\n')){
          if(!line.startsWith('data: ')) continue
          const d=line.slice(6).trim()
          if(d==='[DONE]') break
          try{const p=JSON.parse(d);if(p.text){acc+=p.text;setStream(acc)}}catch(_){}
        }
      }
    } catch(err){
      if(err.name!=='AbortError'){acc=`Error: ${err.message}`;setStream(acc)}
    }

    setConvs(p=>p.map(c=>c.id===cid?{...c,messages:[...nextMsgs,{role:'assistant',content:acc||'(no response)',id:uid(),at:new Date()}]}:c))
    setStream(''); setBusy(false)
  },[input,busy,activeId,active,model])

  const regenerate = useCallback(async()=>{
    if(!active||busy) return
    const lastUserIdx=[...active.messages].reverse().findIndex(m=>m.role==='user')
    if(lastUserIdx===-1) return
    const realIdx=active.messages.length-1-lastUserIdx
    const trimmed=active.messages.slice(0,realIdx+1)
    setConvs(p=>p.map(c=>c.id===activeId?{...c,messages:trimmed}:c))
    const lastUser=trimmed[trimmed.length-1]
    setInput(lastUser.content)
    setTimeout(()=>send(lastUser.content),50)
  },[active,busy,activeId,send])

  const onKey = e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }
  const canSend = input.trim().length>0&&!busy

  return (
    <div style={{ display:'flex', height:'100dvh', background:'#080810', overflow:'hidden', position:'relative' }}>
      <GridBackground/>

      {/* Sidebar */}
      <div style={{ width:sidebarOn?'260px':'0', minWidth:sidebarOn?'260px':'0', overflow:'hidden', transition:'all 0.25s ease', flexShrink:0, position:'relative', zIndex:10 }}>
        <Sidebar
          convs={convs} activeId={activeId}
          onNew={newConv} onSelect={setActiveId}
          onDelete={deleteConv} onExport={exportConv}
          searchQuery={search} onSearch={setSearch}
        />
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0, position:'relative', zIndex:5 }}>

        {/* Header */}
        <header style={{ height:'54px', borderBottom:'1px solid rgba(0,212,170,0.1)', display:'flex', alignItems:'center', padding:'0 20px', gap:'12px', background:'rgba(8,8,16,0.9)', flexShrink:0, backdropFilter:'blur(20px)' }}>
          <button onClick={()=>setSidebar(!sidebarOn)}
            onMouseEnter={e=>e.target.style.color='#00d4aa'}
            onMouseLeave={e=>e.target.style.color='#22222e'}
            style={{ background:'none', border:'none', color:'#22222e', cursor:'pointer', padding:'6px', borderRadius:'7px', fontSize:'18px', lineHeight:1, transition:'color 0.15s' }}>
            ☰
          </button>

          {!sidebarOn&&(
            <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg,rgba(0,212,170,0.2),rgba(0,212,170,0.08))', border:'1px solid rgba(0,212,170,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Space Mono,monospace', fontWeight:700, fontSize:'13px', color:'#00d4aa' }}>V</div>
              <span style={{ fontFamily:'Space Mono,monospace', fontWeight:700, fontSize:'13px', letterSpacing:'0.1em', color:'#eeeef4' }}>VIGIL</span>
            </div>
          )}

          <div style={{ flex:1, display:'flex', justifyContent:'center' }}>
            {active&&<span style={{ fontSize:'13px', color:'#22222e', fontFamily:'JetBrains Mono,monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'400px' }}>{active.title}</span>}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
            <ModelBadge modelId={model} onChange={setModel}/>

            {active&&(
              <button onClick={()=>exportConv(activeId)} title="Export chat" style={{ background:'rgba(0,212,170,0.06)', border:'1px solid rgba(0,212,170,0.12)', color:'#44445a', cursor:'pointer', fontSize:'13px', padding:'5px 10px', borderRadius:'20px', fontFamily:'inherit', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.color='#00d4aa';e.currentTarget.style.borderColor='rgba(0,212,170,0.3)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='#44445a';e.currentTarget.style.borderColor='rgba(0,212,170,0.12)'}}>
                ⎘ export
              </button>
            )}

            {busy&&<button onClick={()=>abortRef.current?.abort()} style={{ background:'rgba(255,68,102,0.08)', border:'1px solid rgba(255,68,102,0.25)', color:'#ff4466', cursor:'pointer', fontSize:'11.5px', padding:'5px 12px', borderRadius:'20px', fontFamily:'inherit' }}>◼ stop</button>}

            <div style={{ display:'flex', alignItems:'center', gap:'5px', padding:'4px 10px', background:'rgba(0,212,170,0.06)', border:'1px solid rgba(0,212,170,0.15)', borderRadius:'20px' }}>
              <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00d4aa', animation:'pulse 2s ease-in-out infinite' }}/>
              <span style={{ fontSize:'10.5px', color:'#00d4aa', letterSpacing:'0.08em', fontFamily:'JetBrains Mono,monospace', fontWeight:500 }}>LIVE</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {msgs.length===0&&!busy&&<EmptyState onSend={send}/>}

          {msgs.map((msg,i)=>(
            <Message key={msg.id} msg={msg}
              streaming={false} streamText=""
              onCopy={copyMessage} onStar={toggleStar}
              starred={!!starred[msg.id]}
              isLast={i===msgs.length-1}
              onRegenerate={regenerate}
            />
          ))}

          {busy&&<Message
            msg={{role:'assistant',content:'',id:'__stream__',at:new Date()}}
            streaming={true} streamText={streamText}
            onCopy={()=>{}} onStar={()=>{}} starred={false} isLast={true} onRegenerate={()=>{}}
          />}

          <div ref={endRef} style={{height:'24px'}}/>
        </div>

        {/* Input area */}
        <div style={{ padding:'12px 20px 20px', background:'rgba(8,8,16,0.95)', borderTop:'1px solid rgba(0,212,170,0.08)', flexShrink:0, backdropFilter:'blur(20px)' }}>
          <div style={{ maxWidth:'820px', margin:'0 auto' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', background:'rgba(0,212,170,0.04)', border:'1px solid rgba(0,212,170,0.15)', borderRadius:'16px', padding:'10px 12px', transition:'border-color 0.2s' }}
              onFocusCapture={e=>e.currentTarget.style.borderColor='rgba(0,212,170,0.35)'}
              onBlurCapture={e=>e.currentTarget.style.borderColor='rgba(0,212,170,0.15)'}
            >
              <VoiceBtn onResult={t=>{setInput(p=>p?p+' '+t:t)}} disabled={busy}/>

              <textarea ref={taRef} value={input}
                onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                placeholder="Message VIGIL…  (Enter ↵ to send, Shift+Enter for new line)"
                disabled={busy} rows={1}
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'#eeeef4', fontSize:'14.5px', lineHeight:'1.65', resize:'none', fontFamily:'inherit', padding:0, maxHeight:'200px', overflowY:'auto', opacity:busy?0.5:1 }}
              />

              <div style={{ display:'flex', alignItems:'center', gap:'6px', flexShrink:0 }}>
                {input.length>0&&<span style={{ fontSize:'10px', color:'#22222e', fontFamily:'JetBrains Mono,monospace', minWidth:'24px', textAlign:'right' }}>{charCount}</span>}
                <button onClick={()=>send()} disabled={!canSend} style={{
                  width:'36px', height:'36px', border:'none', borderRadius:'10px',
                  cursor:canSend?'pointer':'not-allowed',
                  background:canSend?'linear-gradient(135deg,#00d4aa,#00b894)':'rgba(0,212,170,0.06)',
                  color:canSend?'#080810':'#22222e', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'16px', transition:'all 0.18s',
                  boxShadow:canSend?'0 0 16px rgba(0,212,170,0.3)':'none',
                  transform:canSend?'scale(1)':'scale(0.95)'
                }}>
                  {busy
                    ? <span style={{ width:'14px', height:'14px', border:'2px solid rgba(8,8,16,0.3)', borderTopColor:'#080810', borderRadius:'50%', display:'block', animation:'spin 0.7s linear infinite' }}/>
                    : '↑'
                  }
                </button>
              </div>
            </div>

            <div style={{ textAlign:'center', marginTop:'8px', fontSize:'10.5px', color:'#22222e', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.06em' }}>
              vigil · neural interface · built from scratch · always alive
            </div>
          </div>
        </div>
      </div>

      <Toast msg={toast}/>
    </div>
  )
}