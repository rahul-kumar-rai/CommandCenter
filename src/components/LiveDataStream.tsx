'use client';

import React, { useState, useEffect } from 'react';

const LiveDataStream = () => {
  const [logs, setLogs] = useState([
    { time: '18:04:01', event: 'ENCRYPTION_KEY_ROTATED', status: 'SECURE' },
    { time: '18:03:45', event: 'INBOUND_TRAFFIC_FILTERED', status: 'OK' },
    { time: '18:02:12', event: 'UNAUTHORIZED_ACCESS_ATTEMPT', status: 'BLOCKED', color: 'var(--error)' },
    { time: '18:00:55', event: 'NODE_DISCOVERY_COMPLETED', status: '12_NEW' },
    { time: '17:58:20', event: 'SYSTEM_HEALTH_CHECK', status: 'OPTIMAL' },
    { time: '17:55:10', event: 'FIREWALL_RULE_UPDATED', status: 'SUCCESS' },
    { time: '17:52:45', event: 'BACKUP_SEQUENCE_INITIATED', status: 'IN_PROGRESS' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      
      const events = [
        { event: 'PACKET_INSPECTED', status: 'PASSED' },
        { event: 'NODE_HEARTBEAT', status: 'ACTIVE' },
        { event: 'SSH_LOGIN_ATTEMPT', status: 'FAILED', color: 'var(--error)' },
        { event: 'DATABASE_QUERY', status: 'SUCCESS' },
        { event: 'MEMORY_OPTIMIZED', status: 'INFO' }
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      setLogs(prev => [
        { time: timeStr, ...randomEvent },
        ...prev.slice(0, 14)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
      <div className="corner-deco top-left"></div>
      <div className="corner-deco top-right"></div>
      <div className="corner-deco bottom-left"></div>
      <div className="corner-deco bottom-right"></div>
      <div className="headline" style={{ fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>LIVE_DATA_STREAM</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--primary)', animation: 'pulse 2s infinite', fontSize: '1rem' }}>●</span>
          <span style={{ fontSize: '0.625rem', color: 'var(--primary)' }}>REC_ACTIVE</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--on-surface-variant)' }}>[{log.time}]</span>
            <span style={{ flex: 1 }}>{log.event}</span>
            <span style={{ color: log.color || 'var(--primary)', fontWeight: 'bold' }}>{log.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDataStream;
