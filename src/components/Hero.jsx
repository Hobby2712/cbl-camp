import { useEffect, useState } from 'react';

const TYPEWRITER_TEXTS = [
  'Summer never shy',
  'Summer only shine',
  'Văn nghệ bùng cháy',
  'Trò chơi kịch tính',
  'Mùa hè không quên',
  'Chuyên Bảo Lộc Camp',
];

export default function Hero({ camp }) {
  const [typeText, setTypeText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPEWRITER_TEXTS[typeIndex];
    let timeout;
    if (!deleting) {
      if (charIndex < current.length) timeout = setTimeout(() => setCharIndex(i => i + 1), 75);
      else timeout = setTimeout(() => setDeleting(true), 2000);
    } else {
      if (charIndex > 0) timeout = setTimeout(() => setCharIndex(i => i - 1), 35);
      else { setDeleting(false); setTypeIndex(i => (i + 1) % TYPEWRITER_TEXTS.length); }
    }
    setTypeText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, typeIndex]);

  const particles = [
    { w: 320, h: 320, top: '8%', left: '4%', dur: '9s' },
    { w: 200, h: 200, top: '55%', left: '78%', dur: '11s' },
    { w: 160, h: 160, top: '28%', left: '68%', dur: '7s' },
    { w: 260, h: 260, top: '68%', left: '12%', dur: '10s' },
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="hero-particles">
        {particles.map((p, i) => (
          <div key={i} className="hero-particle" style={{
            width: p.w, height: p.h, top: p.top, left: p.left,
            animationDuration: p.dur, animationDelay: `${i * 1.8}s`,
          }} />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span>☀️</span>
          <span>CBLC · Chuyên Bảo Lộc · Since 2019</span>
        </div>

        <div className="hero-year">THPT Chuyên Bảo Lộc · Lâm Đồng</div>

        <h1 className="hero-title">
          Summer Shine<br />
          <span className="hero-title-accent">2025</span>
        </h1>

        <p className="hero-slogan">"{camp.slogan}"</p>

        <div style={{ minHeight: '2.2rem', marginBottom: '1.2rem' }}>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1.1rem', fontWeight: 600 }}>
            {typeText}
            <span style={{ borderRight: '2px solid var(--gold)', animation: 'pulse 1s infinite', marginLeft: 2 }} />
          </p>
        </div>

        <div className="hero-meta">
          <div className="hero-meta-item"><span>🏫</span><span>THPT Chuyên Bảo Lộc</span></div>
          <div className="hero-meta-item"><span>📅</span><span>{camp.dates}</span></div>
          <div className="hero-meta-item"><span>👥</span><span>{camp.participants}+ trại sinh</span></div>
          <div className="hero-meta-item"><span>🏕️</span><span>{camp.teams} trại tranh tài</span></div>
        </div>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">☀️ Đăng Ký Ngay</a>
          <a href="#about" className="btn-secondary">Khám Phá Trại →</a>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
      </div>

      <div className="hero-stats">
        {[
          { num: `${camp.participants}+`, label: 'Trại Sinh' },
          { num: `${camp.teams}`, label: 'Đội Tranh Tài' },
          { num: '5', label: 'Kỳ Trại' },
          { num: `${camp.activitiesCount}+`, label: 'Hoạt Động' },
          { num: '959', label: 'Người Theo Dõi' },
        ].map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-number">{s.num}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
