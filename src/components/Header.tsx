'use client';

import React, { useState, useEffect } from 'react';



const Header = () => {
  const [time, setTime] = useState('');
  const [localIp, setLocalIp] = useState('192.168.1.15');
  const [publicIp, setPublicIp] = useState('DETECTING...');

  useEffect(() => {
    // Clock logic
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Fetch real Local IP from our API
    fetch('/api/network')
      .then(res => res.json())
      .then(data => {
        setLocalIp(data.localIp)
      })
      .catch(() => setLocalIp('127.0.0.1'));

    // Public IP detection logic
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setPublicIp(data.ip))
      .catch(() => setPublicIp('OFFLINE'));

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-card header-container">
      <div className="corner-deco top-left"></div>
      <div className="corner-deco top-right"></div>
      <div className="corner-deco bottom-left"></div>
      <div className="corner-deco bottom-right"></div>

      <div className="status-group">
        <h1 className="header-title">COMMAND CENTER</h1>
        <div className="status-text">
          <span className="status-indicator status-online"></span>
          STATUS: OPERATIONAL // {time}
          <span style={{ marginLeft: '1rem', color: 'var(--primary)', opacity: 0.8 }}>LOCAL_IP: {localIp}</span>
          <span style={{ marginLeft: '1rem', color: 'var(--primary)', opacity: 0.5, fontSize: '0.6rem' }}>PUBLIC_IP: {publicIp}</span>
        </div>
      </div>

      <div className="user-group">
        <div className="user-info">
          <div className="user-name">ADMIN_ALPHA</div>
          <div className="user-level">LEVEL 5 ACCESS</div>
        </div>
        <div className="user-avatar">
          <div className="avatar-inner"></div>
        </div>
      </div>

      <style jsx>{`
        .header-container {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0;
          padding: 1rem 1.5rem;
          position: relative;
        }

        .header-title {
          font-size: 1rem;
        }

        .status-text {
          font-size: 0.625rem;
          color: var(--success);
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: monospace;
          flex-wrap: wrap;
        }

        .user-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .user-info {
          text-align: right;
          display: none;
        }

        .user-name {
          font-size: 0.75rem;
          font-weight: bold;
        }

        .user-level {
          font-size: 0.5rem;
          color: var(--on-surface-variant);
          letter-spacing: 0.1em;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: var(--primary);
          position: relative;
        }

        .avatar-inner {
          position: absolute;
          inset: 3px;
          border: 1px solid #000;
        }

        @media (min-width: 640px) {
          .header-container {
            margin-bottom: 2rem;
            padding: 1.5rem;
          }
          .header-title {
            font-size: 1.25rem;
          }
          .status-text {
            font-size: 0.75rem;
          }
          .user-info {
            display: block;
          }
          .user-avatar {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
