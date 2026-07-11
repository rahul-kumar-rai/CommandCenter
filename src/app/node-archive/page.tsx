import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function NodeArchive() {
  const nodes = [
    { id: 'NODE-001', name: 'GATEWAY_PRIMARY', ip: '192.168.1.1', type: 'ROUTER', status: 'ONLINE', serial: 'GW-RT-9A1002F' },
    { id: 'NODE-004', name: 'IOT_DEVICE_77', ip: '192.168.1.156', type: 'IOT', status: 'OFFLINE', serial: 'IOT-CAM-48F89C' }
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>

          <div className="headline" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>NODE_ARCHIVE // DISCOVERED_DEVICES</div>

          <div style={{ overflowX: 'auto', margin: '0 -1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.8125rem', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--outline)', color: 'var(--primary)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>NODE_ID</th>
                  <th style={{ padding: '1rem' }}>IDENTIFIER</th>
                  <th style={{ padding: '1rem' }}>IP_ADDRESS</th>
                  <th style={{ padding: '1rem' }}>SERIAL_NO</th>
                  <th style={{ padding: '1rem' }}>CLASS</th>
                  <th style={{ padding: '1rem' }}>STATUS</th>
                  <th style={{ padding: '1rem' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>{node.id}</td>
                    <td style={{ padding: '1rem', color: 'var(--on-surface)' }}>{node.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--primary)' }}>{node.ip}</td>
                    <td style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>{node.serial}</td>
                    <td style={{ padding: '1rem' }}>{node.type}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`status-indicator ${node.status === 'ONLINE' ? 'status-online' : 'status-offline'}`} style={{ marginRight: '0.5rem' }}></span>
                      {node.status}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.625rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>ANALYZE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
