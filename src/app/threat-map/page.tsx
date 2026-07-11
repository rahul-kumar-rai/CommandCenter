'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ThreatMap() {
  const [publicIp, setPublicIp] = useState('DETECTING...');
  const [activeThreats, setActiveThreats] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setPublicIp(data.ip))
      .catch(() => setPublicIp('45.22.11.90'));

    // Simulate active threats
    const threats = [
      { id: 'TR-902', ip: '185.221.14.90', location: 'MOSCOW, RU', risk: 'HIGH' },
      { id: 'TR-902', ip: '185.221.14.90', location: 'MOSCOW, RU', risk: 'HIGH' },
    ];
    setActiveThreats(threats);

    setActiveThreats(prev => [...prev, { id: 'TR-999', ip: publicIp, location: 'LOCALHOST, US', risk: 'HIGH' }]);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 0, minHeight: '600px' }}>
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>

          <div className="headline" style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <span>THREAT_MAP // LIVE_INTERCEPTION_GRID</span>
            <span style={{ color: 'var(--error)' }}>ACTIVE_INTRUSIONS: {activeThreats.length + 1}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1rem', flex: 1 }}>
            <div style={{
              background: '#0a0b10',
              border: '1px solid var(--outline)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>

              {/* Source: local  */}

              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '4px', height: '4px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              <div style={{ position: 'absolute', top: '40%', left: '60%', width: '4px', height: '4px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>

              <div style={{ position: 'absolute', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--error)', borderRadius: '50%', boxShadow: '0 0 20px var(--error)', animation: 'pulse 1s infinite', margin: '0 auto' }}></div>
                <div style={{ color: 'var(--error)', fontSize: '0.625rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>BREACH_DETECTED<br />SOURCE: {publicIp}</div>
              </div>

              <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.5)', padding: '8px', border: '1px solid var(--primary)', fontSize: '0.625rem', fontFamily: 'monospace' }}>
                SYSTEM: AEGIS_HUD_v4.2<br />
                SCAN_DEPTH: 100%<br />
                RELAY_STATUS: ACTIVE
              </div>

              <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '8px', border: '1px solid var(--primary)', fontSize: '0.625rem', fontFamily: 'monospace', textAlign: 'right' }}>
                TARGET_LOCK: ATTEMPTING...<br />
                SIGNAL_STRENGTH: 92%
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="headline" style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>THREAT_REGISTRY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '500px' }}>
                {activeThreats.map((threat) => (
                  <div key={threat.id} style={{ border: '1px solid var(--outline)', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: threat.risk === 'CRITICAL' ? 'var(--error)' : 'var(--primary)' }}>{threat.id}</span>
                      <span style={{ fontSize: '0.5rem', color: 'var(--on-surface-variant)' }}>{threat.risk}</span>
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontFamily: 'monospace' }}>{threat.ip}</div>
                    <div style={{ fontSize: '0.625rem', opacity: 0.6 }}>{threat.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
