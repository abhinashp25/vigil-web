'use client'
import { useState } from 'react'

export default function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(code) } catch(_) {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div style={{ borderRadius:'12px', overflow:'hidden', margin:'12px 0', border:'1px solid rgba(0,212,170,0.2)', background:'#050510' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', background:'rgba(0,212,170,0.06)', borderBottom:'1px solid rgba(0,212,170,0.12)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ display:'flex', gap:'5px' }}>
            {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
              <div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, opacity:.7 }}/>
            ))}
          </div>
          <span style={{ fontSize:'11px', color:'#00d4aa', fontFamily:'JetBrains Mono, monospace', fontWeight:500, letterSpacing:'0.08em' }}>
            {lang || 'code'}
          </span>
        </div>
        <button onClick={copy} style={{
          background: copied ? 'rgba(0,212,170,0.15)' : 'none',
          border:`1px solid ${copied ? '#00d4aa' : 'rgba(0,212,170,0.2)'}`,
          color: copied ? '#00d4aa' : '#44445a',
          cursor:'pointer', fontSize:'11px', padding:'3px 12px',
          borderRadius:'20px', fontFamily:'inherit', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'5px'
        }}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      {/* Code */}
      <div style={{ overflowX:'auto', display:'flex' }}>
        {/* Line numbers */}
        <div style={{ padding:'14px 10px', background:'rgba(0,0,0,0.3)', borderRight:'1px solid rgba(0,212,170,0.06)', userSelect:'none', flexShrink:0, textAlign:'right' }}>
          {lines.map((_,i) => (
            <div key={i} style={{ fontSize:'12px', lineHeight:'1.7', color:'#22222e', fontFamily:'JetBrains Mono, monospace' }}>
              {i+1}
            </div>
          ))}
        </div>
        {/* Code content */}
        <pre style={{ margin:0, padding:'14px 16px', fontSize:'13px', lineHeight:'1.7', color:'#c8d3f5', fontFamily:'JetBrains Mono, monospace', whiteSpace:'pre', flex:1 }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}