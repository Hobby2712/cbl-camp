import { useEffect, useRef, useState } from 'react';
import { campTeams2025 } from '../data/campsData';

function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Teams() {
  return (
    <section className="teams">
      <div className="teams-container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>
            <div className="section-badge" style={{ background: 'rgba(255,255,255,.12)', color: 'var(--gold)' }}>
              Summer Shine 2025
            </div>
          </div>
          <h2 className="section-title">Các Trại Tranh Tài</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.6)' }}>
            8 đội – 8 cá tính – 1 mùa hè không quên
          </p>
          <div className="section-divider" style={{ background: 'linear-gradient(90deg,var(--red-mid),var(--gold))' }} />
        </Reveal>

        <div className="teams-grid">
          {campTeams2025.map((team, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="team-card" style={{ '--team-color': team.color }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', margin: '0 auto 1rem',
                  background: `${team.color}22`, border: `2px solid ${team.color}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', animation: 'float 4s ease-in-out infinite',
                  animationDelay: `${i * 0.5}s`,
                }}>
                  {team.icon}
                </div>
                <div className="team-name" style={{ color: team.color }}>{team.name}</div>
                <div className="team-desc">{team.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div style={{
            marginTop: '3rem', textAlign: 'center',
            padding: '2rem', background: 'rgba(255,255,255,.04)',
            borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,209,102,.15)',
          }}>
            <p style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '.5rem' }}>
              🏆 Kết Quả Summer Shine 2025
            </p>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.9rem' }}>
              Theo dõi <a href="https://www.facebook.com/chuyenbaoloccamp" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--gold)', fontWeight: 700 }}>Facebook CBLC</a> để xem kết quả các phần thi và highlight các trại!
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
