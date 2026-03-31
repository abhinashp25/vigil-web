'use client'
import {useState,useRef,useEffect,useCallback} from 'react'
import MessageContent from '../components/MessageContent'
import {uid,fmtTime,fmtDate,trunc,exportMd,MODELS,SUGGESTIONS,VOICE_LANGS} from '../lib/utils'

/* ── Constants ──────────────────────────────────────────────────────────── */
const MODES = [
  {id:'standard', label:'Standard Focus'},
  {id:'coder',    label:'Coder Focus'},
  {id:'creative', label:'Creative Focus'},
  {id:'socratic', label:'Socratic Focus'}
]

/* ── Aurora (Simplified for Gemini Aesthetic) ──────────────────────────────── */
function Aurora({theme='standard'}){
  return(
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden',transition:'background 1s ease', background:'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 60%)'}}>
    </div>
  )
}

/* ── Typing dots ─────────────────────────────────────────────────────────── */
function Dots(){
  return(
    <div style={{display:'flex',gap:'6px',alignItems:'center',padding:'6px 0'}}>
      {[0,1,2].map(i=><span key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:'#A8C7FA',display:'inline-block',animation:`dot 1s ease-in-out ${i*0.2}s infinite`}}/>)}
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
      <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',background:'rgba(255,255,255,0.05)',border:'none',borderRadius:'24px',cursor:'pointer',color:'#C4C7C5',fontSize:'13px',fontFamily:'inherit',fontWeight:500,transition:'all .2s'}}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
      >
        {cur.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open&&(
        <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,width:'220px',background:'#282A2E',borderRadius:'16px',overflow:'hidden',zIndex:300,animation:'popIn .15s ease',boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>{onChange(m.id);setOpen(false)}} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:m.id===model?'rgba(168,199,250,0.1)':'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,0.04)',cursor:'pointer',color:m.id===model?'#A8C7FA':'rgba(255,255,255,0.65)',fontSize:'13.5px',fontFamily:'inherit',transition:'all .12s',textAlign:'left'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              onMouseLeave={e=>e.currentTarget.style.background=m.id===model?'rgba(168,199,250,0.1)':'transparent'}
            >
              <span>{m.label}</span>
              <span style={{fontSize:'11px',padding:'2px 8px',background:'rgba(168,199,250,0.1)',borderRadius:'10px',color:'#A8C7FA'}}>{m.badge}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Voice input (Google-style full overlay) ────────────────────────────── */
function VoiceBtn({onResult,disabled,lang,onLangChange}){
  const [listening,setListening]=useState(false)
  const [interim,setInterim]=useState('')
  const [err,setErr]=useState(null)
  const [showLang,setShowLang]=useState(false)
  const [supported,setSupported]=useState(null)
  const recRef=useRef(null)
  const ref=useRef(null)

  useEffect(()=>{
    setSupported(!!(window.SpeechRecognition||window.webkitSpeechRecognition))
    const fn=e=>{if(ref.current&&!ref.current.contains(e.target))setShowLang(false)}
    document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)
  },[])

  const stop=useCallback(()=>{
    try{recRef.current?.stop()}catch(_){}
    recRef.current=null;setListening(false);setInterim('')
  },[])

  const start=useCallback(()=>{
    if(!supported){setErr('Voice requires Chrome or Edge');return}
    setErr(null);setInterim('')
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition
    const rec=new SR()
    rec.lang=lang;rec.continuous=true;rec.interimResults=true
    rec.onstart=()=>setListening(true)
    rec.onresult=e=>{
      let final='',inter=''
      for(let i=0;i<e.results.length;i++){
        const r=e.results[i]
        if(r.isFinal) final+=r[0].transcript
        else inter+=r[0].transcript
      }
      setInterim(final+inter)
      if(final){onResult(final);stop()}
    }
    rec.onerror=e=>{
      if(e.error!=='aborted'){
        const msgs={'not-allowed':'Allow microphone in browser settings','no-speech':'No speech detected — try again','network':'Network error'}
        setErr(msgs[e.error]||'Mic error: '+e.error)
      }
      stop()
    }
    rec.onend=()=>{
      if(recRef.current){
        const currentInterim=document.getElementById('vigil-interim')?.textContent||''
        if(currentInterim) onResult(currentInterim)
        stop()
      }
    }
    recRef.current=rec
    try{rec.start();setTimeout(()=>{if(recRef.current){const ci=document.getElementById('vigil-interim')?.textContent||'';if(ci)onResult(ci);stop()}},30000)}catch(e){setErr('Could not start mic');stop()}
  },[supported,lang,onResult,stop])

  const curLang=VOICE_LANGS.find(l=>l.code===lang)||VOICE_LANGS[0]

  return(
    <div ref={ref} style={{position:'relative',flexShrink:0}}>
      {/* Mic button */}
      <button onClick={listening?stop:start} disabled={disabled||supported===false} title={listening?'Stop':'Voice input'}
        style={{width:'38px',height:'38px',borderRadius:'50%',background:listening?'rgba(168,199,250,0.12)':'transparent',border:'none',color:listening?'#A8C7FA':'rgba(255,255,255,0.6)',cursor:disabled?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}
        onMouseEnter={e=>{if(!listening)e.currentTarget.style.background='rgba(255,255,255,0.05)'}}
        onMouseLeave={e=>{if(!listening)e.currentTarget.style.background='transparent'}}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>
      </button>

      {/* Language selector */}
      <button onClick={()=>setShowLang(!showLang)} style={{position:'absolute',top:'-2px',right:'-2px',width:'16px',height:'16px',borderRadius:'50%',background:'#282A2E',border:'none',color:'rgba(255,255,255,0.7)',cursor:'pointer',fontSize:'9px',display:'flex',alignItems:'center',justifyContent:'center'}}>{curLang.flag}</button>
      {showLang&&(
        <div style={{position:'absolute',bottom:'calc(100% + 8px)',left:'50%',transform:'translateX(-50%)',width:'160px',background:'#282A2E',borderRadius:'16px',overflow:'hidden',zIndex:500,animation:'popIn .15s ease',boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
          {VOICE_LANGS.map(l=>(
            <button key={l.code} onClick={()=>{onLangChange(l.code);setShowLang(false)}}
              style={{width:'100%',display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',background:l.code===lang?'rgba(168,199,250,0.1)':'transparent',border:'none',cursor:'pointer',color:l.code===lang?'#A8C7FA':'rgba(255,255,255,0.6)',fontSize:'13px',fontFamily:'inherit',transition:'all .12s',textAlign:'left'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              onMouseLeave={e=>e.currentTarget.style.background=l.code===lang?'rgba(168,199,250,0.1)':'transparent'}
            >{l.flag} <span>{l.label}</span>{l.code===lang&&<span style={{marginLeft:'auto',color:'#A8C7FA'}}>✓</span>}</button>
          ))}
        </div>
      )}

      {/* Full-screen Google-style listening overlay */}
      {listening&&(
        <div style={{position:'fixed',inset:0,zIndex:900,background:'rgba(19,19,20,0.95)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',animation:'fadeIn .2s ease'}}>
          {/* Animated rings */}
          <div style={{position:'relative',width:'120px',height:'120px',marginBottom:'32px'}}>
            <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'3px solid rgba(168,199,250,0.15)',animation:'pulse 1.5s ease-in-out infinite'}}/>
            <div style={{position:'absolute',inset:'15px',borderRadius:'50%',border:'3px solid rgba(168,199,250,0.25)',animation:'pulse 1.5s ease-in-out 0.3s infinite'}}/>
            <div style={{position:'absolute',inset:'30px',borderRadius:'50%',background:'rgba(168,199,250,0.12)',display:'flex',alignItems:'center',justifyContent:'center',animation:'pulse 1s ease-in-out infinite'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A8C7FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>
            </div>
          </div>
          
          <div style={{fontSize:'14px',color:'rgba(255,255,255,0.5)',marginBottom:'16px'}}>{curLang.label} · Listening…</div>
          
          {/* Live transcript */}
          <div id="vigil-interim" style={{fontSize:'22px',color:'#E3E3E3',fontWeight:400,maxWidth:'500px',textAlign:'center',minHeight:'34px',lineHeight:1.4}}>{interim||''}</div>

          {/* Cancel button */}
          <button onClick={stop} style={{marginTop:'40px',padding:'12px 32px',background:'rgba(255,255,255,0.06)',border:'none',borderRadius:'24px',color:'rgba(255,255,255,0.7)',fontSize:'14px',fontFamily:'inherit',cursor:'pointer',transition:'all .15s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
          >Cancel</button>
        </div>
      )}

      {/* Error tooltip */}
      {err&&<div style={{position:'absolute',bottom:'calc(100% + 8px)',left:'50%',transform:'translateX(-50%)',padding:'8px 14px',background:'#282A2E',borderRadius:'16px',fontSize:'12px',color:'#F2B8B5',maxWidth:'250px',lineHeight:'1.5',zIndex:200,boxShadow:'0 4px 16px rgba(0,0,0,0.4)',whiteSpace:'nowrap'}}>
        {err}
        <button onClick={()=>setErr(null)} style={{background:'none',border:'none',color:'#F2B8B5',cursor:'pointer',marginLeft:'8px',fontSize:'12px'}}>✕</button>
      </div>}
    </div>
  )
}

/* ── Message ─────────────────────────────────────────────────────────────── */
function Msg({msg,streaming,streamText,onCopy,onStar,starred,isLast,onRegen}){
  const [hov,setHov]=useState(false)
  const isUser=msg.role==='user'
  const text=streaming?streamText:msg.content
  
  if(isUser){
    return (
      <div style={{display:'flex',justifyContent:'flex-end',padding:'12px 24px',animation:'fadeUp .2s ease'}}>
         <div style={{background:'rgba(255,255,255,0.05)',padding:'12px 20px',borderRadius:'24px',border:'1px solid rgba(255,255,255,0.03)',maxWidth:'75%',color:'rgba(255,255,255,0.92)',fontSize:'15.5px',lineHeight:'1.6',whiteSpace:'pre-wrap'}}>{text}</div>
      </div>
    )
  }

  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:'flex',gap:'18px',padding:'24px 28px',position:'relative',animation:'fadeUp .22s ease'}}>
      {/* Avatar */}
      <div style={{width:'32px',height:'32px',borderRadius:'50%',flexShrink:0,marginTop:'2px',background:'linear-gradient(135deg, #A8C7FA, #D3E3FD)',display:'flex',alignItems:'center',justifyContent:'center',color:'#131314'}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
      </div>
      {/* Body */}
      <div style={{flex:1,minWidth:0,maxWidth:'840px',color:'rgba(255,255,255,0.85)',fontSize:'15.5px'}}>
        {streaming&&!streamText?<div style={{display:'flex',gap:'10px',alignItems:'center',marginTop:'6px'}}><Dots/><span style={{fontSize:'12.5px',color:'rgba(255,255,255,0.3)'}}>Thinking...</span></div>:<>
          <MessageContent text={text}/>
          {streaming&&<span style={{display:'inline-block',width:'4px',height:'16px',background:'#A8C7FA',marginLeft:'6px',verticalAlign:'text-bottom',animation:'blink .85s step-end infinite'}}/>}
        </>}
      </div>
      {/* Actions */}
      {!streaming&&hov&&(
        <div style={{position:'absolute',bottom:isLast?'-10px':'-18px',left:'60px',display:'flex',gap:'6px',animation:'fadeIn .15s ease'}}>
          {[
            {ic:'⎘',tt:'Copy',fn:()=>onCopy(text)},
            {ic:starred?'★':'☆',tt:starred?'Unstar':'Star',fn:()=>onStar(msg.id)},
            ...(!isUser&&isLast?[{ic:'↻',tt:'Regenerate',fn:onRegen}]:[])
          ].map((b,i)=>(
            <button key={i} onClick={b.fn} title={b.tt} style={{width:'32px',height:'32px',borderRadius:'50%',background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .12s'}}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.9)';e.currentTarget.style.background='rgba(255,255,255,0.08)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.5)';e.currentTarget.style.background='none'}}
            >{b.ic}</button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Welcome screen (Gemini Aesthetic) ───────────────────────────────────── */
function Welcome({onSend}){
  const [hov,setHov]=useState(null)
  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'70vh',padding:'40px 24px',animation:'fadeIn .5s ease'}}>
      <h1 style={{fontSize:'42px',fontWeight:500,background:'linear-gradient(90deg, #A8C7FA, #D3E3FD, #F2B8B5)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px',lineHeight:'1.2'}}>Hello, there</h1>
      <h2 style={{fontSize:'36px',fontWeight:400,color:'rgba(255,255,255,0.3)',marginBottom:'46px',lineHeight:'1.2'}}>How can I help you today?</h2>
      
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',maxWidth:'780px',width:'100%'}}>
        {SUGGESTIONS.map((s,i)=>(
          <button key={i} onClick={()=>onSend(s.text)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{padding:'18px',minWidth:'180px',maxWidth:'240px',background:hov===i?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)',borderRadius:'24px',cursor:'pointer',fontSize:'14.5px',textAlign:'left',color:hov===i?'rgba(255,255,255,0.92)':'rgba(255,255,255,0.7)',fontFamily:'inherit',display:'flex',flexDirection:'column',gap:'12px',transition:'all .2s',border:'none'}}>
            <span style={{fontSize:'18px',opacity:0.8}}>{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── SIDEBAR (Gemini Aesthetic) ───────────────────────────────────────────── */
function Sidebar({convs,activeId,onNew,onSelect,onDelete,onExport,search,onSearch,starred,view,onView}){
  const [hov,setHov]=useState(null)
  const starredConvs = convs.filter(c=>c.messages.some(m=>starred[m.id]))
  const recentConvs  = convs.filter(c=>c.title!=='New chat'||c.messages.length>0)
  const groups={}
  for(const c of recentConvs.filter(c=>c.title.toLowerCase().includes(search.toLowerCase()))){
    const g=fmtDate(c.at);if(!groups[g])groups[g]=[];groups[g].push(c)
  }
  const grpsToShow = view==='chats' ? groups : {}

  return(
    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',background:'#1E1F22',borderRight:'1px solid rgba(255,255,255,0.06)'}}>
      {/* New Chat Button */}
      <div style={{padding:'16px 14px 8px',flexShrink:0}}>
        <button onClick={onNew} style={{width:'100%',display:'flex',alignItems:'center',gap:'10px',padding:'12px 16px',background:'rgba(255,255,255,0.05)',border:'none',borderRadius:'24px',cursor:'pointer',color:'#E3E3E3',fontSize:'14px',fontFamily:'inherit',fontWeight:500,transition:'all .15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          New chat
        </button>
      </div>

      {/* Section tabs */}
      <div style={{padding:'4px 10px 6px',flexShrink:0,display:'flex',gap:'4px'}}>
        {[
          {id:'chats',label:'Recents',active:view==='chats',onClick:()=>onView('chats')},
          {id:'starred',label:'Starred',active:view==='starred',onClick:()=>onView('starred')},
        ].map(s=>(
          <button key={s.id} onClick={s.onClick} style={{flex:1,padding:'8px',background:s.active?'rgba(168,199,250,0.12)':'transparent',border:'none',borderRadius:'12px',cursor:'pointer',color:s.active?'#A8C7FA':'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'inherit',fontWeight:500,transition:'all .15s'}}
            onMouseEnter={e=>{if(!s.active)e.currentTarget.style.background='rgba(255,255,255,0.04)'}}
            onMouseLeave={e=>{if(!s.active)e.currentTarget.style.background='transparent'}}
          >{s.label}{s.id==='starred'&&starredConvs.length>0?` (${starredConvs.length})`:''}</button>
        ))}
      </div>

      {/* Search */}
      <div style={{padding:'6px 12px',flexShrink:0}}>
        <input value={search} onChange={e=>onSearch(e.target.value)} placeholder="Search…"
          style={{width:'100%',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'none',borderRadius:'20px',color:'rgba(255,255,255,0.7)',fontSize:'13px',fontFamily:'inherit',outline:'none',transition:'background .2s'}}
          onFocus={e=>e.target.style.background='rgba(255,255,255,0.07)'}
          onBlur={e=>e.target.style.background='rgba(255,255,255,0.04)'}
        />
      </div>

      {/* Conversation list */}
      <div style={{flex:1,overflowY:'auto',padding:'4px 8px'}}>
        {view==='starred'&&(starredConvs.length===0
          ?<div style={{padding:'32px 12px',textAlign:'center',color:'rgba(255,255,255,0.25)',fontSize:'13px'}}>No starred messages</div>
          :starredConvs.map(c=>ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete))
        )}
        {view==='chats'&&(convs.length===0
          ?<div style={{padding:'32px 12px',textAlign:'center',color:'rgba(255,255,255,0.25)',fontSize:'13px'}}>No conversations yet</div>
          :Object.entries(grpsToShow).map(([g,items])=>(
            <div key={g}>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',padding:'12px 10px 4px',fontWeight:500}}>{g}</div>
              {items.map(c=>ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete))}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#6DD68C',animation:'pulse 2s ease-in-out infinite'}}/>
          <span style={{fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>VIGIL · Free forever</span>
        </div>
      </div>
    </div>
  )
}

function ConvItem(c,activeId,hov,setHov,onSelect,onExport,onDelete){
  const active=c.id===activeId
  return(
    <div key={c.id} onClick={()=>onSelect(c.id)}
      onMouseEnter={()=>setHov(c.id)} onMouseLeave={()=>setHov(null)}
      style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',borderRadius:'16px',cursor:'pointer',marginBottom:'2px',background:active?'rgba(168,199,250,0.12)':hov===c.id?'rgba(255,255,255,0.04)':'transparent',border:'none',transition:'all .12s'}}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active?'#A8C7FA':'rgba(255,255,255,0.3)'} strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      <span style={{flex:1,fontSize:'14px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:active?'#E3E3E3':'rgba(255,255,255,0.6)'}}>{trunc(c.title,28)}</span>
      <div style={{display:'flex',gap:'2px',opacity:hov===c.id?1:0,transition:'opacity .12s',flexShrink:0}}>
        {[['⎘',()=>onExport(c.id)],['✕',()=>onDelete(c.id)]].map(([ic,fn],i)=>(
          <button key={i} onClick={e=>{e.stopPropagation();fn()}} style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'12px',padding:'2px 5px',borderRadius:'50%',transition:'all .12s'}}
            onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.8)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.3)'}>{ic}</button>
        ))}
      </div>
    </div>
  )
}

/* ── Toast ───────────────────────────────────────────────────────────────── */
function Toast({msg}){
  if(!msg)return null
  return(
    <div style={{position:'fixed',bottom:'110px',left:'50%',transform:'translateX(-50%)',padding:'10px 22px',background:'#282A2E',borderRadius:'28px',fontSize:'13px',color:'#E3E3E3',zIndex:1000,animation:'fadeUp .2s ease',whiteSpace:'nowrap',fontFamily:'inherit',boxShadow:'0 4px 20px rgba(0,0,0,0.5)'}}>
      {msg}
    </div>
  )
}

function Settings({open,onClose,model,onModel,temp,onTemp,mode,onMode,onClear}){
  if(!open)return null
  return(
    <div style={{position:'fixed',inset:0,zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.55)',animation:'fadeIn .2s ease'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:'380px',background:'#282A2E',borderRadius:'28px',padding:'28px',animation:'popIn .2s ease',boxShadow:'0 16px 48px rgba(0,0,0,0.6)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <span style={{fontWeight:600,fontSize:'18px',color:'#E3E3E3'}}>Settings</span>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.06)',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',width:'32px',height:'32px',borderRadius:'50%',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
          >✕</button>
        </div>

        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',fontWeight:500,marginBottom:'10px'}}>Model</div>
          {MODELS.map(m=>(
            <button key={m.id} onClick={()=>onModel(m.id)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',background:m.id===model?'rgba(168,199,250,0.12)':'rgba(255,255,255,0.03)',border:'none',borderRadius:'14px',cursor:'pointer',color:m.id===model?'#A8C7FA':'rgba(255,255,255,0.6)',fontSize:'14px',fontFamily:'inherit',transition:'all .12s',textAlign:'left',marginBottom:'4px'}}>
              <span>{m.label}</span>
              <span style={{fontSize:'11px',padding:'3px 10px',background:'rgba(168,199,250,0.1)',borderRadius:'12px',color:'#A8C7FA'}}>{m.badge}</span>
            </button>
          ))}
        </div>

        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',fontWeight:500}}>Temperature</div>
            <span style={{fontSize:'13px',color:'#A8C7FA',fontWeight:500}}>{temp.toFixed(1)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.1" value={temp} onChange={e=>onTemp(parseFloat(e.target.value))}
            style={{width:'100%',accentColor:'#A8C7FA'}}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.25)',marginTop:'4px'}}>
            <span>Precise</span><span>Creative</span>
          </div>
        </div>

        <div style={{marginBottom:'20px',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'20px'}}>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',fontWeight:500,marginBottom:'10px'}}>Focus Mode</div>
          {MODES.map(m=>(
            <button key={m.id} onClick={()=>onMode(m.id)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',background:m.id===mode?'rgba(109,214,140,0.12)':'rgba(255,255,255,0.03)',border:'none',borderRadius:'14px',cursor:'pointer',color:m.id===mode?'#6DD68C':'rgba(255,255,255,0.6)',fontSize:'14px',fontFamily:'inherit',transition:'all .12s',textAlign:'left',marginBottom:'4px'}}>
              <span>{m.label}</span>
              {m.id===mode&&<span style={{fontSize:'14px'}}>✓</span>}
            </button>
          ))}
        </div>

        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'20px'}}>
           <button onClick={()=>{onClear();onClose()}} style={{width:'100%',padding:'12px',background:'rgba(242,184,181,0.08)',border:'none',borderRadius:'14px',color:'#F2B8B5',cursor:'pointer',fontSize:'14px',fontFamily:'inherit',transition:'all .15s'}}
             onMouseEnter={e=>e.currentTarget.style.background='rgba(242,184,181,0.14)'}
             onMouseLeave={e=>e.currentTarget.style.background='rgba(242,184,181,0.08)'}
           >Clear All Data</button>
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
  const [mode,     setMode]    = useState('standard')
  const [init,     setInit]    = useState(false)

  const endRef=useRef(null),taRef=useRef(null),abortRef=useRef(null),fileRef=useRef(null)
  const [attachedFile,setAttachedFile]=useState(null) // {name,type,dataUrl,isImage}
  const active=convs.find(c=>c.id===activeId)
  const msgs=active?.messages||[]

  const notify=m=>{setToast(m);setTimeout(()=>setToast(null),2200)}

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs,stream])
  useEffect(()=>{
    if(taRef.current){taRef.current.style.height='auto';taRef.current.style.height=Math.min(taRef.current.scrollHeight,200)+'px'}
  },[input])

  useEffect(()=>{
    if(typeof window!=='undefined'){
      try{
        const savedConvs=localStorage.getItem('vigil_convs'), savedStarred=localStorage.getItem('vigil_star'), savedId=localStorage.getItem('vigil_active'), savedMode=localStorage.getItem('vigil_mode')
        if(savedConvs) setConvs(JSON.parse(savedConvs).map(c=>({...c,at:new Date(c.at),messages:c.messages.map(m=>({...m,at:new Date(m.at)}))})))
        if(savedStarred) setStarred(JSON.parse(savedStarred))
        if(savedId) setActive(savedId)
        if(savedMode) setMode(savedMode)
      }catch(e){}
      setInit(true)
    }
  },[])

  useEffect(()=>{
    if(init && typeof window!=='undefined'){
      localStorage.setItem('vigil_convs',JSON.stringify(convs))
      localStorage.setItem('vigil_star',JSON.stringify(starred))
      if(activeId) localStorage.setItem('vigil_active',activeId)
      else localStorage.removeItem('vigil_active')
      localStorage.setItem('vigil_mode',mode)
    }
  },[convs,starred,activeId,mode,init])

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

  const clearData=useCallback(()=>{
    if(confirm('Are you sure you want to clear all data? This cannot be undone.')){
      setConvs([]); setActive(null); setStarred({}); setMode('standard')
      localStorage.removeItem('vigil_convs'); localStorage.removeItem('vigil_star'); localStorage.removeItem('vigil_active')
      notify('All data cleared')
    }
  },[])

  const send=useCallback(async(override)=>{
    const text=(override||input).trim()
    const hasAttachment=!!attachedFile
    if(!text&&!hasAttachment||busy)return
    const imageData=attachedFile?.isImage?attachedFile.dataUrl:null
    setInput('');setAttachedFile(null);setBusy(true);setStream('')

    let cid=activeId,prev=active?.messages||[]
    if(!cid){
      cid=uid();prev=[]
      setConvs(p=>[{id:cid,title:text.length>46?text.slice(0,46)+'…':text,messages:[],at:new Date()},...p])
      setActive(cid)
    }

    const msgText=text||(attachedFile?.name?`Analyze this image: ${attachedFile.name}`:'')
    const uMsg={role:'user',content:msgText,id:uid(),at:new Date(),...(imageData?{imageData}:{})}
    const next=[...prev,uMsg]
    const titleText=msgText.length>46?msgText.slice(0,46)+'…':msgText
    setConvs(p=>p.map(c=>c.id===cid?{...c,title:prev.length===0?titleText:c.title,messages:next}:c))

    abortRef.current=new AbortController()
    let acc=''
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next,model,mode}),signal:abortRef.current.signal})
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
  },[input,busy,activeId,active,model,mode])

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
    <div style={{display:'flex',height:'100dvh',background:'#131314',overflow:'hidden',position:'relative'}}>
      {init && <Aurora theme={mode}/>}

      {/* Sidebar */}
      <div style={{width:sidebar?'270px':'0',minWidth:sidebar?'270px':'0',overflow:'hidden',transition:'all .28s cubic-bezier(.4,0,.2,1)',flexShrink:0,zIndex:10,position:'relative'}}>
        <Sidebar convs={convs} activeId={activeId} onNew={newConv} onSelect={setActive} onDelete={delConv} onExport={doExport} search={search} onSearch={setSearch} starred={starred} view={view} onView={setView}/>
      </div>

      {/* Main */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0,zIndex:5,position:'relative'}}>

        {/* Header */}
        <div style={{height:'56px',background:'transparent',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px',flexShrink:0}}>
          <button onClick={()=>setSidebar(!sidebar)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',padding:'8px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>

          {!sidebar&&<span style={{fontSize:'18px',fontWeight:500,color:'#E3E3E3',letterSpacing:'-0.01em'}}>VIGIL</span>}

          <div style={{flex:1}}/>

          <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}>
            <ModelPicker model={model} onChange={setModel}/>

            {active&&<button onClick={()=>doExport(activeId)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',padding:'8px',borderRadius:'50%',transition:'all .15s',display:'flex',alignItems:'center',justifyContent:'center'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </button>}

            <button onClick={()=>setSettings(true)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.5)',cursor:'pointer',padding:'8px',borderRadius:'50%',transition:'all .15s',display:'flex',alignItems:'center',justifyContent:'center'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </button>

            {busy&&<button onClick={()=>abortRef.current?.abort()} style={{background:'rgba(242,184,181,0.08)',border:'none',color:'#F2B8B5',cursor:'pointer',fontSize:'13px',padding:'8px 16px',borderRadius:'24px',fontFamily:'inherit',transition:'all .15s',display:'flex',alignItems:'center',gap:'6px'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(242,184,181,0.14)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(242,184,181,0.08)'}
            ><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>Stop</button>}
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
        <div style={{padding:'14px 24px 28px',background:'transparent',flexShrink:0}}>
          <div style={{maxWidth:'860px',margin:'0 auto'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:'10px',background:'rgba(255,255,255,0.04)',borderRadius:'28px',padding:'12px 14px',transition:'all .25s',boxShadow:'0 2px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.02)'}}
              onFocusCapture={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.05)'}}
              onBlurCapture={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.02)'}}
            >
              <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
                {/* Attachment button */}
                <input ref={fileRef} type="file" accept="image/*,.pdf,.txt,.md,.csv,.json,.js,.py,.ts,.tsx,.html,.css" style={{display:'none'}} onChange={e=>{
                  const f=e.target.files?.[0]
                  if(!f)return
                  const maxMB=5
                  if(f.size>maxMB*1024*1024){notify(`File too large (max ${maxMB}MB)`);return}
                  setAttachedFile(f)
                  if(f.type.startsWith('text/')||f.name.endsWith('.md')||f.name.endsWith('.json')||f.name.endsWith('.js')||f.name.endsWith('.py')||f.name.endsWith('.ts')||f.name.endsWith('.html')||f.name.endsWith('.css')||f.name.endsWith('.csv')){
                    const reader=new FileReader()
                    reader.onload=ev=>{
                      const content=ev.target.result
                      setInput(p=>`${p?p+'\n\n':''}[File: ${f.name}]\n\`\`\`\n${content.slice(0,8000)}\n\`\`\``)
                    }
                    reader.readAsText(f)
                  } else {
                    setInput(p=>`${p?p+'\n\n':''}[Attached: ${f.name}]`)
                  }
                  notify(`📎 ${f.name}`)
                  e.target.value=''
                }}/>
                <button onClick={()=>fileRef.current?.click()} disabled={busy} title="Attach file" style={{width:'38px',height:'38px',borderRadius:'50%',background:attachedFile?'rgba(168,199,250,0.12)':'transparent',border:'none',color:attachedFile?'#A8C7FA':'rgba(255,255,255,0.6)',cursor:busy?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}
                  onMouseEnter={e=>{if(!attachedFile)e.currentTarget.style.background='rgba(255,255,255,0.05)'}}
                  onMouseLeave={e=>{if(!attachedFile)e.currentTarget.style.background='transparent'}}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                </button>
                <VoiceBtn onResult={t=>setInput(p=>p?p+' '+t:t)} disabled={busy} lang={vlang} onLangChange={setVlang}/>
              </div>
              
              <textarea ref={taRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                placeholder="Enter a prompt here"
                disabled={busy} rows={1}
                style={{flex:1,background:'transparent',border:'none',outline:'none',color:'rgba(255,255,255,0.92)',fontSize:'16px',lineHeight:'1.5',resize:'none',fontFamily:'inherit',padding:'7px 8px',maxHeight:'200px',overflowY:'auto',opacity:busy?0.5:1}}
              />
              
              <button onClick={()=>send()} disabled={!canSend} style={{width:'42px',height:'42px',flexShrink:0,border:'none',borderRadius:'50%',cursor:canSend?'pointer':'not-allowed',background:canSend?'#A8C7FA':'rgba(255,255,255,0.04)',color:canSend?'#131314':'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',transition:'all .2s'}}>
                {busy?<span style={{width:'18px',height:'18px',border:'2px solid rgba(19,19,20,0.2)',borderTopColor:'#131314',borderRadius:'50%',display:'block',animation:'spin .7s linear infinite'}}/>:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>}
              </button>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'14px',marginTop:'12px'}}>
              {['VIGIL may display inaccurate info, so double-check its responses.'].map((h,i)=>(
                <span key={i} style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',fontFamily:'inherit'}}>{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Settings open={settings} onClose={()=>setSettings(false)} model={model} onModel={setModel} temp={temp} onTemp={setTemp} mode={mode} onMode={setMode} onClear={clearData}/>
      <Toast msg={toast}/>
    </div>
  )
}