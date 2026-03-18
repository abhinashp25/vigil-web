'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import MessageContent from '../components/MessageContent'
import { uid, formatTime, formatDate, truncate, exportMarkdown, MODELS, SUGGESTIONS, VOICE_LANGS } from '../lib/utils'

/* ── Aurora background ───────────────────────────────────────────────────── */
function Aurora() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      {/* Dark base */}
      <div style={{ position:'absolute', inset:0, background:'#080912' }}/>
      {/* Orb 1 — purple */}
      <div style={{ position:'absolute', top:'-15%', left:'10%', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle, rgba(123,104,238,0.18) 0%, transparent 65%)', filter:'blur(60px)', animation:'orb1 18s ease-in-out infinite' }}/>
      {/* Orb 2 — pink */}
      <div style={{ position:'absolute', bottom:'-10%', right:'5%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,121,249,0.12) 0%, transparent 65%)', filter:'blur(60px)', animation:'orb2 22s ease-in-out infinite' }}/>
      {/* Orb 3 — teal */}
      <div style={{ position:'absolute', top:'40%', right:'25%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 65%)', filter:'blur(50px)', animation:'orb3 15s ease-in-out infinite' }}/>
      {/* Subtle noise overlay */}
      <div style={{ position:'absolute', inset:0, background:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")', opacity:.4 }}/>
    </div>
  )
}

/* ── Glass panel component ───────────────────────────────────────────────── */
const Glass = ({ children, style, ...props }) => (
  <div style={{
    background:'rgba(255,255,255,0.04)',
    backdropFilter:'blur(24px)',
    WebkitBackdropFilter:'blur(24px)',
    border:'1px solid rgba(255,255,255,0.09)',
    ...style
  }} {...props}>{children}</div>
)

/* ── Typing indicator ────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display:'flex', gap:'6px', alignItems:'center', padding:'8px 0' }}>
      {[0,1,2].map(i=>(
        <span key={i} style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#7b68ee', display:'inline-block', animation:`dot 1s ease-in-out ${i*0.2}s infinite` }}/>
      ))}
    </div>
  )
}

/* ── Model picker ────────────────────────────────────────────────────────── */
function ModelPicker({ model, onChange }) {
  const [open, setOpen] = useState(false)
  const cur = MODELS.find(m=>m.id===model)||MODELS[0]
  const ref = useRef(null)

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={()=>setOpen(!open)} style={{
        display:'flex', alignItems:'center', gap:'7px', padding:'6px 13px',
        background:'rgba(255,255,255,0.06)', backdropFilter:'blur(12px)',
        border:'1px solid rgba(255,255,255,0.1)', borderRadius:'22px',
        cursor:'pointer', color:'rgba(255,255,255,0.75)',
        fontSize:'12.5px', fontFamily:'inherit', fontWeight:500, transition:'all .2s'
      }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
      >
        <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#34d399', flexShrink:0, animation:'pulse 2s ease-in-out infinite' }}/>
        {cur.label}
        <span style={{ opacity:.4, fontSize:'10px' }}>▾</span>
      </button>

      {open && (
        <Glass style={{
          position:'absolute', top:'calc(100% + 10px)', right:0, width:'220px',
          borderRadius:'16px', overflow:'hidden', zIndex:200,
          animation:'popIn .18s ease', boxShadow:'0 24px 64px rgba(0,0,0,0.7)'
        }}>
          <div style={{ padding:'8px 12px 6px', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em', fontFamily:'JetBrains Mono,monospace' }}>MODEL</div>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>{onChange(m.id);setOpen(false)}} style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 14px', background:m.id===model?'rgba(123,104,238,0.15)':'transparent',
              border:'none', borderBottom:'1px solid rgba(255,255,255,0.05)',
              cursor:'pointer', color:m.id===model?'#b8b0ff':'rgba(255,255,255,0.55)',
              fontSize:'13px', fontFamily:'inherit', transition:'all .12s', textAlign:'left'
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background=m.id===model?'rgba(123,104,238,0.15)':'transparent'}
            >
              <span>{m.label}</span>
              <span style={{ fontSize:'10px', padding:'2px 8px', background:'rgba(123,104,238,0.15)', borderRadius:'10px', color:'#9d8fff' }}>{m.badge}</span>
            </button>
          ))}
        </Glass>
      )}
    </div>
  )
}

/* ── Voice input ─────────────────────────────────────────────────────────── */
function VoiceBtn({ onResult, disabled, voiceLang, onLangChange }) {
  const [listening, setListening] = useState(false)
  const [err,       setErr]       = useState(null)
  const [showLang,  setShowLang]  = useState(false)
  const recRef = useRef(null)
  const langRef = useRef(null)

  useEffect(() => {
    const fn = e => { if (langRef.current && !langRef.current.contains(e.target)) setShowLang(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const stop = useCallback(() => {
    try { recRef.current?.stop() } catch(_) {}
    recRef.current = null
    setListening(false)
  }, [])

  const start = useCallback(() => {
    setErr(null)
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setErr('Use Chrome for voice input'); return }

    const rec = new SR()
    rec.lang = voiceLang
    rec.continuous = false
    rec.interimResults = false

    rec.onstart  = () => setListening(true)
    rec.onresult = e => { const t=e.results[0]?.[0]?.transcript||''; if(t) onResult(t); stop() }
    rec.onerror  = e => {
      if (e.error!=='aborted') setErr({ 'not-allowed':'Allow microphone access', 'no-speech':'No speech detected' }[e.error]||`Error: ${e.error}`)
      stop()
    }
    rec.onend = stop

    recRef.current = rec
    try { rec.start(); setTimeout(stop, 15000) } catch(e) { setErr('Could not start mic'); stop() }
  }, [voiceLang, onResult, stop])

  return (
    <div ref={langRef} style={{ position:'relative', flexShrink:0 }}>
      <div style={{ display:'flex', gap:'2px' }}>
        <button onClick={listening?stop:start} disabled={disabled} style={{
          width:'38px', height:'38px', borderRadius:'12px 0 0 12px',
          background:listening?'rgba(248,113,113,0.15)':'rgba(255,255,255,0.06)',
          border:`1px solid ${listening?'rgba(248,113,113,0.35)':'rgba(255,255,255,0.1)'}`,
          borderRight:'none', color:listening?'#f87171':'rgba(255,255,255,0.4)',
          cursor:disabled?'not-allowed':'pointer', fontSize:'16px',
          display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(12px)',
          animation:listening?'voicePulse 1s ease-in-out infinite':'none',
          transition:'all .2s'
        }}>
          {listening?'⏹':'🎙'}
        </button>
        <button onClick={()=>setShowLang(!showLang)} style={{
          width:'28px', height:'38px', borderRadius:'0 12px 12px 0',
          background:'rgba(255,255,255,0.04)', backdropFilter:'blur(12px)',
          border:'1px solid rgba(255,255,255,0.1)', borderLeft:'none',
          color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:'10px',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          {VOICE_LANGS.find(l=>l.code===voiceLang)?.flag||'🌐'}
        </button>
      </div>

      {showLang && (
        <Glass style={{
          position:'absolute', bottom:'calc(100% + 8px)', left:0,
          width:'170px', borderRadius:'14px', overflow:'hidden', zIndex:200,
          animation:'popIn .15s ease', boxShadow:'0 20px 50px rgba(0,0,0,0.7)'
        }}>
          {VOICE_LANGS.map(l=>(
            <button key={l.code} onClick={()=>{onLangChange(l.code);setShowLang(false)}} style={{
              width:'100%', display:'flex', alignItems:'center', gap:'10px',
              padding:'10px 14px', background:l.code===voiceLang?'rgba(123,104,238,0.15)':'transparent',
              border:'none', borderBottom:'1px solid rgba(255,255,255,0.05)',
              cursor:'pointer', color:l.code===voiceLang?'#b8b0ff':'rgba(255,255,255,0.5)',
              fontSize:'13px', fontFamily:'inherit', transition:'all .12s', textAlign:'left'
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background=l.code===voiceLang?'rgba(123,104,238,0.15)':'transparent'}
            >
              {l.flag} <span>{l.label}</span>
              {l.code===voiceLang&&<span style={{ marginLeft:'auto', color:'#7b68ee' }}>✓</span>}
            </button>
          ))}
        </Glass>
      )}

      {listening && (
        <div style={{ position:'absolute', bottom:'calc(100% + 8px)', left:0, padding:'7px 12px', background:'rgba(248,113,113,0.12)', border:'1px solid rgba(248,113,113,0.25)', borderRadius:'10px', fontSize:'11.5px', color:'#fca5a5', whiteSpace:'nowrap', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', gap:'7px' }}>
          <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#f87171', display:'inline-block', animation:'pulse .6s ease-in-out infinite' }}/>
          {VOICE_LANGS.find(l=>l.code===voiceLang)?.label} · listening
        </div>
      )}
      {err && (
        <div style={{ position:'absolute', bottom:'calc(100% + 8px)', left:0, padding:'8px 12px', background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.25)', borderRadius:'10px', fontSize:'11.5px', color:'#fca5a5', whiteSpace:'normal', maxWidth:'240px', backdropFilter:'blur(12px)', lineHeight:'1.5' }}>
          {err} <button onClick={()=>setErr(null)} style={{ background:'none', border:'none', color:'#f87171', cursor:'pointer', marginLeft:'6px' }}>✕</button>
        </div>
      )}
    </div>
  )
}

/* ── Message component ───────────────────────────────────────────────────── */
function Message({ msg, streaming, streamText, onCopy, onStar, starred, isLast, onRegen }) {
  const [hov, setHov] = useState(false)
  const isUser = msg.role === 'user'
  const text   = streaming ? streamText : msg.content

  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'flex', gap:'16px', padding:'24px 28px', position:'relative', animation:'fadeUp .22s ease', transition:'background .15s', background:hov&&!isUser?'rgba(255,255,255,0.015)':'transparent' }}
    >
      {/* Avatar */}
      <div style={{
        width:'36px', height:'36px', borderRadius:'12px', flexShrink:0, marginTop:'1px',
        background: isUser
          ? 'linear-gradient(135deg,rgba(59,130,246,0.6),rgba(99,102,241,0.6))'
          : 'linear-gradient(135deg,rgba(123,104,238,0.7),rgba(168,85,247,0.7))',
        backdropFilter:'blur(10px)',
        border:`1px solid ${isUser?'rgba(99,102,241,0.4)':'rgba(123,104,238,0.4)'}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.9)',
        fontFamily:'JetBrains Mono,monospace', flexShrink:0
      }}>
        {isUser ? 'U' : 'V'}
      </div>

      {/* Content */}
      <div style={{ flex:1, minWidth:0, maxWidth:'860px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'9px', marginBottom:'10px' }}>
          <span style={{ fontSize:'13.5px', fontWeight:600, color:isUser?'rgba(147,197,253,0.9)':'rgba(184,176,255,0.9)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.02em' }}>
            {isUser ? 'you' : 'vigil'}
          </span>
          <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.18)', fontFamily:'JetBrains Mono,monospace' }}>
            {formatTime(msg.at)}
          </span>
          {starred && <span style={{ fontSize:'12px', color:'#fbbf24' }}>★</span>}
        </div>

        {streaming && !streamText
          ? <TypingDots/>
          : <>
              <MessageContent text={text}/>
              {streaming && <span style={{ display:'inline-block', width:'2px', height:'18px', background:'#7b68ee', marginLeft:'2px', verticalAlign:'text-bottom', animation:'blink .85s step-end infinite' }}/>}
            </>
        }
      </div>

      {/* Hover actions */}
      {!streaming && hov && (
        <div style={{ position:'absolute', top:'18px', right:'24px', display:'flex', gap:'5px', animation:'fadeIn .15s ease' }}>
          {[
            { icon:'⎘', title:'Copy',           fn:()=>onCopy(text) },
            { icon:'★', title:starred?'Unstar':'Star', fn:()=>onStar(msg.id) },
            ...(!isUser&&isLast?[{icon:'↺',title:'Regenerate',fn:onRegen}]:[])
          ].map((b,i)=>(
            <button key={i} onClick={b.fn} title={b.title} style={{
              width:'30px', height:'30px', borderRadius:'8px',
              background:'rgba(255,255,255,0.06)', backdropFilter:'blur(10px)',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:'13px',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all .12s'
            }}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.1)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
            >{b.icon}</button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Welcome screen ──────────────────────────────────────────────────────── */
function Welcome({ onSend }) {
  const [hov, setHov] = useState(null)
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'80vh', padding:'40px 24px', textAlign:'center', animation:'fadeIn .5s ease' }}>

      {/* Brand mark */}
      <div style={{ position:'relative', marginBottom:'28px' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'22px', background:'linear-gradient(135deg,rgba(123,104,238,0.25),rgba(168,85,247,0.15))', backdropFilter:'blur(20px)', border:'1px solid rgba(123,104,238,0.35)', display:'flex', alignItems:'center', justifyContent:'center', animation:'glow 4s ease-in-out infinite' }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, color:'rgba(184,176,255,0.95)', fontSize:'28px' }}>V</span>
        </div>
        <div style={{ position:'absolute', bottom:'-4px', right:'-4px', width:'20px', height:'20px', borderRadius:'50%', background:'#34d399', border:'2.5px solid #080912', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#080912' }}/>
        </div>
      </div>

      <h1 style={{ fontSize:'32px', fontWeight:600, color:'rgba(255,255,255,0.92)', marginBottom:'10px', letterSpacing:'-0.04em', lineHeight:'1.2' }}>
        Good to see you
      </h1>
      <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.35)', maxWidth:'400px', lineHeight:'1.75', marginBottom:'10px' }}>
        Ask in <strong style={{color:'rgba(184,176,255,0.7)'}}>English</strong>, <strong style={{color:'rgba(184,176,255,0.7)'}}>हिंदी</strong>, or <strong style={{color:'rgba(184,176,255,0.7)'}}>ଓଡ଼ିଆ</strong> — I'll reply in your language.
      </p>
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center', marginBottom:'36px' }}>
        {['Voice input','4 AI models','Code blocks','Export chat','Multilingual'].map((f,i)=>(
          <span key={i} style={{ padding:'4px 12px', background:'rgba(255,255,255,0.04)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'20px', fontSize:'11.5px', color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace' }}>{f}</span>
        ))}
      </div>

      {/* Suggestions */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,minmax(0,1fr))', gap:'10px', maxWidth:'600px', width:'100%' }}>
        {SUGGESTIONS.map((s,i)=>(
          <button key={i} onClick={()=>onSend(s.text)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{
              padding:'16px 18px',
              background:hov===i?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)',
              backdropFilter:'blur(16px)',
              border:`1px solid ${hov===i?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.07)'}`,
              borderRadius:'16px', cursor:'pointer', fontSize:'13.5px',
              textAlign:'left', color:hov===i?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.45)',
              fontFamily:'inherit', lineHeight:'1.55',
              display:'flex', alignItems:'flex-start', gap:'12px',
              transition:'all .18s', transform:hov===i?'translateY(-2px)':'none',
              boxShadow:hov===i?'0 8px 32px rgba(0,0,0,0.3)':'none'
            }}>
            <span style={{ fontSize:'15px', flexShrink:0, lineHeight:'1.5', color:'rgba(123,104,238,0.8)' }}>{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
function Sidebar({ convs, activeId, onNew, onSelect, onDelete, onExport, search, onSearch }) {
  const [hov, setHov] = useState(null)
  const filtered = convs.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  // Group by date
  const groups = {}
  for (const c of filtered) {
    const g = formatDate(c.at)
    if (!groups[g]) groups[g] = []
    groups[g].push(c)
  }

  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', background:'rgba(8,9,18,0.85)', backdropFilter:'blur(24px)', borderRight:'1px solid rgba(255,255,255,0.07)' }}>

      {/* Logo */}
      <div style={{ padding:'20px 18px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'11px', background:'linear-gradient(135deg,rgba(123,104,238,0.3),rgba(168,85,247,0.2))', backdropFilter:'blur(10px)', border:'1px solid rgba(123,104,238,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'17px', color:'rgba(184,176,255,0.9)', flexShrink:0 }}>V</div>
          <div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'15px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.88)' }}>VIGIL</div>
            <div style={{ fontSize:'9px', color:'rgba(255,255,255,0.2)', letterSpacing:'0.2em', fontFamily:'JetBrains Mono,monospace', marginTop:'1px' }}>NEURAL INTELLIGENCE</div>
          </div>
        </div>
      </div>

      {/* Search + New */}
      <div style={{ padding:'12px 12px 8px', flexShrink:0 }}>
        <input value={search} onChange={e=>onSearch(e.target.value)} placeholder="Search…"
          style={{ width:'100%', padding:'8px 13px', background:'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'11px', color:'rgba(255,255,255,0.7)', fontSize:'13px', fontFamily:'inherit', outline:'none', marginBottom:'8px', transition:'border-color .2s' }}
          onFocus={e=>e.target.style.borderColor='rgba(123,104,238,0.4)'}
          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}
        />
        <button onClick={onNew}
          style={{ width:'100%', padding:'9px 14px', background:'rgba(123,104,238,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(123,104,238,0.25)', borderRadius:'11px', color:'rgba(184,176,255,0.85)', cursor:'pointer', fontSize:'13px', fontWeight:500, fontFamily:'inherit', display:'flex', alignItems:'center', gap:'9px', transition:'all .15s' }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(123,104,238,0.25)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(123,104,238,0.15)'}
        >
          <span style={{ fontSize:'18px', lineHeight:1 }}>＋</span> New chat
        </button>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 8px' }}>
        {convs.length===0&&(
          <div style={{ padding:'32px 12px', textAlign:'center', color:'rgba(255,255,255,0.18)', fontSize:'12px', lineHeight:2 }}>
            <div style={{ fontSize:'22px', marginBottom:'6px', opacity:.3 }}>💬</div>
            No conversations yet
          </div>
        )}

        {Object.entries(groups).map(([group, items])=>(
          <div key={group}>
            <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.12em', padding:'10px 8px 4px', fontFamily:'JetBrains Mono,monospace', fontWeight:600 }}>{group}</div>
            {items.map(c=>(
              <div key={c.id}
                onClick={()=>onSelect(c.id)}
                onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
                style={{ display:'flex', alignItems:'center', gap:'9px', padding:'9px 10px', borderRadius:'11px', cursor:'pointer', marginBottom:'2px', background:c.id===activeId?'rgba(123,104,238,0.15)':hov===c.id?'rgba(255,255,255,0.04)':'transparent', border:`1px solid ${c.id===activeId?'rgba(123,104,238,0.25)':'transparent'}`, backdropFilter:c.id===activeId?'blur(10px)':'none', transition:'all .12s' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', flexShrink:0, background:c.id===activeId?'#7b68ee':'rgba(255,255,255,0.12)', transition:'background .2s' }}/>
                <span style={{ flex:1, fontSize:'13px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:c.id===activeId?'rgba(184,176,255,0.9)':'rgba(255,255,255,0.45)' }}>
                  {truncate(c.title, 30)}
                </span>
                <div style={{ display:'flex', gap:'2px', opacity:hov===c.id?1:0, transition:'opacity .12s', flexShrink:0 }}>
                  {[['⎘',()=>onExport(c.id),'rgba(184,176,255,0.8)'],['✕',()=>onDelete(c.id),'#f87171']].map(([icon,fn,hc],i)=>(
                    <button key={i} onClick={e=>{e.stopPropagation();fn()}} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.25)', cursor:'pointer', fontSize:'12px', padding:'2px 5px', borderRadius:'5px', transition:'color .12s' }}
                      onMouseEnter={e=>e.target.style.color=hc} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.25)'}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Status */}
      <Glass style={{ margin:'8px', borderRadius:'12px', padding:'10px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'3px' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#34d399', animation:'pulse 2s ease-in-out infinite' }}/>
          <span style={{ fontSize:'11.5px', color:'rgba(255,255,255,0.4)', fontFamily:'JetBrains Mono,monospace' }}>operational</span>
        </div>
        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.18)', fontFamily:'JetBrains Mono,monospace' }}>
          EN · हि · ଓ · free forever
        </div>
      </Glass>
    </div>
  )
}

/* ── Toast ───────────────────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null
  return (
    <div style={{ position:'fixed', bottom:'110px', left:'50%', transform:'translateX(-50%)', padding:'9px 20px', background:'rgba(123,104,238,0.15)', backdropFilter:'blur(16px)', border:'1px solid rgba(123,104,238,0.3)', borderRadius:'24px', fontSize:'12.5px', color:'rgba(184,176,255,0.9)', zIndex:1000, animation:'fadeUp .2s ease', whiteSpace:'nowrap', fontFamily:'JetBrains Mono,monospace', boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
      {msg}
    </div>
  )
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [convs,    setConvs]    = useState([])
  const [activeId, setActiveId] = useState(null)
  const [input,    setInput]    = useState('')
  const [busy,     setBusy]     = useState(false)
  const [stream,   setStream]   = useState('')
  const [sidebar,  setSidebar]  = useState(true)
  const [model,    setModel]    = useState('llama-3.3-70b-versatile')
  const [vlang,    setVlang]    = useState('en-US')
  const [starred,  setStarred]  = useState({})
  const [toast,    setToast]    = useState(null)
  const [search,   setSearch]   = useState('')

  const endRef   = useRef(null)
  const taRef    = useRef(null)
  const abortRef = useRef(null)

  const active = convs.find(c=>c.id===activeId)
  const msgs   = active?.messages||[]

  const notify = m => { setToast(m); setTimeout(()=>setToast(null),2200) }

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs,stream])

  useEffect(()=>{
    if(taRef.current){
      taRef.current.style.height='auto'
      taRef.current.style.height=Math.min(taRef.current.scrollHeight,200)+'px'
    }
  },[input])

  const newConv = useCallback(()=>{
    const id=uid()
    setConvs(p=>[{id,title:'New chat',messages:[],at:new Date()},...p])
    setActiveId(id); setInput('')
  },[])

  const delConv = useCallback(id=>{
    setConvs(p=>p.filter(c=>c.id!==id))
    if(activeId===id) setActiveId(null)
  },[activeId])

  const doExport = useCallback(id=>{
    exportMarkdown(convs.find(c=>c.id===id))
    notify('Exported ✓')
  },[convs])

  const copyMsg = useCallback(async t=>{
    try{await navigator.clipboard.writeText(t)}catch(_){}
    notify('Copied ✓')
  },[])

  const toggleStar = useCallback(id=>{
    setStarred(p=>{
      const n={...p,[id]:!p[id]}
      notify(n[id]?'Starred ★':'Unstarred')
      return n
    })
  },[])

  const send = useCallback(async(override)=>{
    const text=(override||input).trim()
    if(!text||busy) return
    setInput(''); setBusy(true); setStream('')

    let cid=activeId, prev=active?.messages||[]
    if(!cid){
      cid=uid(); prev=[]
      setConvs(p=>[{id:cid,title:text.length>46?text.slice(0,46)+'…':text,messages:[],at:new Date()},...p])
      setActiveId(cid)
    }

    const uMsg={role:'user',content:text,id:uid(),at:new Date()}
    const next=[...prev,uMsg]
    setConvs(p=>p.map(c=>c.id===cid?{...c,title:prev.length===0?(text.length>46?text.slice(0,46)+'…':text):c.title,messages:next}:c))

    abortRef.current=new AbortController()
    let acc=''
    try{
      const res=await fetch('/api/chat',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:next,model}),
        signal:abortRef.current.signal
      })
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const reader=res.body.getReader(), dec=new TextDecoder()
      while(true){
        const{done,value}=await reader.read()
        if(done)break
        for(const line of dec.decode(value,{stream:true}).split('\n')){
          if(!line.startsWith('data: '))continue
          const d=line.slice(6).trim()
          if(d==='[DONE]')break
          try{const p=JSON.parse(d);if(p.text){acc+=p.text;setStream(acc)}}catch(_){}
        }
      }
    }catch(err){
      if(err.name!=='AbortError'){acc=`Error: ${err.message}`;setStream(acc)}
    }

    setConvs(p=>p.map(c=>c.id===cid?{...c,messages:[...next,{role:'assistant',content:acc||'(no response)',id:uid(),at:new Date()}]}:c))
    setStream(''); setBusy(false)
  },[input,busy,activeId,active,model])

  const regen = useCallback(async()=>{
    if(!active||busy)return
    const idx=[...active.messages].reverse().findIndex(m=>m.role==='user')
    if(idx===-1)return
    const ri=active.messages.length-1-idx
    const t=active.messages.slice(0,ri+1)
    setConvs(p=>p.map(c=>c.id===activeId?{...c,messages:t}:c))
    await send(t[t.length-1].content)
  },[active,busy,activeId,send])

  const onKey = e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }
  const canSend=input.trim().length>0&&!busy

  return (
    <div style={{ display:'flex', height:'100dvh', background:'#080912', overflow:'hidden', position:'relative' }}>
      <Aurora/>

      {/* Sidebar */}
      <div style={{ width:sidebar?'260px':'0', minWidth:sidebar?'260px':'0', overflow:'hidden', transition:'all .28s cubic-bezier(.4,0,.2,1)', flexShrink:0, zIndex:10, position:'relative' }}>
        <Sidebar convs={convs} activeId={activeId} onNew={newConv} onSelect={setActiveId} onDelete={delConv} onExport={doExport} search={search} onSearch={setSearch}/>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0, zIndex:5, position:'relative' }}>

        {/* Header */}
        <div style={{ height:'56px', background:'rgba(8,9,18,0.7)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', padding:'0 20px', gap:'12px', flexShrink:0 }}>
          <button onClick={()=>setSidebar(!sidebar)}
            style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', padding:'7px', borderRadius:'9px', fontSize:'16px', lineHeight:1, transition:'all .15s', display:'flex', alignItems:'center', justifyContent:'center' }}
            onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.07)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='transparent'}}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="3" width="14" height="1.5" rx=".75"/>
              <rect x="1" y="7.25" width="14" height="1.5" rx=".75"/>
              <rect x="1" y="11.5" width="14" height="1.5" rx=".75"/>
            </svg>
          </button>

          {!sidebar&&(
            <div style={{ display:'flex', alignItems:'center', gap:'9px', flexShrink:0 }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg,rgba(123,104,238,0.3),rgba(168,85,247,0.2))', backdropFilter:'blur(10px)', border:'1px solid rgba(123,104,238,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'13px', color:'rgba(184,176,255,0.9)' }}>V</div>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, fontSize:'14px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.8)' }}>VIGIL</span>
            </div>
          )}

          <div style={{ flex:1, display:'flex', justifyContent:'center' }}>
            {active&&<span style={{ fontSize:'13px', color:'rgba(255,255,255,0.25)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'400px', fontFamily:'JetBrains Mono,monospace' }}>{active.title}</span>}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
            <ModelPicker model={model} onChange={setModel}/>

            {active&&(
              <button onClick={()=>doExport(activeId)}
                style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.09)', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:'13px', padding:'5px 12px', borderRadius:'20px', fontFamily:'inherit', transition:'all .15s' }}
                onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.75)';e.currentTarget.style.background='rgba(255,255,255,0.09)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}>
                ⎘
              </button>
            )}

            {busy&&(
              <button onClick={()=>abortRef.current?.abort()}
                style={{ background:'rgba(248,113,113,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(248,113,113,0.25)', color:'#f87171', cursor:'pointer', fontSize:'12px', padding:'5px 14px', borderRadius:'20px', fontFamily:'inherit', transition:'all .15s' }}>
                ◼ stop
              </button>
            )}

            <div style={{ display:'flex', alignItems:'center', gap:'5px', padding:'5px 11px', background:'rgba(52,211,153,0.08)', backdropFilter:'blur(10px)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:'20px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#34d399', animation:'pulse 2s ease-in-out infinite' }}/>
              <span style={{ fontSize:'11px', color:'rgba(52,211,153,0.9)', letterSpacing:'0.08em', fontFamily:'JetBrains Mono,monospace', fontWeight:600 }}>LIVE</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', scrollbarGutter:'stable' }}>
          {msgs.length===0&&!busy&&<Welcome onSend={send}/>}
          {msgs.map((msg,i)=>(
            <Message key={msg.id} msg={msg} streaming={false} streamText="" onCopy={copyMsg} onStar={toggleStar} starred={!!starred[msg.id]} isLast={i===msgs.length-1} onRegen={regen}/>
          ))}
          {busy&&<Message msg={{role:'assistant',content:'',id:'__s__',at:new Date()}} streaming={true} streamText={stream} onCopy={()=>{}} onStar={()=>{}} starred={false} isLast={true} onRegen={()=>{}}/>}
          <div ref={endRef} style={{height:'28px'}}/>
        </div>

        {/* Input area — liquid glass */}
        <div style={{ padding:'16px 24px 24px', background:'rgba(8,9,18,0.7)', backdropFilter:'blur(24px)', borderTop:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
          <div style={{ maxWidth:'860px', margin:'0 auto' }}>
            {/* Glass input container */}
            <div style={{ display:'flex', alignItems:'flex-end', gap:'10px', background:'rgba(255,255,255,0.05)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'22px', padding:'12px 14px', transition:'border-color .25s, box-shadow .25s' }}
              onFocusCapture={e=>{e.currentTarget.style.borderColor='rgba(123,104,238,0.45)';e.currentTarget.style.boxShadow='0 0 0 4px rgba(123,104,238,0.08)'}}
              onBlurCapture={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.boxShadow='none'}}
            >
              <VoiceBtn onResult={t=>setInput(p=>p?p+' '+t:t)} disabled={busy} voiceLang={vlang} onLangChange={setVlang}/>

              <textarea ref={taRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                placeholder="Message VIGIL…" disabled={busy} rows={1}
                style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'rgba(255,255,255,0.88)', fontSize:'15px', lineHeight:'1.65', resize:'none', fontFamily:'inherit', padding:0, maxHeight:'200px', overflowY:'auto', opacity:busy?0.5:1 }}
              />

              <button onClick={()=>send()} disabled={!canSend} style={{
                width:'40px', height:'40px', border:'none', borderRadius:'14px', flexShrink:0,
                cursor:canSend?'pointer':'not-allowed',
                background:canSend?'linear-gradient(135deg,#7b68ee,#9d8fff)':'rgba(255,255,255,0.06)',
                color:canSend?'#fff':'rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'18px', transition:'all .2s',
                boxShadow:canSend?'0 4px 20px rgba(123,104,238,0.4)':'none',
                transform:canSend?'scale(1)':'scale(0.92)'
              }}>
                {busy
                  ? <span style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,0.25)', borderTopColor:'#fff', borderRadius:'50%', display:'block', animation:'spin .7s linear infinite' }}/>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M8 3L3 8M8 3L13 8"/></svg>
                }
              </button>
            </div>

            {/* Hints */}
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'14px', marginTop:'9px' }}>
              {['Enter to send','Shift+Enter new line','🎙 voice input'].map((h,i)=>(
                <span key={i} style={{ fontSize:'11px', color:'rgba(255,255,255,0.15)', fontFamily:'JetBrains Mono,monospace' }}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toast msg={toast}/>
    </div>
  )
}