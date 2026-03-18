'use client'
import CodeBlock from './CodeBlock'
import { parseContent, parseBold } from '../lib/utils'

function Inline({ text }) {
  return <>
    {parseBold(text).map((s,i) =>
      s.bold
        ? <strong key={i} style={{ fontWeight:600, color:'#b8b0ff' }}>{s.text}</strong>
        : <span key={i}>{s.text}</span>
    )}
  </>
}

function TextBlock({ value }) {
  const lines = value.split('\n'), out = []
  let para = []

  const flush = () => {
    if (!para.length) return
    out.push(
      <p key={out.length} style={{ margin:'0 0 12px', lineHeight:'1.85', color:'rgba(242,242,255,0.88)', fontSize:'15px' }}>
        {para.map((l,i) => <span key={i}>{i>0&&<br/>}<Inline text={l}/></span>)}
      </p>
    )
    para = []
  }

  for (const line of lines) {
    if (!line.trim()) { flush(); continue }

    if (/^#{1,3}\s/.test(line)) {
      flush()
      const lvl = line.match(/^(#{1,3})/)[0].length
      out.push(<p key={out.length} style={{ fontSize: lvl===1?'19px':lvl===2?'17px':'15.5px', fontWeight:600, color:'#f2f2ff', margin:'20px 0 8px', paddingBottom:'8px', borderBottom:'1px solid rgba(255,255,255,0.07)', letterSpacing:'-0.01em' }}>
        <Inline text={line.replace(/^#{1,3}\s/,'')}/>
      </p>)
    } else if (/^\d+\.\s/.test(line)) {
      flush()
      out.push(<div key={out.length} style={{ display:'flex', gap:'12px', margin:'5px 0' }}>
        <span style={{ color:'#7b68ee', fontFamily:'JetBrains Mono,monospace', fontSize:'12px', fontWeight:600, marginTop:'4px', flexShrink:0, minWidth:'20px' }}>
          {line.match(/^\d+/)[0]}.
        </span>
        <p style={{ margin:0, lineHeight:'1.82', color:'rgba(242,242,255,0.88)', fontSize:'15px' }}>
          <Inline text={line.replace(/^\d+\.\s/,'')}/>
        </p>
      </div>)
    } else if (/^[-•*]\s/.test(line)) {
      flush()
      out.push(<div key={out.length} style={{ display:'flex', gap:'12px', margin:'4px 0' }}>
        <span style={{ color:'#7b68ee', fontSize:'8px', marginTop:'8px', flexShrink:0 }}>◆</span>
        <p style={{ margin:0, lineHeight:'1.82', color:'rgba(242,242,255,0.88)', fontSize:'15px' }}>
          <Inline text={line.replace(/^[-•*]\s/,'')}/>
        </p>
      </div>)
    } else if (/^>\s/.test(line)) {
      flush()
      out.push(<blockquote key={out.length} style={{ margin:'10px 0', paddingLeft:'14px', borderLeft:'3px solid rgba(123,104,238,0.5)', color:'rgba(242,242,255,0.55)', fontSize:'14.5px', fontStyle:'italic' }}>
        <Inline text={line.replace(/^>\s/,'')}/>
      </blockquote>)
    } else {
      para.push(line)
    }
  }
  flush()
  return <>{out}</>
}

export default function MessageContent({ text }) {
  return (
    <div style={{ minWidth:0 }}>
      {parseContent(text).map((p,i) =>
        p.type === 'code'
          ? <CodeBlock key={i} lang={p.lang} code={p.value}/>
          : <TextBlock key={i} value={p.value}/>
      )}
    </div>
  )
}