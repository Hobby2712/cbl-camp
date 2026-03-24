import { useEffect, useRef, useState } from 'react';

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

const FB_VIDEOS = [
  {
    title: 'Trại Tinh Tú – Màn Trình Diễn Văn Nghệ Summer Shine 2025',
    desc: '203 lượt thích · 22 tháng 8, 2025',
    icon: '🌟',
    url: 'https://www.facebook.com/chuyenbaoloccamp',
  },
  {
    title: 'Highlight Trò Chơi Lớn – Summer Shine 2025',
    desc: '2.4K lượt xem · CBLC 2025',
    icon: '🎯',
    url: 'https://www.facebook.com/chuyenbaoloccamp/reels',
  },
  {
    title: 'Bế Mạc Summer Shine',
    desc: '2.2K lượt xem · Khoảnh khắc thiêng liêng nhất',
    icon: '🔥',
    url: 'https://www.facebook.com/chuyenbaoloccamp/reels',
  },
  {
    title: 'Dựng Trại & Trang Trí Cổng Trại 2025',
    desc: '1.7K lượt xem · Sáng tạo không giới hạn',
    icon: '🏕️',
    url: 'https://www.facebook.com/chuyenbaoloccamp/reels',
  },
];

export default function VideoSection() {
  return (
    <section id="videos" className="videos">
      <div className="videos-container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>
            <div className="section-badge">Video & Reels</div>
          </div>
          <h2 className="section-title">Khoảnh Khắc Summer Shine</h2>
          <p className="section-subtitle">
            Xem lại những màn trình diễn, trò chơi đầy cảm xúc trên trang Facebook CBLC
          </p>
          <div className="section-divider" />
        </Reveal>

        <div className="videos-grid">
          {FB_VIDEOS.map((v, i) => (
            <Reveal key={i} delay={i * 120}>
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="video-card" style={{ display: 'block' }}>
                <div className="video-fb-placeholder">
                  <span className="video-fb-icon">{v.icon}</span>
                  <span className="video-fb-text">{v.title}</span>
                  <span className="video-fb-sub">{v.desc}</span>
                  <span style={{
                    marginTop: '.5rem', display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,.18)', color: 'white',
                    padding: '6px 16px', borderRadius: 50, fontSize: '.82rem', fontWeight: 700,
                  }}>
                    ▶ Xem trên Facebook
                  </span>
                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                  <div className="video-year">📘 Chuyên Bảo Lộc Camp · {v.desc}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div style={{
            marginTop: '3rem', padding: '2.5rem',
            background: 'linear-gradient(135deg,#fff3e0,#fff8f0)',
            borderRadius: 'var(--radius-lg)', textAlign: 'center',
            border: '1px solid #fde0b0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>📱</div>
            <div>
              <p style={{ fontWeight: 800, color: 'var(--dark-mid)', fontSize: '1.15rem', marginBottom: '.3rem' }}>
                10+ Video & Reels trên trang CBLC
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: '.9rem' }}>
                Từ văn nghệ, debates đến trò chơi lớn — tất cả đều có trên Facebook Chuyên Bảo Lộc Camp
              </p>
            </div>
            <a
              href="https://www.facebook.com/chuyenbaoloccamp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              📘 Xem Tất Cả Video Trên Facebook
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
