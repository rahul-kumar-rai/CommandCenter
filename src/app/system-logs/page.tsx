import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function SystemLogs() {
  const logs = Array.from({ length: 15 }).map((_, i) => ({
    time: `17:${42 - i}:21`,
    event: i % 3 === 0 ? 'UNAUTHORIZED_ACCESS_ATTEMPT' : 'SYSTEM_LOG_ENTRY',
    details: i % 3 === 0 ? `Filtered packet from 45.22.11.90` : `Routine check complete for node NODE-00${i}`,
    status: i % 3 === 0 ? 'BLOCKED' : 'INFO',
    level: i % 3 === 0 ? 'CRITICAL' : 'STABLE'
  }));

  return (
    <div className="app-layout">
      <Sidebar />
      <main style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header />
        
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>
          
          <div className="headline" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>SYSTEM_LOGS // ACTIVITY_STREAM</div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                padding: '1rem', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontFamily: 'monospace',
                fontSize: '0.8125rem'
              }}>
                <span style={{ color: 'var(--on-surface-variant)', width: '80px' }}>[{log.time}]</span>
                <span style={{ color: log.level === 'CRITICAL' ? 'var(--error)' : 'var(--primary)', fontWeight: 'bold', width: '200px' }}>{log.event}</span>
                <span style={{ flex: 1 }}>{log.details}</span>
                <span style={{ color: log.level === 'CRITICAL' ? 'var(--error)' : 'var(--success)', opacity: 0.8 }}>{log.level}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
