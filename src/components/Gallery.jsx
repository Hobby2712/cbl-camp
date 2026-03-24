import { useEffect, useRef, useState } from 'react';
import { galleryImages } from '../data/campsData';

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

export default function Gallery({ camp, setLightboxImg }) {
  const images = galleryImages;

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-container">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div className="section-badge">Hình Ảnh</div>
          </div>
          <h2 className="section-title">Khoảnh Khắc Đáng Nhớ</h2>
          <p className="section-subtitle">Những tấm hình ghi lại kỷ niệm quý giá của Trại {camp.year}</p>
          <div className="section-divider" />
        </RevealSection>

        {/* Gallery grid */}
        <RevealSection delay={150}>
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setLightboxImg(img)}
                title={img.caption}
              >
                <img src={img.url} alt={img.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-caption">{img.caption}</span>
                </div>
                <div className="gallery-zoom">🔍</div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="https://www.facebook.com/chuyenbaoloccamp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              📸 Xem Thêm Hình Ảnh Trên Facebook
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
