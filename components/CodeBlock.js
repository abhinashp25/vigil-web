'use client'
import { useState } from 'react'

export default function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(code) } catch (_) {}
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      borderRadius: '16px', overflow: 'hidden', margin: '14px 0',
      background: 'rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
              <div key={i} style={{ width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.8 }}/>
            ))}
          </div>
          <span style={{ fontSize:'11px', color:'rgba(123,104,238,0.9)', fontFamily:'JetBrains Mono,monospace', fontWeight:600, letterSpacing:'0.1em' }}>
            {lang || 'code'}
          </span>
        </div>
        <button onClick={copy} style={{
          background: copied ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${copied ? 'rgba(52,211,153,0.35)' : 'rgba(255,255,255,0.1)'}`,
          color: copied ? '#34d399' : 'rgba(255,255,255,0.35)',
          cursor: 'pointer', fontSize: '11px', padding: '4px 14px',
          borderRadius: '20px', fontFamily: 'inherit', transition: 'all .2s',
          display: 'flex', alignItems: 'center', gap: '5px'
        }}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        <div style={{
          padding: '14px 12px', userSelect: 'none', flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.04)', textAlign: 'right',
          minWidth: '40px',
        }}>
          {code.split('\n').map((_,i)=>(
            <div key={i} style={{ fontSize:'12px', lineHeight:'1.75', color:'rgba(255,255,255,0.15)', fontFamily:'JetBrains Mono,monospace' }}>
              {i+1}
            </div>
          ))}
        </div>
        <pre style={{ margin:0, padding:'14px 18px', fontSize:'13px', lineHeight:'1.75', color:'#c8d3f5', fontFamily:'JetBrains Mono,monospace', whiteSpace:'pre', flex:1 }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}