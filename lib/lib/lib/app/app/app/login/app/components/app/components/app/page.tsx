'use client';
import { useEffect, useState } from 'react';
import Clock from './components/Clock';
import TwinFeed from './components/TwinFeed';

async function j(url: string, body?: unknown) { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body||{}) }); if (!r.ok) throw new Error(await res.text()); return r.json(); }

export default function Page() {
  const [session, setSession] = useState<any>(null);
  const [feed, setFeed] = useState<any[]>([]);
  const [human, setHuman] = useState(false);

  const start = (process.env.HUMAN_HOUR_START as any) || '20:00';
  const durationMin = Number((process.env.HUMAN_HOUR_DURATION_MIN as any) || 60);

  useEffect(()=>{ (async ()=>{
    const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ping:true }) });
    const s = r.ok ? await r.json() : null;
    if (!s?.ok || !s?.session?.userId) location.href = '/login';
    else setSession(s.session);
  })(); }, []);

  async function createPost(){
    const caption = prompt('מה תרצה לפרסם? (טקסט קצר)')?.trim();
    if (!caption) return;
    const post = await j('/api/posts/create', { caption });
    setFeed(f=>[post, ...f]);
  }

  return (
    <div className="wrapper">
      <div className="card" style={{marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><h1>Social Twin (MVP)</h1><div className="muted">ללא חיבורים חיצוניים. נתחיל בקטן.</div></div>
          <div style={{display:'flex', gap:8}}>
            <button className={human? '' : 'secondary'} onClick={()=>setHuman(h=>!h)}>{human? 'כבה Human Hour' : 'הפעל Human Hour'}</button>
            <a href="/api/logout" className="secondary" style={{textDecoration:'none',display:'inline-block',padding:'10px 14px',borderRadius:12}}>התנתק/י</a>
          </div>
        </div>
        <div style={{marginTop:10}}><Clock start={start} durationMin={durationMin} /></div>
      </div>

      <div className="card">
        <h3>פרסום</h3>
        <button onClick={createPost}>פרסם טקסט</button>
        <div className="small" style={{marginTop:8}}>תמונות ו-AI נוסיף בהמשך.</div>
      </div>

      <TwinFeed feed={feed} canReply={human} onHumanReply={async (postId, text)=>{
        const c = await j('/api/comments/create', { postId, text });
        setFeed(f=>{ const copy = f.map(p=>({...p})); const t = copy.find(p=>p.id===postId); if (t){ t.comments = t.comments||[]; t.comments.push(c); } return copy; });
      }} />
    </div>
  );
}
