'use client'
import {useState} from 'react'
export default function CodeBlock({lang,code}){
  const [cp,setCp]=useState(false)
  const copy=async()=>{try{await navigator.clipboard.writeText(code)}catch(_){}setCp(true);setTimeout(()=>setCp(false),2000)}
  return(
    <div style={{borderRadius:'16px',overflow:'hidden',margin:'14px 0',background:'rgba(0,0,0,0.55)',border:'1px solid rgba(255,255,255,0.07)',backdropFilter:'blur(10px)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 16px',background:'rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{display:'flex',gap:'5px'}}>{['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.8}}/>)}</div>
          <span style={{fontSize:'11px',color:'rgba(123,104,238,0.85)',fontFamily:'JetBrains Mono,monospace',fontWeight:600,letterSpacing:'0.08em'}}>{lang||'code'}</span>
        </div>
        <button onClick={copy} style={{background:cp?'rgba(52,211,153,0.12)':'rgba(255,255,255,0.05)',border:`1px solid ${cp?'rgba(52,211,153,0.35)':'rgba(255,255,255,0.09)'}`,color:cp?'#34d399':'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'11px',padding:'3px 13px',borderRadius:'20px',fontFamily:'inherit',transition:'all .2s'}}>
          {cp?'✓ copied':'copy'}
        </button>
      </div>
      <div style={{display:'flex',overflowX:'auto'}}>
        <div style={{padding:'14px 12px',userSelect:'none',flexShrink:0,borderRight:'1px solid rgba(255,255,255,0.04)',textAlign:'right',minWidth:'42px'}}>
          {code.split('\n').map((_,i)=><div key={i} style={{fontSize:'12px',lineHeight:'1.75',color:'rgba(255,255,255,0.14)',fontFamily:'JetBrains Mono,monospace'}}>{i+1}</div>)}
        </div>
        <pre style={{margin:0,padding:'14px 18px',fontSize:'13px',lineHeight:'1.75',color:'#c8d3f5',fontFamily:'JetBrains Mono,monospace',whiteSpace:'pre',flex:1}}><code>{code}</code></pre>
      </div>
    </div>
  )
}