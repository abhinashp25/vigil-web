'use client'
import {useState,useRef,useEffect,useCallback} from 'react'
import MessageContent from '../components/MessageContent'
import {uid,fmtTime,fmtDate,trunc,exportMd,MODELS,SUGGESTIONS,VOICE_LANGS} from '../lib/utils'

/* ── Aurora ──────────────────────────────────────────────────────────────── */
function Aurora(){
  return(
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'#0a0a10'}}/>
      <div style={{position:'absolute',top:'-20%',left:'5%',width:'650px',height:'650px',borderRadius:'50%',background:'radial-gradient(circle,rgba(123,104,238,0.16) 0%,transparent 65%)',filter:'blur(55px)',animation:'orb1 20s ease-in-out infinite'}}/>
      <div style={{position:'absolute',bottom:'-15%',right:'0%',width:'550px',height:'550px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,121,249,0.1) 0%,transparent 65%)',filter:'blur(55px)',animation:'orb2 24s ease-in-out infinite'}}/>
      <div style={{position:'absolute',top:'35%',right:'20%',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(45,212,191,0.07) 0%,transparent 65%)',filter:'blur(45px)',animation:'orb3 16s ease-in-out infinite'}}/>
    </div>
  )
}

/* ── Typing dots ─────────────────────────────────────────────────────────── */
function Dots(){
  return(
    <div style={{display:'flex',gap:'6px',alignItems:'center',padding:'6px 0'}}>
      {[0,1,2].map(i=><span key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:'#7b68ee',display:'inline-block',animation:`dot 1s ease-in-out ${i*0.2}s infinite`}}/>)}
    </div>
  )
}

/* ── Model picker ────────────────────────────────────────────────────────── */
function ModelPicker({model,onChange}){
  const [open,setOpen]=useState(false)
  const ref=useRef(null)
  const cur=MODELS.find(m=>m.id===model)||MODELS[0]
  useEffect(()=>{
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)}
    document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)
  },[])
  return(
    <div ref={ref} style={{position:'relative'}}>
      <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:'7px',padding:'6px 13px',background:'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'22px',cursor:'pointer',color:'rgba(255,255,255,0.7)',fontSize:'12.5px',fontFamily:'inherit',fontWeight:500,transition:'all .2s'}}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
      >
        <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#34d399',flexShrink:0,animation:'pulse 2s ease-in-out infinite'}}/>
        {cur.label}
        <span style={{opacity:.4,fontSize:'10px'}}>▾</span>
      </button>
      {open&&(
        <div style={{position:'absolute',top:'calc(100% + 10px)',right:0,width:'215px',background:'rgba(14,14,24,0.95)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',overflow:'hidden',zIndex:300,animation:'popIn .18s ease',boxShadow:'0 24px 64px rgba(0,0,0,0.7)'}}>
          <div style={{padding:'9px 14px 5px',fontSize:'10px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.14em',fontFamily:'JetBrains Mono,monospace'}}>MODEL</div>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>{onChange(m.id);setOpen(false)}} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',background:m.id===model?'rgba(123,104,238,0.15)':'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,0.05)',cursor:'pointer',color:m.id===model?'#b8b0ff':'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'inherit',transition:'all .12s',textAlign:'left'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background=m.id===model?'rgba(123,104,238,0.15)':'transparent'}
            >
              <span>{m.label}</span>
              <span style={{fontSize:'10px',padding:'2px 8px',background:'rgba(123,104,238,0.15)',borderRadius:'10px',color:'#9d8fff'}}>{m.badge}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── FIXED Voice input — or-IN removed (unsupported), proper SSR guard ──── */
function VoiceBtn({onResult,disabled,lang,onLangChange}){
  const [listening,setListening]=useState(false)
  const [err,setErr]=useState(null)
  const [showLang,setShowLang]=useState(false)
  const [supported,setSupported]=useState(null) // null=checking
  const recRef=useRef(null)
  const ref=useRef(null)

  // SSR guard — only check on client
  useEffect(()=>{
    setSupported(!!(window.SpeechRecognition||window.webkitSpeechRecognition))
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setShowLang(false)}
    document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)
  },[])

  const stop=useCallback(()=>{
    try{recRef.current?.stop()}catch(_){}
    recRef.current=null;setListening(false)
  },[])

  const start=useCallback(()=>{
    if(!supported){setErr('Voice requires Chrome or Edge browser');return}
    setErr(null)
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition
    const rec=new SR()
    rec.lang=lang;rec.continuous=false;rec.interimResults=false
    rec.onstart=()=>setListening(true)
    rec.onresult=e=>{const t=e.results[0]?.[0]?.transcript||'';if(t)onResult(t);stop()}
    rec.onerror=e=>{
      if(e.error!=='aborted'){
        const msgs={'not-allowed':'Allow microphone in browser settings','no-speech':'No speech detected — try again','network':'Network error'}
        setErr(msgs[e.error]||'Mic error: '+e.error)
      }
      stop()
    }
    rec.onend=stop
    recRef.current=rec
    try{rec.start();setTimeout(stop,15000)}catch(e){setErr('Could not start mic');stop()}
  },[supported,lang,onResult,stop])

  const curLang=VOICE_LANGS.find(l=>l.code===lang)||VOICE_LANGS[0]

  return(
    <div ref={ref} style={{position:'relative',flexShrink:0}}>
      <div style={{display:'flex',gap:'2px'}}>
        <button onClick={listening?stop:start} disabled={disabled||supported===false} title={listening?'Stop':'Voice input'}
          style={{width:'38px',height:'38px',borderRadius:'12px 0 0 12px',background:listening?'rgba(248,113,113,0.15)':'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',border:`1px solid ${listening?'rgba(248,113,113,0.4)':'rgba(255,255,255,0.1)'}`,borderRight:'none',color:listening?'#f87171':'rgba(255,255,255,0.4)',cursor:disabled?'not-allowed':'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',animation:listening?'voiceRing 1s ease-in-out infinite':'none',transition:'all .2s'}}>
          {listening?'⏹':'🎙'}
        </button>
        <button onClick={()=>setShowLang(!showLang)} style={{width:'28px',height:'38px',borderRadius:'0 12px 12px 0',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.1)',borderLeft:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.35)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {curLang.flag}
        </button>
      </div>

      {showLang&&(
        <div style={{position:'absolute',bottom:'calc(100% + 8px)',left:0,width:'165px',background:'rgba(14,14,24,0.95)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'14px',overflow:'hidden',zIndex:300,animation:'popIn .15s ease',boxShadow:'0 20px 50px rgba(0,0,0,0.7)'}}>
          {VOICE_LANGS.map(l=>(
            <button key={l.code} onClick={()=>{onLangChange(l.code);setShowLang(false)}}
              style={{width:'100%',display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:l.code===lang?'rgba(123,104,238,0.15)':'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,0.05)',cursor:'pointer',color:l.code===lang?'#b8b0ff':'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'inherit',transition:'all .12s',textAlign:'left'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background=l.code===lang?'rgba(123,104,238,0.15)':'transparent'}
            >
              {l.flag} <span>{l.label}</span>{l.code===lang&&<span style={{marginLeft:'auto',color:'#7b68ee'}}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {listening&&<div style={{position:'absolute',bottom:'calc(100% + 8px)',left:0,padding:'7px 12px',background:'rgba(248,113,113,0.1)',backdropFilter:'blur(12px)',border:'1px solid rgba(248,113,113,0.25)',borderRadius:'10px',fontSize:'11.5px',color:'#fca5a5',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'7px',zIndex:200}}>
        <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#f87171',display:'inline-block',animation:'pulse .6s ease-in-out infinite'}}/>
        {curLang.label} · listening
      </div>}

      {err&&<div style={{position:'absolute',bottom:'calc(100% + 8px)',left:0,padding:'8px 12px',background:'rgba(248,113,113,0.1)',backdropFilter:'blur(12px)',border:'1px solid rgba(248,113,113,0.25)',borderRadius:'10px',fontSize:'11.5px',color:'#fca5a5',maxWidth:'250px',lineHeight:'1.5',zIndex:200}}>
        {err}
        <button onClick={()=>setErr(null)} style={{background:'none',border:'none',color:'#f87171',cursor:'pointer',marginLeft:'8px',fontSize:'12px'}}>✕</button>
      </div>}
    </div>
  )
}

/* ── Message ─────────────────────────────────────────────────────────────── */
function Msg({msg,streaming,streamText,onCopy,onStar,starred,isLast,onRegen}){
  const [hov,setHov]=useState(false)
  const isUser=msg.role==='user'
  const text=streaming?streamText:msg.content
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:'flex',gap:'16px',padding:'22px 28px',position:'relative',animation:'fadeUp .22s ease',background:hov&&!isUser?'rgba(255,255,255,0.015)':'transparent',transition:'background .15s',borderBottom:'1px solid rgba(255,255,255,0.025)'}}>
      {/* Avatar */}
      <div style={{width:'34px',height:'34px',borderRadius:'11px',flexShrink:0,marginTop:'1px',background:isUser?'linear-gradient(135deg,rgba(59,130,246,0.55),rgba(99,102,241,0.55))':'linear-gradient(135deg,rgba(123,104,238,0.65),rgba(168,85,247,0.65))',backdropFilter:'blur(10px)',border:`1px solid ${isUser?'rgba(99,102,241,0.35)':'rgba(123,104,238,0.35)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.9)',fontFamily:'JetBrains Mono,monospace'}}>
        {isUser?'U':'V'}
      </div>
      {/* Body */}
      <div style={{flex:1,minWidth:0,maxWidth:'840px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'9px',marginBottom:'10px'}}>
          <span style={{fontSize:'13.5px',fontWeight:600,color:isUser?'rgba(147,197,253,0.9)':'rgba(184,176,255,0.9)',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.02em'}}>
            {isUser?'you':'vigil'}
          </span>
          <span style={{fontSize:'11px',color:'rgba(255,255,255,0.18)',fontFamily:'JetBrains Mono,monospace'}}>{fmtTime(msg.at)}</span>
          {starred&&<span style={{fontSize:'12px',color:'#fbbf24'}}>★</span>}
        </div>
        {streaming&&!streamText?<Dots/>:<>
          <MessageContent text={text}/>
          {streaming&&<span style={{display:'inline-block',width:'2px',height:'17px',background:'#7b68ee',marginLeft:'2px',verticalAlign:'text-bottom',animation:'blink .85s step-end infinite'}}/>}
        </>}
      </div>
      {/* Actions on hover */}
      {!streaming&&hov&&(
        <div style={{position:'absolute',top:'16px',right:'22px',display:'flex',gap:'5px',animation:'fadeIn .15s ease'}}>
          {[
            {ic:'⎘',tt:'Copy',fn:()=>onCopy(text)},
            {ic:'★',tt:starred?'Unstar':'Star',fn:()=>onStar(msg.id)},
            ...(!isUser&&isLast?[{ic:'↺',tt:'Regenerate',fn:onRegen}]:[])
          ].map((b,i)=>(
            <button key={i} onClick={b.fn} title={b.tt} style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(255,255,255,0.06)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.09)',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .12s'}}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.1)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
            >{b.ic}</button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Welcome screen ──────────────────────────────────────────────────────── */
function Welcome({onSend}){
  const [hov,setHov]=useState(null)
  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'80vh',padding:'40px 24px',textAlign:'center',animation:'fadeIn .5s ease'}}>
      <div style={{position:'relative',marginBottom:'26px'}}>
        <div style={{width:'72px',height:'72px',borderRadius:'22px',background:'linear-gradient(135deg,rgba(123,104,238,0.22),rgba(168,85,247,0.14))',backdropFilter:'blur(20px)',border:'1px solid rgba(123,104,238,0.32)',display:'flex',alignItems:'center',justifyContent:'center',animation:'shimmer 4s ease-in-out infinite'}}>
          <span style={{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'rgba(184,176,255,0.95)',fontSize:'28px'}}>V</span>
        </div>
        <div style={{position:'absolute',bottom:'-4px',right:'-4px',width:'20px',height:'20px',borderRadius:'50%',background:'#34d399',border:'2.5px solid #0a0a10',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#0a0a10'}}/>
        </div>
      </div>
      <h1 style={{fontSize:'32px',fontWeight:600,color:'rgba(255,255,255,0.9)',marginBottom:'10px',letterSpacing:'-0.04em',lineHeight:'1.2'}}>Good to see you</h1>
      <p style={{fontSize:'15px',color:'rgba(255,255,255,0.32)',maxWidth:'400px',lineHeight:'1.75',marginBottom:'8px'}}>
        Ask in <strong style={{color:'rgba(184,176,255,0.7)'}}>English</strong>, <strong style={{color:'rgba(184,176,255,0.7)'}}>हिंदी</strong>, or any language — I'll reply in your language.
      </p>
      <div style={{display:'flex',gap:'7px',flexWrap:'wrap',justifyContent:'center',marginBottom:'34px'}}>
        {['Voice input','4 AI models','Code blocks','Export chat','Multilingual'].map((f,i)=>(
          <span key={i} style={{padding:'4px 12px',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',fontSize:'11.5px',color:'rgba(255,255,255,0.32)',fontFamily:'JetBrains Mono,monospace'}}>{f}</span>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:'10px',maxWidth:'600px',width:'100%'}}>
        {SUGGESTIONS.map((s,i)=>(
          <button key={i} onClick={()=>onSend(s.text)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{padding:'15px 17px',background:hov===i?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)',backdropFilter:'blur(16px)',border:`1px solid ${hov===i?'rgba(255,255,255,0.14)':'rgba(255,255,255,0.07)'}`,borderRadius:'16px',cursor:'pointer',fontSize:'13.5px',textAlign:'left',color:hov===i?'rgba(255,255,255,0.82)':'rgba(255,255,255,0.42)',fontFamily:'inherit',lineHeight:'1.55',display:'flex',alignItems:'flex-start',gap:'12px',transition:'all .18s',transform:hov===i?'translateY(-2px)':'none',boxShadow:hov===i?'0 8px 32px rgba(0,0,0,0.3)':'none'}}>
            <span style={{fontSize:'15px',flexShrink:0,lineHeight:'1.5',color:'rgba(123,104,238,0.75)'}}>{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── SIDEBAR — ChatGPT-style with sections ───────────────────────────────── */
function Sidebar({convs,activeId,onNew,onSelect,onDelete,onExport,search,onSearch,starred,view,onView}){
  const [hov,setHov]=useState(null)

  const starredConvs = convs.filter(c=>c.messages.some(m=>starred[m.id]))
  const recentConvs  = convs.filter(c=>c.title!=='New chat'||c.messages.length>0)

  const groups={}
  for(const c of recentConvs.filter(c=>c.title.toLowerCase().includes(search.toLowerCase()))){
    const g=fmtDate(c.at)
    if(!groups[g])groups[g]=[]
    groups[g].push(c)
  }

  const NAV=[
    {id:'new',   icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,  label:'New chat',    action:onNew},
    {id:'search',icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, label:'Search',      action:()=>{}},
  ]

  const SECTIONS=[
    {id:'chats',   icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 2.5C1 1.67 1.67 1 2.5 1h9C12.33 1 13 1.67 13 2.5v7c0 .83-.67 1.5-1.5 1.5H4L1 13V2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,   label:'Chats',    active:view==='chats',    onClick:()=>onView('chats')},
    {id:'starred', icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.6 3.5 3.8.4-2.8 2.6.7 3.8L7 9.4l-3.3 1.9.7-3.8L1.6 4.9l3.8-.4L7 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>, label:'Starred',   active:view==='starred',  onClick:()=>onView('starred')},
    {id:'projects',icon:<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>, label:'Projects',  active:false,             onClick:()=>{}},
  ]

  const listToShow = view==='starred' ? starredConvs : []
  const grpsToShow = view==='chats' ? groups : {}

  return(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'rgba(9,9,18,0.9)',backdropFilter:'blur(24px)',borderRight:'1px solid rgba(255,255,255,0.07)'}}>

      {/* Logo */}
      <div style={{padding:'18px 18px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'11px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'10px',background:'linear-gradient(135deg,rgba(123,104,238,0.28),rgba(168,85,247,0.18))',backdropFilter:'blur(10px)',border:'1px solid rgba(123,104,238,0.28)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono,monospace',fontWeight:700,fontSize:'16px',color:'rgba(184,176,255,0.9)',flexShrink:0}}>V</div>
          <div>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontWeight:700,fontSize:'15px',letterSpacing:'0.1em',color:'rgba(255,255,255,0.88)'}}>VIGIL</div>
            <div style={{fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',fontFamily:'JetBrains Mono,monospace',marginTop:'1px'}}>NEURAL INTELLIGENCE</div>
          </div>
        </div>
      </div>

      {/* Top action buttons — like ChatGPT */}
      <div style={{padding:'10px 10px 4px',flexShrink:0}}>
        {NAV.map((n,i)=>(
          <button key={i} onClick={n.action} style={{width:'100%',display:'flex',alignItems:'center',gap:'11px',padding:'9px 12px',background:'transparent',border:'none',borderRadius:'10px',cursor:'pointer',color:'rgba(255,255,255,0.55)',fontSize:'13.5px',fontFamily:'inherit',fontWeight:500,transition:'all .15s',textAlign:'left',marginBottom:'2px'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}
          >
            <span style={{flexShrink:0,color:'rgba(255,255,255,0.4)'}}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      {/* Section tabs — like ChatGPT's Chats / Projects / Artifacts */}
      <div style={{padding:'8px 10px 6px',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',flexShrink:0}}>
        {SECTIONS.map((s,i)=>(
          <button key={i} onClick={s.onClick} style={{width:'100%',display:'flex',alignItems:'center',gap:'11px',padding:'8px 12px',background:s.active?'rgba(123,104,238,0.12)':'transparent',border:`1px solid ${s.active?'rgba(123,104,238,0.2)':'transparent'}`,borderRadius:'10px',cursor:'pointer',color:s.active?'rgba(184,176,255,0.9)':'rgba(255,255,255,0.45)',fontSize:'13.5px',fontFamily:'inherit',fontWeight:s.active?500:400,transition:'all .15s',textAlign:'left',marginBottom:'2px'}}
            onMouseEnter={e=>{if(!s.active)e.currentTarget.style.background='rgba(255,255,255,0.05)'}}
            onMouseLeave={e=>{if(!s.active)e.currentTarget.style.background='transparent'}}
          >
            <span style={{flexShrink:0,color:s.active?'rgba(184,176,255,0.7)':'rgba(255,255,255,0.32)'}}>{s.icon}</span>
            {s.label}
            {s.id==='starred'&&starredConvs.length>0&&<span style={{marginLeft:'auto',fontSize:'10px',padding:'1px 7px',background:'rgba(123,104,238,0.2)',borderRadius:'10px',color:'#9d8fff'}}>{starredConvs.length}</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{padding:'8px 10px 4px',flexShrink:0}}>
        <input value={search} onChange={e=>onSearch(e.target.value)} placeholder="Search conversations…"
          style={{width:'100%',padding:'7px 12px',background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',color:'rgba(255,255,255,0.65)',fontSize:'12.5px',fontFamily:'inherit',outline:'none',transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor='rgba(123,104,238,0.4)'}
          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}
        />
      </div>

      {/* Conversation list */}
      <div style={{flex:1,overflowY:'auto',padding:'4px 8px'}}>

        {/* Starred view */}
        {view==='starred'&&(
          starredConvs.length===0
            ?<div style={{padding:'28px 12px',textAlign:'center',color:'rgba(255,255,255,0.2)',fontSize:'12px',lineHeight:1.9}}><div style={{fontSize:'20px',marginBottom:'6px',opacity:.2}}>★</div>No starred messages yet</div>
            :<>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.22)',letterSpacing:'0.14em',padding:'8px 8px 4px',fontFamily:'JetBrains Mono,monospace',fontWeight:600}}>STARRED</div>
              {starredConvs.map(c=>ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete))}
            </>
        )}

        {/* Chats view */}
        {view==='chats'&&(
          convs.length===0
            ?<div style={{padding:'28px 12px',textAlign:'center',color:'rgba(255,255,255,0.2)',fontSize:'12px',lineHeight:1.9}}><div style={{fontSize:'20px',marginBottom:'6px',opacity:.2}}>💬</div>No conversations yet</div>
            :Object.entries(grpsToShow).map(([g,items])=>(
              <div key={g}>
                <div style={{fontSize:'10px',color:'rgba(255,255,255,0.22)',letterSpacing:'0.14em',padding:'10px 8px 4px',fontFamily:'JetBrains Mono,monospace',fontWeight:600}}>{g.toUpperCase()}</div>
                {items.map(c=>ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete))}
              </div>
            ))
        )}
      </div>

      {/* Footer status */}
      <div style={{margin:'8px',borderRadius:'12px',padding:'10px 14px',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.07)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'3px'}}>
          <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#34d399',animation:'pulse 2s ease-in-out infinite'}}/>
          <span style={{fontSize:'11px',color:'rgba(255,255,255,0.38)',fontFamily:'JetBrains Mono,monospace'}}>all systems live</span>
        </div>
        <div style={{fontSize:'10px',color:'rgba(255,255,255,0.16)',fontFamily:'JetBrains Mono,monospace'}}>EN · हि · free forever · {convs.length} chat{convs.length!==1?'s':''}</div>
      </div>
    </div>
  )
}

function ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete){
  const active=c.id===activeId
  return(
    <div key={c.id}
      onClick={()=>onSelect(c.id)}
      onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
      style={{display:'flex',alignItems:'center',gap:'9px',padding:'8px 10px',borderRadius:'10px',cursor:'pointer',marginBottom:'2px',background:active?'rgba(123,104,238,0.14)':hov===c.id?'rgba(255,255,255,0.04)':'transparent',border:`1px solid ${active?'rgba(123,104,238,0.22)':'transparent'}`,backdropFilter:active?'blur(10px)':'none',transition:'all .12s'}}>
      <div style={{width:'7px',height:'7px',borderRadius:'50%',flexShrink:0,background:active?'#7b68ee':'rgba(255,255,255,0.12)',transition:'background .2s'}}/>
      <span style={{flex:1,fontSize:'13px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:active?'rgba(184,176,255,0.9)':'rgba(255,255,255,0.45)'}}>{trunc(c.title,30)}</span>
      <div style={{display:'flex',gap:'2px',opacity:hov===c.id?1:0,transition:'opacity .12s',flexShrink:0}}>
        {[['⎘',()=>onExport(c.id),'rgba(184,176,255,0.8)'],['✕',()=>onDelete(c.id),'#f87171']].map(([ic,fn,hc],i)=>(
          <button key={i} onClick={e=>{e.stopPropagation();fn()}} style={{background:'none',border:'none',color:'rgba(255,255,255,0.25)',cursor:'pointer',fontSize:'12px',padding:'2px 5px',borderRadius:'5px',transition:'color .12s'}}
            onMouseEnter={e=>e.target.style.color=hc} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.25)'}>
            {ic}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Toast ───────────────────────────────────────────────────────────────── */
function Toast({msg}){
  if(!msg)return null
  return(
    <div style={{position:'fixed',bottom:'110px',left:'50%',transform:'translateX(-50%)',padding:'9px 20px',background:'rgba(123,104,238,0.14)',backdropFilter:'blur(16px)',border:'1px solid rgba(123,104,238,0.28)',borderRadius:'24px',fontSize:'12.5px',color:'rgba(184,176,255,0.9)',zIndex:1000,animation:'fadeUp .2s ease',whiteSpace:'nowrap',fontFamily:'JetBrains Mono,monospace',boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
      {msg}
    </div>
  )
}

/* ── Settings panel ──────────────────────────────────────────────────────── */
function Settings({open,onClose,model,onModel,temp,onTemp}){
  if(!open)return null
  return(
    <div style={{position:'fixed',inset:0,zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',animation:'fadeIn .2s ease'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:'360px',background:'rgba(14,14,24,0.96)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'22px',padding:'24px',animation:'popIn .2s ease',boxShadow:'0 24px 64px rgba(0,0,0,0.7)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'22px'}}>
          <span style={{fontWeight:600,fontSize:'15px',color:'rgba(255,255,255,0.88)'}}>Settings</span>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.5)',cursor:'pointer',width:'28px',height:'28px',borderRadius:'8px',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        </div>

        <div style={{marginBottom:'18px'}}>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',fontFamily:'JetBrains Mono,monospace',marginBottom:'8px'}}>DEFAULT MODEL</div>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>onModel(m.id)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 13px',background:m.id===model?'rgba(123,104,238,0.15)':'rgba(255,255,255,0.04)',border:`1px solid ${m.id===model?'rgba(123,104,238,0.3)':'rgba(255,255,255,0.07)'}`,borderRadius:'10px',cursor:'pointer',color:m.id===model?'#b8b0ff':'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'inherit',transition:'all .12s',textAlign:'left',marginBottom:'4px'}}>
              <span>{m.label}</span>
              <span style={{fontSize:'10px',padding:'2px 8px',background:'rgba(123,104,238,0.15)',borderRadius:'10px',color:'#9d8fff'}}>{m.badge}</span>
            </button>
          ))}
        </div>

        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',fontFamily:'JetBrains Mono,monospace'}}>TEMPERATURE</div>
            <span style={{fontSize:'12px',color:'#9d8fff',fontFamily:'JetBrains Mono,monospace'}}>{temp.toFixed(1)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.1" value={temp} onChange={e=>onTemp(parseFloat(e.target.value))}
            style={{width:'100%',accentColor:'#7b68ee'}}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',color:'rgba(255,255,255,0.2)',fontFamily:'JetBrains Mono,monospace',marginTop:'4px'}}>
            <span>precise</span><span>creative</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main App ─────────────────────────────────────────────────────────────── */
export default function Home(){
  const [convs,    setConvs]   = useState([])
  const [activeId, setActive]  = useState(null)
  const [input,    setInput]   = useState('')
  const [busy,     setBusy]    = useState(false)
  const [stream,   setStream]  = useState('')
  const [sidebar,  setSidebar] = useState(true)
  const [model,    setModel]   = useState('llama-3.3-70b-versatile')
  const [temp,     setTemp]    = useState(0.7)
  const [vlang,    setVlang]   = useState('en-US')
  const [starred,  setStarred] = useState({})
  const [toast,    setToast]   = useState(null)
  const [search,   setSearch]  = useState('')
  const [view,     setView]    = useState('chats')
  const [settings, setSettings]= useState(false)

  const endRef=useRef(null),taRef=useRef(null),abortRef=useRef(null)
  const active=convs.find(c=>c.id===activeId)
  const msgs=active?.messages||[]

  const notify=m=>{setToast(m);setTimeout(()=>setToast(null),2200)}

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs,stream])
  useEffect(()=>{
    if(taRef.current){taRef.current.style.height='auto';taRef.current.style.height=Math.min(taRef.current.scrollHeight,200)+'px'}
  },[input])

  const newConv=useCallback(()=>{
    const id=uid()
    setConvs(p=>[{id,title:'New chat',messages:[],at:new Date()},...p])
    setActive(id);setInput('');setView('chats')
  },[])

  const delConv=useCallback(id=>{
    setConvs(p=>p.filter(c=>c.id!==id))
    if(activeId===id)setActive(null)
  },[activeId])

  const doExport=useCallback(id=>{
    exportMd(convs.find(c=>c.id===id));notify('Exported ✓')
  },[convs])

  const copyMsg=useCallback(async t=>{
    try{await navigator.clipboard.writeText(t)}catch(_){}
    notify('Copied ✓')
  },[])

  const toggleStar=useCallback(id=>{
    setStarred(p=>{const n={...p,[id]:!p[id]};notify(n[id]?'Starred ★':'Unstarred');return n})
  },[])

  const send=useCallback(async(override)=>{
    const text=(override||input).trim()
    if(!text||busy)return
    setInput('');setBusy(true);setStream('')

    let cid=activeId,prev=active?.messages||[]
    if(!cid){
      cid=uid();prev=[]
      setConvs(p=>[{id:cid,title:text.length>46?text.slice(0,46)+'…':text,messages:[],at:new Date()},...p])
      setActive(cid)
    }

    const uMsg={role:'user',content:text,id:uid(),at:new Date()}
    const next=[...prev,uMsg]
    setConvs(p=>p.map(c=>c.id===cid?{...c,title:prev.length===0?(text.length>46?text.slice(0,46)+'…':text):c.title,messages:next}:c))

    abortRef.current=new AbortController()
    let acc=''
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next,model}),signal:abortRef.current.signal})
      if(!res.ok)throw new Error(`HTTP ${res.status}`)
      const reader=res.body.getReader(),dec=new TextDecoder()
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
    }catch(err){if(err.name!=='AbortError'){acc=`Error: ${err.message}`;setStream(acc)}}

    setConvs(p=>p.map(c=>c.id===cid?{...c,messages:[...next,{role:'assistant',content:acc||'(no response)',id:uid(),at:new Date()}]}:c))
    setStream('');setBusy(false)
  },[input,busy,activeId,active,model])

  const regen=useCallback(async()=>{
    if(!active||busy)return
    const idx=[...active.messages].reverse().findIndex(m=>m.role==='user')
    if(idx===-1)return
    const ri=active.messages.length-1-idx
    const t=active.messages.slice(0,ri+1)
    setConvs(p=>p.map(c=>c.id===activeId?{...c,messages:t}:c))
    await send(t[t.length-1].content)
  },[active,busy,activeId,send])

  const onKey=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}
  const canSend=input.trim().length>0&&!busy

  return(
    <div style={{display:'flex',height:'100dvh',background:'#0a0a10',overflow:'hidden',position:'relative'}}>
      <Aurora/>

      {/* Sidebar */}
      <div style={{width:sidebar?'260px':'0',minWidth:sidebar?'260px':'0',overflow:'hidden',transition:'all .28s cubic-bezier(.4,0,.2,1)',flexShrink:0,zIndex:10,position:'relative'}}>
        <Sidebar convs={convs} activeId={activeId} onNew={newConv} onSelect={setActive} onDelete={delConv} onExport={doExport} search={search} onSearch={setSearch} starred={starred} view={view} onView={setView}/>
      </div>

      {/* Main */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0,zIndex:5,position:'relative'}}>

        {/* Header */}
        <div style={{height:'54px',background:'rgba(9,9,16,0.75)',backdropFilter:'blur(24px)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',padding:'0 20px',gap:'12px',flexShrink:0}}>
          <button onClick={()=>setSidebar(!sidebar)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',padding:'7px',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
            onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.07)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='transparent'}}>
            <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="3" width="14" height="1.4" rx=".7"/><rect x="1" y="7.3" width="14" height="1.4" rx=".7"/><rect x="1" y="11.6" width="14" height="1.4" rx=".7"/></svg>
          </button>

          {!sidebar&&<div style={{display:'flex',alignItems:'center',gap:'9px',flexShrink:0}}>
            <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'linear-gradient(135deg,rgba(123,104,238,0.28),rgba(168,85,247,0.18))',backdropFilter:'blur(10px)',border:'1px solid rgba(123,104,238,0.28)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono,monospace',fontWeight:700,fontSize:'13px',color:'rgba(184,176,255,0.9)'}}>V</div>
            <span style={{fontFamily:'JetBrains Mono,monospace',fontWeight:700,fontSize:'14px',letterSpacing:'0.1em',color:'rgba(255,255,255,0.8)'}}>VIGIL</span>
          </div>}

          <div style={{flex:1,display:'flex',justifyContent:'center'}}>
            {active&&<span style={{fontSize:'13px',color:'rgba(255,255,255,0.25)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'400px',fontFamily:'JetBrains Mono,monospace'}}>{active.title}</span>}
          </div>

          <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
            <ModelPicker model={model} onChange={setModel}/>

            {active&&<button onClick={()=>doExport(activeId)} style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.09)',color:'rgba(255,255,255,0.35)',cursor:'pointer',fontSize:'13px',padding:'5px 12px',borderRadius:'20px',fontFamily:'inherit',transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.75)';e.currentTarget.style.background='rgba(255,255,255,0.09)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.35)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}>
              ⎘
            </button>}

            <button onClick={()=>setSettings(true)} style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.09)',color:'rgba(255,255,255,0.35)',cursor:'pointer',fontSize:'13px',padding:'5px 10px',borderRadius:'20px',fontFamily:'inherit',transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.75)';e.currentTarget.style.background='rgba(255,255,255,0.09)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.35)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}>
              ⚙
            </button>

            {busy&&<button onClick={()=>abortRef.current?.abort()} style={{background:'rgba(248,113,113,0.1)',backdropFilter:'blur(10px)',border:'1px solid rgba(248,113,113,0.25)',color:'#f87171',cursor:'pointer',fontSize:'12px',padding:'5px 13px',borderRadius:'20px',fontFamily:'inherit'}}>◼ stop</button>}

            <div style={{display:'flex',alignItems:'center',gap:'5px',padding:'4px 11px',background:'rgba(52,211,153,0.07)',backdropFilter:'blur(10px)',border:'1px solid rgba(52,211,153,0.18)',borderRadius:'20px'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#34d399',animation:'pulse 2s ease-in-out infinite'}}/>
              <span style={{fontSize:'11px',color:'rgba(52,211,153,0.9)',letterSpacing:'0.08em',fontFamily:'JetBrains Mono,monospace',fontWeight:600}}>LIVE</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:'auto'}}>
          {msgs.length===0&&!busy&&<Welcome onSend={send}/>}
          {msgs.map((msg,i)=><Msg key={msg.id} msg={msg} streaming={false} streamText="" onCopy={copyMsg} onStar={toggleStar} starred={!!starred[msg.id]} isLast={i===msgs.length-1} onRegen={regen}/>)}
          {busy&&<Msg msg={{role:'assistant',content:'',id:'__s__',at:new Date()}} streaming={true} streamText={stream} onCopy={()=>{}} onStar={()=>{}} starred={false} isLast={true} onRegen={()=>{}}/>}
          <div ref={endRef} style={{height:'28px'}}/>
        </div>

        {/* Input */}
        <div style={{padding:'14px 24px 22px',background:'rgba(9,9,16,0.75)',backdropFilter:'blur(24px)',borderTop:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
          <div style={{maxWidth:'860px',margin:'0 auto'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:'10px',background:'rgba(255,255,255,0.05)',backdropFilter:'blur(28px)',WebkitBackdropFilter:'blur(28px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'22px',padding:'12px 14px',transition:'border-color .25s, box-shadow .25s'}}
              onFocusCapture={e=>{e.currentTarget.style.borderColor='rgba(123,104,238,0.42)';e.currentTarget.style.boxShadow='0 0 0 4px rgba(123,104,238,0.07)'}}
              onBlurCapture={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.boxShadow='none'}}
            >
              <VoiceBtn onResult={t=>setInput(p=>p?p+' '+t:t)} disabled={busy} lang={vlang} onLangChange={setVlang}/>
              <textarea ref={taRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                placeholder="Message VIGIL… ask in English, हिंदी, or any language"
                disabled={busy} rows={1}
                style={{flex:1,background:'transparent',border:'none',outline:'none',color:'rgba(255,255,255,0.88)',fontSize:'15px',lineHeight:'1.65',resize:'none',fontFamily:'inherit',padding:0,maxHeight:'200px',overflowY:'auto',opacity:busy?0.5:1}}
              />
              {input.length>80&&<span style={{fontSize:'10px',color:'rgba(255,255,255,0.2)',fontFamily:'JetBrains Mono,monospace',flexShrink:0,alignSelf:'flex-end',paddingBottom:'1px'}}>{input.length}</span>}
              <button onClick={()=>send()} disabled={!canSend} style={{width:'40px',height:'40px',flexShrink:0,border:'none',borderRadius:'14px',cursor:canSend?'pointer':'not-allowed',background:canSend?'linear-gradient(135deg,#7b68ee,#9d8fff)':'rgba(255,255,255,0.06)',color:canSend?'#fff':'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',transition:'all .2s',boxShadow:canSend?'0 4px 20px rgba(123,104,238,0.38)':'none',transform:canSend?'scale(1)':'scale(0.92)'}}>
                {busy?<span style={{width:'16px',height:'16px',border:'2px solid rgba(255,255,255,0.25)',borderTopColor:'#fff',borderRadius:'50%',display:'block',animation:'spin .7s linear infinite'}}/>:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M8 3L3 8M8 3L13 8"/></svg>}
              </button>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'14px',marginTop:'9px'}}>
              {['Enter to send','Shift+Enter new line','🎙 voice input (Chrome/Edge)'].map((h,i)=>(
                <span key={i} style={{fontSize:'11px',color:'rgba(255,255,255,0.13)',fontFamily:'JetBrains Mono,monospace'}}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Settings open={settings} onClose={()=>setSettings(false)} model={model} onModel={setModel} temp={temp} onTemp={setTemp}/>
      <Toast msg={toast}/>
    </div>
  )
}