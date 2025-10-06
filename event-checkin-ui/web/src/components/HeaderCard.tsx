
import React from 'react';

export default function HeaderCard(){
  return (
    <div className="card event-card">
      <img className="event-thumbnail" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" alt="event"/>
      <div style={{flex:1}}>
        <div className="muted breadcrumb">Dashboard › Checkin</div>
        <div style={{fontWeight:700}}>Disclaimer by Anirban Dasgupta</div>
        <div className="muted">Indoor Stadium, 27th September</div>
      </div>
      <button className="btn">Checkin</button>
    </div>
  );
}
