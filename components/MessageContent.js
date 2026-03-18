'use client'
import CodeBlock from './CodeBlock'
import { parseContent, parseBold } from '../lib/utils'

function TextLine({ text }) {
  return <>
    {parseBold(text).map((s,i) =>
      s.bold
        ? <strong key={i} style={{ fontWeight:600, color:'#6ee7cc' }}>{s.text}</strong>
        : <span key={i}>{s.text}</span>
    )}
  </>
}

function TextBlock({ value }) {
  const lines=value.split('\n'), out=[]
  let para=[]
  const flush=()=>{
    if(!para.length) return
    out.push(<p key={out.length} style={{ margin:'0 0 10px', lineHeight:'1.85', color:'#ddddef', fontSize:'14.5px' }}>
      {para.map((l,i)=><span key={i}>{i>0&&<br/>}<TextLine text={l}/></span>)}
    </p>)
    para=[]
  }
  for(const line of lines){
    if(!line.trim()){ flush() }
    else if(/^#{1,3}\s/.test(line)){
      flush()
      out.push(<p key={out.length} style={{ fontSize:'16px', fontWeight:600, color:'#eeeef8', margin:'16px 0 8px', paddingBottom:'6px', borderBottom:'1px solid rgba(0,212,170,0.15)' }}>
        <TextLine text={line.replace(/^#{1,3}\s/,'')}/>
      </p>)
    } else if(/^\d+\.\s/.test(line)){
      flush()
      out.push(<div key={out.length} style={{ display:'flex', gap:'10px', margin:'4px 0', alignItems:'flex-start' }}>
        <span style={{ color:'#00d4aa', fontFamily:'JetBrains Mono,monospace', fontSize:'12px', fontWeight:500, marginTop:'3px', flexShrink:0, minWidth:'18px' }}>{line.match(/^\d+/)[0]}.</span>
        <p style={{ margin:0, lineHeight:'1.8', color:'#ddddef', fontSize:'14.5px' }}><TextLine text={line.replace(/^\d+\.\s/,'')}/></p>
      </div>)
    } else if(/^[-•]\s/.test(line)){
      flush()
      out.push(<div key={out.length} style={{ display:'flex', gap:'10px', margin:'3px 0', alignItems:'flex-start' }}>
        <span style={{ color:'#00d4aa', fontSize:'16px', lineHeight:'1.5', flexShrink:0 }}>›</span>
        <p style={{ margin:0, lineHeight:'1.8', color:'#ddddef', fontSize:'14.5px' }}><TextLine text={line.replace(/^[-•]\s/,'')}/></p>
      </div>)
    } else { para.push(line) }
  }
  flush()
  return <>{out}</>
}

export default function MessageContent({ text }) {
  const parts = parseContent(text)
  return (
    <div style={{ minWidth:0 }}>
      {parts.map((p,i) =>
        p.type==='code'
          ? <CodeBlock key={i} lang={p.lang} code={p.value}/>
          : <TextBlock key={i} value={p.value}/>
      )}
    </div>
  )
}