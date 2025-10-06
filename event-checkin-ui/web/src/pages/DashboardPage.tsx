
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import SummaryRing from '../components/SummaryRing';
import QR from '../components/QR';

type Ticket = {
  id: string;
  reference: string;
  type: 'VIP' | 'STANDARD' | 'STUDENT';
  checkedIn: boolean;
  checkedInAt?: string;
};

type Stats = {
  total: number;
  checkedIn: number;
  byType: Record<string, { total: number; checkedIn: number }>
};

export default function DashboardPage(){
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      setTickets(await api('/tickets'));
      setStats(await api('/stats'));
    })();
  }, []);

  const rings = useMemo(() => {
    if (!stats) return [];
    const entries = Object.entries(stats.byType);
    return entries.map(([key, v]) => {
      const label = key === 'VIP' ? 'VIP' : key === 'STANDARD' ? 'Standard' : key === 'STUDENT' ? 'Student' : key;
      const percent = v.total ? (v.checkedIn / v.total) * 100 : 0;
      const sub = `${v.checkedIn}/${v.total} Claimed`;
      return { label, percent, sub };
    });
  }, [stats]);

  return (
    <>
      <div className="card" style={{padding:16}}>
        <div className="kpi">{stats ? stats.checkedIn : 0} <span className="kpi-sub">of {stats ? stats.total : 0}</span></div>
        <div className="kpi-sub">Total Attendance</div>
      </div>

      <div className="grid cols-4">
        {rings.map((r, i) => (
          <SummaryRing key={i} label={r.label} percent={r.percent} sub={r.sub} />
        ))}
        {rings.length < 4 && Array.from({length: 4 - rings.length}).map((_,i) => (
          <div key={`empty-${i}`} className="card summary-card" style={{opacity:0.6}}>
            <div className="ring">
              <svg width={84} height={84}>
                <circle cx={42} cy={42} r={32} stroke="#e5e7eb" strokeWidth={10} fill="none" />
              </svg>
              <div className="center">0%</div>
            </div>
            <div>
              <div style={{fontWeight:800}}>Bundle Offer</div>
              <div className="muted">0/0 Claimed</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:16}}>
        <table className="table">
          <thead>
            <tr>
              <th>Reference Number</th>
              <th>Ticket Type</th>
              <th>Checked In</th>
              <th>Checked In At</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td style={{fontFamily:'monospace'}}>{t.reference}</td>
                <td>{t.type === 'VIP' ? 'VIP' : t.type === 'STANDARD' ? 'Standard' : 'Student'}</td>
                <td>{t.checkedIn ? 'Yes' : 'No'}</td>
                <td>{t.checkedInAt ? new Date(t.checkedInAt).toLocaleString() : '—'}</td>
                <td><QR text={t.reference} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
