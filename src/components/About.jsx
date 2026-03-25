import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString('vi-VN')}{suffix}</span>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const MOBILE_IMG = 'https://res.cloudinary.com/dxtcn1wpn/image/upload/v1774443608/Untitled_pfxmnc.jpg';
const DESKTOP_IMG = 'https://res.cloudinary.com/dxtcn1wpn/image/upload/v1774166823/cblc/backgrounds/grrrwhrgrwzeeqczk9tv.jpg';

export default function About({ camp }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 580);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 580);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return (
    <section id="about" className="about">
      <div className="about-container">
        <Reveal>
          <div className="about-header">
            <div className="section-badge">Về CBLC</div>
            <h2 className="section-title">Chuyên Bảo Lộc Camp là gì?</h2>
            <div className="section-divider" />
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-image-wrap">
              <img
                src={isMobile ? MOBILE_IMG : DESKTOP_IMG}
                alt="Trại sinh Chuyên Bảo Lộc Camp"
                className="about-image"
              />
              <div className="about-image-badge">
                <div className="about-image-badge-num">Since</div>
                <div className="about-image-badge-num" style={{ fontSize: '1.5rem' }}>2019</div>
                <div className="about-image-badge-text">CBLC · 5 Kỳ Trại</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="about-text">
              <div className="section-badge">Sự Kiện Của Học Sinh Chuyên Bảo Lộc</div>
              <h2>Sân Chơi Hè Rực Rỡ<br />Của Chuyên Bảo Lộc</h2>
              <p>
                <strong>Chuyên Bảo Lộc Camp (CBLC)</strong> là sự kiện hè thường niên dành riêng cho các thế hệ học sinh trường <em>THPT Chuyên Bảo Lộc, Lâm Đồng</em>. Được tổ chức lần đầu vào năm 2019, CBLC nhanh chóng trở thành một trong những sự kiện được mong chờ nhất của học sinh Chuyên Bảo Lộc mỗi mùa hè.
              </p>
              <p>
                Mỗi kỳ trại quy tụ hàng trăm trại sinh chia thành nhiều đội, tranh tài qua các phần thi đặc sắc như <strong>dựng trại</strong>, <strong>trò chơi lớn</strong>, <strong>tranh luận</strong>, <strong>văn nghệ</strong> và <strong>bế mạc</strong>. CBLC không chỉ là cuộc thi – đây là nơi những tình bạn bền chặt được hình thành và những kỷ niệm tuổi học trò đẹp nhất được khắc ghi.
              </p>
              <p>
                Năm 2025, Summer Shine bùng cháy với chủ đề <em>"Summer never shy – Summer only shine"</em>. Trại Tinh Tú và các đội khác đã mang đến những màn trình diễn văn nghệ sôi động, được hàng trăm người hưởng ứng.
              </p>
              <div className="about-highlights">
                {camp.highlights.map((h, i) => (
                  <div key={i} className="about-highlight-card">
                    <span className="about-highlight-icon">{h.icon}</span>
                    <div>
                      <div className="about-highlight-title">{h.title}</div>
                      <div className="about-highlight-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="about-stats" style={{ marginTop: '4rem' }}>
            {[
              { num: 5, suffix: ' kỳ', label: 'Năm Tổ Chức (2019–2025)' },
              { num: 959, suffix: '+', label: 'Người Theo Dõi Facebook' },
              { num: 150, suffix: '+', label: 'Trại Sinh Mỗi Năm' },
            ].map((s, i) => (
              <div key={i} className="about-stat">
                <span className="about-stat-num"><CountUp target={s.num} suffix={s.suffix} /></span>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
