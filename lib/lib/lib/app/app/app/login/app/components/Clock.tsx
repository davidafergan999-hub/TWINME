'use client';
import { useEffect, useMemo, useState } from 'react';

export default function Clock({ start = '20:00', durationMin = 60 }: { start?: string; durationMin?: number }) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(()=>{ const id = setInterval(()=>setNow(new Date()), 1000); return ()=>clearInterval(id); },[]);
  const { inWindow, nextStart, remaining } = useMemo(()=>{
    const [h,m] = start.split(':').map(Number);
    const s = new Date(now); s.setHours(h, m, 0, 0);
    const e = new Date(s.getTime() + durationMin*60000);
    const inW = now >= s && now <= e;
    const next = now > e ? new Date(s.getTime() + 24*3600*1000) : s;
    const rem = inW ? Math.max(0, e.getTime() - now.getTime()) : Math.max(0, next.getTime() - now.getTime());
    return { inWindow: inW, nextStart: next, remaining: rem };
  },[now, start, durationMin]);
  const fmt = (ms:number)=>{ const s=Math.floor(ms/1000); const h=Math.floor(s/3600); const m=Math.floor((s%3600)/60); const sec=s%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; };
  return (
    <div className="clock">
      <div className="time">השעה המקומית שלך: {now.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}</div>
      {inWindow ? <div className="window">Human Hour פתוח לעוד {fmt(remaining)}</div>
               : <div className="window">Human Hour ייפתח ב-{nextStart.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'})} (בעוד {fmt(remaining)})</div>}
    </div>
  );
}
