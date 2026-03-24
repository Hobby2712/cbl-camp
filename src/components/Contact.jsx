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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', generation: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--forest-mint)' }}>
              Đăng Ký
            </div>
          </div>
          <h2 className="section-title">Tham Gia Trại 2026</h2>
          <p className="section-subtitle">Hãy đăng ký để cùng chúng tôi viết tiếp hành trình xanh</p>
          <div className="section-divider" />
        </RevealSection>

        <RevealSection delay={100}>
          <div className="contact-info">
            {[
              { icon: '📍', title: 'Địa Điểm', text: 'Nhà thờ Tân Hóa\nBảo Lộc, Lâm Đồng' },
              { icon: '📅', title: 'Thời Gian', text: '18 – 20 Tháng 7, 2026\nBắt đầu: 08:00 sáng 18/07' },
              { icon: '📱', title: 'Liên Hệ', text: 'Facebook: Chuyên Bảo Lộc Camp\nEmail: chuyenbaoloccamp@gmail.com' },
            ].map((c, i) => (
              <div key={i} className="contact-info-card">
                <span className="contact-info-icon">{c.icon}</span>
                <div className="contact-info-title">{c.title}</div>
                <div className="contact-info-text" style={{ whiteSpace: 'pre-line' }}>{c.text}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="contact-form">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">🎉</div>
                <h3>Đăng Ký Thành Công!</h3>
                <p>Cảm ơn bạn đã đăng ký tham gia Trại Chuyên Bảo Lộc 2026.</p>
                <p style={{ marginTop: '0.5rem' }}>Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                <p style={{ marginTop: '1rem', color: 'var(--gold)', fontWeight: 600 }}>Hẹn gặp bạn ở Bảo Lộc! 🌲</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ và Tên *</label>
                    <input name="name" required placeholder="Nguyễn Văn A" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input name="email" type="email" required placeholder="email@example.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Số Điện Thoại *</label>
                    <input name="phone" required placeholder="0901 234 567" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Thế Hệ *</label>
                    <select name="generation" required value={form.generation} onChange={handleChange}>
                      <option value="">Chọn thế hệ của bạn</option>
                      <option>Thế hệ 1980s</option>
                      <option>Thế hệ 1990s</option>
                      <option>Thế hệ 2000s</option>
                      <option>Thế hệ 2010s</option>
                      <option>Sinh viên hiện tại</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vai Trò</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                      <option value="">Chọn vai trò</option>
                      <option>Cựu học sinh / sinh viên</option>
                      <option>Giáo viên / Giảng viên</option>
                      <option>Sinh viên hiện tại</option>
                      <option>Người thân / Bạn bè</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Bạn biết đến trại qua</label>
                    <select>
                      <option>Facebook</option>
                      <option>Bạn bè giới thiệu</option>
                      <option>Website</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Lời Nhắn</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Chia sẻ kỷ niệm về trại, lý do muốn tham gia, hoặc bất kỳ điều gì bạn muốn nhắn gửi..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? '⏳ Đang gửi đăng ký...' : '🌿 Đăng Ký Tham Gia Trại 2026'}
                </button>
              </form>
            )}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
