'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Node {
  id: string;
  ip: string;
  type: string;
  status: string;
}

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [discoveredNodes, setDiscoveredNodes] = useState<Node[]>([]);
  const [currentIp, setCurrentIp] = useState('');
  const [targetSubnet, setTargetSubnet] = useState('192.168.1.0/24');
  const [clientIp, setClientIp] = useState('DETECTING...');

  useEffect(() => {
    // Fetch real Local IP from our API
    fetch('/api/network')
      .then(res => res.json())
      .then(data => {
        setClientIp(data.localIp);
        // Automatically adjust target subnet to match local IP range
        const base = data.localIp.split('.').slice(0, 3).join('.');
        if (base !== '127.0.0') {
          setTargetSubnet(`${base}.0/24`);
        }
      })
      .catch(() => {
        setClientIp('127.0.0.1');
        setTargetSubnet('192.168.1.0/24');
      });

    // Still fetch public IP for reference if needed
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        console.log('Public IP:', data.ip);
      })
      .catch(() => {});
  }, []);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setDiscoveredNodes([]);
  };

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => {
        const nextProgress = progress + Math.random() * 5;
        setProgress(Math.min(nextProgress, 100));

        const baseIp = targetSubnet.split('/')[0].split('.').slice(0, 3).join('.');

        if (Math.random() > 0.8) {
          const newId = discoveredNodes.length + 1;
          const nodeTypes = ['WORKSTATION', 'MOBILE', 'SERVER', 'IOT', 'PRINTER'];

          const newNode = {
            id: `NODE-SCAN-${newId}`,
            ip: `${baseIp}.${Math.floor(Math.random() * 254) + 1}`,
            type: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
            status: 'STABLE'
          };
          setDiscoveredNodes(prev => [newNode, ...prev]);
        }

        setCurrentIp(`${baseIp}.${Math.floor((progress / 100) * 254)}`);
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress >= 100 && isScanning) {
      setTimeout(() => setIsScanning(false), 0);
    }
  }, [isScanning, progress, discoveredNodes, targetSubnet]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="scanner-grid">
          <div className="glass-card" style={{ borderRadius: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="corner-deco top-left"></div>
            <div className="corner-deco top-right"></div>
            <div className="corner-deco bottom-left"></div>
            <div className="corner-deco bottom-right"></div>

            <div className="headline" style={{ fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>SCAN_CONFIGURATION</span>
              <span style={{ fontSize: '0.625rem', color: 'var(--primary)' }}>LOCAL_IP: {clientIp}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>TARGET_SUBNET</label>
                <input
                  type="text"
                  value={targetSubnet}
                  onChange={(e) => setTargetSubnet(e.target.value)}
                  placeholder="e.g. 10.0.0.0/24"
                  disabled={isScanning}
                  style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>SCAN_DEPTH</label>
                  <select disabled={isScanning} style={{ background: '#000', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem' }}>
                    <option>QUICK_PROBE</option>
                    <option>FULL_AUDIT</option>
                    <option>STEALTH_MODE</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary" onClick={startScan} disabled={isScanning} style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>
                {isScanning ? 'SCANNING_IN_PROGRESS...' : 'INITIATE_NETWORK_SCAN'}
              </button>
            </div>

            {isScanning && (
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  <span style={{ color: 'var(--primary)' }}>SCANNING: {currentIp}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', height: '100%', background: 'var(--primary)', width: `${progress}%`, boxShadow: '0 0 10px var(--primary)', transition: 'width 0.2s ease' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ borderRadius: 0, minHeight: '400px' }}>
            <div className="corner-deco top-left"></div>
            <div className="corner-deco top-right"></div>
            <div className="corner-deco bottom-left"></div>
            <div className="corner-deco bottom-right"></div>

            <div className="headline" style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>DISCOVERED_NODES</span>
              <span style={{ color: 'var(--primary)' }}>[{discoveredNodes.length}]</span>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {discoveredNodes.length === 0 && !isScanning && (
                <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                  NO_DATA // WAITING_FOR_INITIATION
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {discoveredNodes.map((node, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid rgba(0, 240, 255, 0.1)', background: 'rgba(0, 240, 255, 0.02)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 'bold' }}>{node.ip}</span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--on-surface-variant)' }}>{node.type}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.625rem', color: 'var(--success)' }}>STABLE</div>
                      <div style={{ fontSize: '0.5rem', color: 'var(--on-surface-variant)' }}>ID: {node.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{` @media (max-width: 767px) { .scanner-grid { grid-template-columns: 1fr !important; } } `}</style>
    </div>
  );
}
