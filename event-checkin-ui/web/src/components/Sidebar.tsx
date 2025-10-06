
import React from 'react';

export default function Sidebar({ active, onNavigate }:{active: string; onNavigate: (key:string)=>void}){
  const Item = ({keyName, label, icon}:{keyName:string; label:string; icon:string}) => (
    <a
      href="#"
      className={"" + (active===keyName? 'active ' : '')}
      onClick={(e)=>{e.preventDefault(); onNavigate(keyName);}}
    >
      <span style={{width:18, display:'inline-block'}}>{icon}</span>
      <span>{label}</span>
    </a>
  );
  return (
    <aside className="sidebar">
      <div className="brand">
        <span style={{display:'inline-block', width:28, height:28, borderRadius:8, background:'#4f46e5'}}></span>
        <span>gobook</span>
      </div>
      <nav className="nav">
        <Item keyName="dashboard" label="Dashboard" icon="📊" />
        <Item keyName="events" label="Events" icon="🎫" />
        <Item keyName="bookings" label="Bookings" icon="📒" />
        <Item keyName="finance" label="Finance" icon="💵" />
        <Item keyName="checkin" label="Checkin" icon="✅" />
        <Item keyName="admin" label="Admin" icon="⚙️" />
      </nav>
      <div style={{marginTop:'auto', fontSize:12, color:'#94a3b8'}}>Powered by gobook</div>
    </aside>
  );
}
