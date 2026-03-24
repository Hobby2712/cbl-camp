import { useEffect, useRef, useState } from 'react';

function RevealSection({ children, delay = 0, className = '' }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function PreviousYears({ campsData, selectedYear, setSelectedYear, currentYear, setLightboxImg }) {
  const years = Object.keys(campsData).map(Number).sort((a, b) => b - a);
  const camp = campsData[selectedYear];

  return (
    <section id="prev-years" className="prev-years">
      <div className="prev-years-container">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div className="section-badge">Lịch Sử Trại</div>
          </div>
          <h2 className="section-title">Các Kỳ Trại</h2>
          <p className="section-subtitle">Hành trình kết nối các thế hệ qua từng năm</p>
          <div className="section-divider" />
        </RevealSection>

        <RevealSection delay={100}>
          <div className="year-tabs">
            {years.map(y => (
              <button
                key={y}
                className={`year-tab ${selectedYear === y ? 'active' : ''}`}
                onClick={() => setSelectedYear(y)}
              >
                {y === currentYear ? `🏕️ ${y}` : `📅 ${y}`}
                {y === currentYear && <span style={{ marginLeft: 6, fontSize: '0.7rem', opacity: 0.8 }}>(Hiện tại)</span>}
              </button>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="year-content" key={selectedYear}>
            <div className="year-content-hero">
              <img src={camp.images[0]?.url} alt={camp.theme} />
              <div className="year-content-hero-overlay">
                <div className="year-content-hero-text">
                  <div className="year-content-year-badge">{camp.year}</div>
                  <h3 className="year-content-theme">{camp.theme}</h3>
                  <p className="year-content-slogan">"{camp.slogan}"</p>
                </div>
              </div>
            </div>

            <div className="year-content-body">
              <div className="year-content-meta">
                <span className="year-meta-tag">📍 {camp.venue}</span>
                <span className="year-meta-tag">📅 {camp.dates}</span>
                <span className="year-meta-tag">👥 {camp.participants} Thành viên</span>
                <span className="year-meta-tag">🎯 {camp.activitiesCount} Hoạt động</span>
              </div>

              <p className="year-content-desc">{camp.description}</p>

              <h4 style={{ fontWeight: 700, color: 'var(--forest-deep)', marginBottom: '1rem', fontSize: '1rem' }}>
                Điểm Nổi Bật
              </h4>
              <div className="year-highlights">
                {camp.highlights.map((h, i) => (
                  <div key={i} className="year-highlight">
                    <div className="year-highlight-icon">{h.icon}</div>
                    <div className="year-highlight-title">{h.title}</div>
                    <div className="year-highlight-desc">{h.desc}</div>
                  </div>
                ))}
              </div>

              {camp.images.length > 1 && (
                <>
                  <h4 style={{ fontWeight: 700, color: 'var(--forest-deep)', margin: '1.5rem 0 1rem', fontSize: '1rem' }}>
                    Hình Ảnh Trại {camp.year}
                  </h4>
                  <div className="year-gallery">
                    {camp.images.slice(1).map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={img.caption}
                        className="year-gallery-img"
                        onClick={() => setLightboxImg(img)}
                        loading="lazy"
                        title={img.caption}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </RevealSection>

        {/* Timeline overview */}
        <RevealSection delay={300}>
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--forest-deep)', marginBottom: '2.5rem' }}>
              Hành Trình Qua Các Năm
            </h3>
            <div style={{ position: 'relative', padding: '0 1rem', isolation: 'isolate' }}>
              {/* Dot-to-dot connecting arcs */}
              <svg
                style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 0, pointerEvents: 'none' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#52b788" />
                    <stop offset="50%" stopColor="#2d6a4f" />
                    <stop offset="100%" stopColor="#d4a017" />
                  </linearGradient>
                </defs>
                {/* Glow */}
                <path
                  d="M 50 10 C 78 18,78 22,50 30 C 22 38,22 42,50 50 C 78 58,78 62,50 70 C 22 78,22 84,50 88"
                  fill="none"
                  stroke="rgba(82,183,136,0.2)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Main arc path */}
                <path
                  d="M 50 10 C 78 18,78 22,50 30 C 22 38,22 42,50 50 C 78 58,78 62,50 70 C 22 78,22 84,50 88"
                  fill="none"
                  stroke="url(#windGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {years.map((y, i) => {
                const c = campsData[y];
                const isLeft = i % 2 === 0;
                return (
                  <div key={y} style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: '2rem',
                    paddingLeft: isLeft ? 0 : '50%',
                    paddingRight: isLeft ? '50%' : 0,
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    <div
                      style={{
                        background: selectedYear === y ? 'linear-gradient(135deg, var(--forest-deep), var(--forest-mid))' : 'white',
                        color: selectedYear === y ? 'var(--gold)' : 'var(--text-dark)',
                        border: `2px solid ${selectedYear === y ? 'var(--forest-mid)' : 'var(--forest-cream)'}`,
                        borderRadius: 'var(--radius)',
                        padding: '1rem 1.5rem',
                        maxWidth: '380px',
                        width: '90%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: selectedYear === y ? '0 8px 30px rgba(45,106,79,0.3)' : 'var(--shadow-sm)',
                        marginLeft: isLeft ? 'auto' : 0,
                        marginRight: isLeft ? 0 : 'auto',
                        position: 'relative',
                        zIndex: 1,
                      }}
                      onClick={() => setSelectedYear(y)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: 900, color: selectedYear === y ? 'var(--gold)' : 'var(--forest-deep)' }}>{y}</span>
                        {y === currentYear}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem' }}>{c.theme}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>📍 {c.location} · 👥 {c.participants} người</div>
                      {/* dot */}
                      <div style={{
                        position: 'absolute',
                        [isLeft ? 'right' : 'left']: '-8%',
                        top: '50%',
                        transform: 'translate(50%, -50%)',
                        width: 14, height: 14,
                        borderRadius: '50%',
                        background: selectedYear === y ? 'var(--gold)' : 'var(--forest-accent)',
                        border: '3px solid white',
                        boxShadow: '0 0 0 3px var(--forest-mid)',
                        zIndex: 1,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
