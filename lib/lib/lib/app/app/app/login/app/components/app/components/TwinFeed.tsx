'use client';
export default function TwinFeed({ feed, onHumanReply, canReply }: { feed: any[]; onHumanReply: (postId: string, text: string)=>void; canReply: boolean }){
  return (
    <div className="card">
      <h3>פיד</h3>
      <div className="feed">
        {feed.length===0 && <div className="small">הפיד ריק עדיין…</div>}
        {feed.map((p)=> (
          <div key={p.id} className="post">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <strong>{p.ownerName}</strong>
              <div className="small">{new Date(p.createdAt).toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'})}</div>
            </div>
            <div style={{marginTop:8}}>{p.caption}</div>
            <div style={{marginTop:8}}>
              <button disabled={!canReply} className={canReply? '' : 'secondary'} onClick={()=>{
                const text = prompt('כתבו תגובה קצרה:')?.trim(); if (!text) return; onHumanReply(p.id, text);
              }}>{canReply? 'הגב/י (Human Hour)' : 'תגובה זמינה רק ב-Human Hour'}</button>
            </div>
            <div>
              {(p.comments||[]).map((c:any)=> (
                <div key={c.id} className="comment">
                  <div className="small">{new Date(c.createdAt).toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'})} — <strong>{c.authorName}</strong></div>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
