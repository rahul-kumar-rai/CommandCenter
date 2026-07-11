import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, color = 'var(--primary)' }) => {
  return (
    <div className="glass-card" style={{ flex: 1, borderRadius: 0 }}>
      <div className="corner-deco top-left" style={{ width: '8px', height: '8px', borderWidth: '1px' }}></div>
      <div className="corner-deco top-right" style={{ width: '8px', height: '8px', borderWidth: '1px' }}></div>
      <div className="corner-deco bottom-left" style={{ width: '8px', height: '8px', borderWidth: '1px' }}></div>
      <div className="corner-deco bottom-right" style={{ width: '8px', height: '8px', borderWidth: '1px' }}></div>
      <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginBottom: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: '700', color, fontFamily: 'var(--font-headline)' }}>{value}</div>
      {trend && (
        <div style={{ fontSize: '0.75rem', marginTop: '0.75rem', color: trend.startsWith('+') ? 'var(--error)' : 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '1rem' }}>{trend.startsWith('+') ? '↑' : '↓'}</span>
          {trend} SINCE_LAST_SCAN
        </div>
      )}
    </div>
  );
};

export default StatsCard;
