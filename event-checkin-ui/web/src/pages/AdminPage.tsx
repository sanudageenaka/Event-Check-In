
import React, { useState } from 'react';
import { api } from '../lib/api';

export default function AdminPage() {
  const [count, setCount] = useState(15);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function seed() {
    setMsg(null); setErr(null);
    try {
      const res = await api(`/tickets/seed?count=${count}`, { method: 'POST' });
      setMsg(`Seeded ${res.created} tickets.`);
    } catch (e:any) {
      setErr(e.message);
    }
  }

  return (
    <div className="card" style={{padding:16, maxWidth:480}}>
      <h2>Admin</h2>
      <label>
        Number of tickets to create:{' '}
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value || '0', 10))}
          style={{ width: 100, padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
      </label>
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={seed}>Seed Sample Tickets</button>
      </div>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
    </div>
  );
}
