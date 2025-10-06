
import React from 'react';

export default function SummaryRing({ label, percent, sub }:{label:string; percent:number; sub:string}){
  const size = 84;
  const stroke = 10;
  const radius = (size - stroke)/2;
  const circum = 2 * Math.PI * radius;
  const dash = Math.max(0, Math.min(100, percent)) / 100 * circum;

  return (
    <div className="card summary-card">
      <div className="ring">
        <svg width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
          <circle cx={size/2} cy={size/2} r={radius} stroke="#4f46e5" strokeWidth={stroke} fill="none"
            strokeDasharray={`${dash} ${circum-dash}`} strokeLinecap="round" />
        </svg>
        <div className="center">{Math.round(percent)}%</div>
      </div>
      <div>
        <div style={{fontWeight:800}}>{label}</div>
        <div className="muted">{sub}</div>
      </div>
    </div>
  );
}
