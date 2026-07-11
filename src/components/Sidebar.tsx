'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const pathname = usePathname();



  const navItems = [
    { name: 'DASH', path: '/', icon: '📊' },
    { name: 'SCAN', path: '/scanner', icon: '📡' },
    { name: 'MAP', path: '/threat-map', icon: '🌐' },
    { name: 'NODES', path: '/node-archive', icon: '🖥️' },
    { name: 'LOGS', path: '/system-logs', icon: '📝' },
    { name: 'SET', path: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="glass-card desktop-sidebar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          borderRadius: 0,
          zIndex: 1600,
          width: '280px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          padding: '2rem 1.5rem',
        }}
      >
        <div className="corner-deco top-left"></div>
        <div className="corner-deco top-right"></div>
        <div className="corner-deco bottom-left"></div>
        <div className="corner-deco bottom-right"></div>

        <div className="headline" style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 'bold' }}>
        COMMAND CENTER
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={{
                color: pathname === item.path ? 'var(--primary)' : 'var(--on-surface-variant)',
                textDecoration: 'none',
                padding: '0.75rem',
                borderLeft: pathname === item.path ? '2px solid var(--primary)' : '2px solid transparent',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-headline)',
                background: pathname === item.path ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {item.name === 'DASH' ? 'DASHBOARD' :
                item.name === 'SCAN' ? 'NETWORK SCAN' :
                  item.name === 'MAP' ? 'THREAT MAP' :
                    item.name === 'NODES' ? 'NODE ARCHIVE' :
                      item.name === 'LOGS' ? 'SYSTEM LOGS' : 'SETTINGS'}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--on-surface-variant)', fontFamily: 'monospace', lineHeight: '1.6' }}>
          <div style={{ borderTop: '1px solid var(--outline)', paddingTop: '1rem', marginBottom: '0.5rem' }}>
            SECURE_LINK // ACTIVE
          </div>
          <div>ENCRYPTION: AES-256</div>
          <div style={{ color: 'var(--primary)', marginTop: '0.5rem' }}></div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav glass-card">
        <div className="corner-deco top-left" style={{ width: '8px', height: '8px' }}></div>
        <div className="corner-deco top-right" style={{ width: '8px', height: '8px' }}></div>

        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </Link>
        ))}
      </nav>

      <style jsx>{`
        @media (max-width: 1023px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 64px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 1rem;
            z-index: 2000;
            border-radius: 0;
            border-top: 1px solid var(--primary);
            background: rgba(10, 11, 16, 0.9);
            backdrop-filter: blur(12px);
          }
          .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: var(--on-surface-variant);
            gap: 4px;
            transition: all 0.2s ease;
          }
          .nav-item.active {
            color: var(--primary);
            text-shadow: 0 0 8px var(--primary);
          }
          .nav-icon {
            font-size: 1.5rem;
          }
          .nav-label {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .mobile-bottom-nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
