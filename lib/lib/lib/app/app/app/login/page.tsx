'use client';
import { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');
  return (
    <div className="wrapper">
      <div className="card">
        <h1>כניסה</h1>
        <p className="muted">אין גוגל, אין AI. רק בחירת שם ויאללה לפיד.</p>
        <label>שם תצוגה</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="דוד" />
        <div style={{marginTop:12}}>
          <button onClick={async ()=>{
            const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name }) });
            if (r.ok) location.href = '/'; else alert('שגיאה בכניסה');
          }}>היכנס/י</button>
        </div>
      </div>
    </div>
  );
}
