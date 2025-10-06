
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderCard from './components/HeaderCard';
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import AdminPage from './pages/AdminPage';

type Page = 'dashboard'|'checkin'|'admin'|'events'|'bookings'|'finance';

export default function App(){
  const [page, setPage] = useState<Page>('dashboard');
  return (
    <div className="layout">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="content">
        <HeaderCard />
        {page==='dashboard' && <DashboardPage />}
        {page==='checkin' && <CheckInPage />}
        {page==='admin' && <AdminPage />}
        {page!=='dashboard' && page!=='checkin' && page!=='admin' && (
          <div className="card" style={{padding:16}}>This section is a placeholder.</div>
        )}
      </main>
    </div>
  );
}
