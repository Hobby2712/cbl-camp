import { useEffect, useRef, useState } from 'react';
import { activityCategories } from '../data/campsData';

function useReveal(threshold = 0.1) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Activities() {
  const [active, setActive] = useState(activityCategories[0].id);
  const cat = activityCategories.find(c => c.id === active);

  return (
    <section id="activities" className="activities" style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #b35200 0%, #b38800 55%, #7a6040 100%)' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', padding: '0 2rem', marginBottom: '3rem' }}>
        <RevealSection>
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--gold)' }}>
            Chương Trình Trại
          </span>
          <h2 className="section-title" style={{ color: 'white', marginTop: '0.5rem' }}>Hoạt Động Tại Trại</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Dựng trại · Trò chơi lớn · Tranh biện · Văn nghệ
          </p>
          <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--orange), var(--gold))' }} />
        </RevealSection>
      </div>

      {/* Category tabs */}
      <RevealSection delay={100}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          padding: '0 2rem',
          marginBottom: '3rem',
        }}>
          {activityCategories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1.3rem',
                borderRadius: '50px',
                fontSize: '0.88rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                border: '2px solid',
                transition: 'all 0.25s ease',
                borderColor: active === c.id ? c.color : 'rgba(255,255,255,0.15)',
                background: active === c.id ? c.color : 'rgba(255,255,255,0.05)',
                color: active === c.id ? 'white' : 'rgba(255,255,255,0.65)',
                boxShadow: active === c.id ? `0 4px 20px ${c.color}55` : 'none',
                transform: active === c.id ? 'translateY(-2px)' : 'none',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </RevealSection>

      {/* Active category content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }} key={active}>
        <div className="activities-content-grid" style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* Left: image + tagline */}
          <RevealSection delay={0}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: 'var(--activities-img-height, 420px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              <img
                src={cat.image}
                alt={cat.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}44 50%, transparent 100%)`,
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <div style={{
                  display: 'inline-block',
                  background: cat.color,
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '2rem',
                  padding: '4px 2px',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {cat.icon} {cat.label}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: '1rem', marginTop: '0.4rem' }}>
                  {cat.tagline}
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Right: description + items */}
          <RevealSection delay={150}>
            <div className="activities-desc-panel" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-lg)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${cat.color}33`, color: cat.color === '#9b2335' ? '#ff6b6b' : cat.color,
                  border: `1px solid ${cat.color}55`,
                  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px',
                  textTransform: 'uppercase', padding: '5px 14px', borderRadius: 50,
                  marginBottom: '0.8rem',
                }}>
                  {cat.icon} {cat.label}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                  {cat.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                {cat.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '1rem 1.2rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${cat.color}22`;
                      e.currentTarget.style.borderColor = `${cat.color}66`;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                        {item.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Bottom mini-cards of other categories */}
        <RevealSection delay={250}>
          <div className="activities-mini-grid">
            {activityCategories.filter(c => c.id !== active).map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  height: 120,
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={c.image} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${c.color}dd 0%, transparent 60%)`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'flex-end',
                  padding: '0.8rem 0.5rem',
                }}>
                  <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.2, marginTop: 3 }}>
                    {c.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
