import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Settings() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Header />
        
        <div className="glass-card" style={{ flex: 1, borderRadius: 0 }}>
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>
          
          <div className="headline" style={{ fontSize: '1rem', marginBottom: '2rem' }}>SYSTEM_SETTINGS // CONFIGURATION</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
            <section>
              <h3 className="headline" style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>INTERFACE_CONFIGURATION</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>HUD_OVERLAY_INTENSITY</span>
                  <input type="range" style={{ accentColor: 'var(--primary)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>SCANLINE_VISIBILITY</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </section>

            <section>
              <h3 className="headline" style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>SECURITY_PROTOCOL</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>AUTO_LOCKDOWN_ON_BREACH</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>ENCRYPTION_STRENGTH</span>
                  <select style={{ background: '#000', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.25rem' }}>
                    <option>AES-256 (MIL-SPEC)</option>
                    <option>RSA-4096</option>
                    <option>CHA-CHA-20</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="headline" style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>NETWORK_CONFIGURATION</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', opacity: 0.7 }}>PRIMARY_INTERFACE</label>
                  <select style={{ background: '#000', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.5rem' }}>
                    <option>Wi-Fi (802.11ax)</option>
                    <option>Ethernet (10GbE)</option>
                    <option>VPN_TUNNEL_0</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', opacity: 0.7 }}>LOCAL_SUBNET_RANGE</label>
                  <input 
                    type="text" 
                    placeholder="192.168.1.0/24" 
                    defaultValue="192.168.1.0/24"
                    style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem', fontFamily: 'monospace' }} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>FORCE_WIFI_SCAN_MODE</span>
                  <input type="checkbox" />
                </div>
                
                <button className="btn-primary" style={{ padding: '0.5rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}>DETECT_LOCAL_NETWORK</button>
              </div>
            </section>

            <section style={{ marginTop: '2rem' }}>
              <button className="btn-primary">SAVE_CHANGES</button>
              <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)', marginLeft: '1rem' }}>RESET_TO_FACTORY</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
