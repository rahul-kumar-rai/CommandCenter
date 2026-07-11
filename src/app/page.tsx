import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import LiveDataStream from "@/components/LiveDataStream";

export default function Home() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="main-content">
        <Header />
        
        <div className="stats-grid">
          <StatsCard label="TOTAL_NODES" value="1,284" trend="-4" />
          <StatsCard label="ACTIVE_THREATS" value="02" trend="+1" color="var(--error)" />
          <StatsCard label="SYSTEM_LOAD" value="42%" trend="-2" />
          <StatsCard label="UPTIME" value="99.98%" color="var(--success)" />
        </div>

        <div className="dashboard-grid">
          <div className="glass-card" style={{ borderRadius: 0, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
            <div className="corner-deco top-left"></div>
            <div className="corner-deco top-right"></div>
            <div className="corner-deco bottom-left"></div>
            <div className="corner-deco bottom-right"></div>
            <div className="headline" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>THREAT_MAP // GLOBAL_OVERVIEW</div>
            
            <div style={{ 
              flex: 1, 
              background: 'rgba(0, 240, 255, 0.02)', 
              border: '1px solid var(--outline)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                backgroundSize: '30px 30px' 
              }}></div>
              
              <div style={{ position: 'absolute', color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.75rem', top: '10px', left: '10px' }}>
                COORD: 40.7128° N, 74.0060° W
              </div>
              
              <div style={{ 
                position: 'absolute', 
                width: '20px', 
                height: '20px', 
                background: 'var(--error)', 
                borderRadius: '50%', 
                boxShadow: '0 0 20px var(--error)',
                animation: 'pulse 1.5s infinite'
              }}></div>
              
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--on-surface-variant)' }}>SCAN_FREQ: 14.2 GHz</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--on-surface-variant)' }}>SIGNAL: STABLE</div>
              </div>
            </div>
          </div>
          
          <LiveDataStream />
        </div>

        <div className="glass-card" style={{ borderRadius: 0 }}>
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>
          <div className="headline" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>SYSTEM_CONTROLS</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary">INITIATE_SCAN</button>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>GENERATE_REPORT</button>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)', boxShadow: '0 0 10px rgba(255, 0, 85, 0.3)' }}>EMERGENCY_LOCKDOWN</button>
          </div>
        </div>
      </main>
    </div>
  );
}
