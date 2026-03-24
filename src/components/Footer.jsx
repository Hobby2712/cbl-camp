export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">☀️</div>
              <div>
                <div className="footer-logo-name">Chuyên Bảo Lộc Camp</div>
                <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.4)', letterSpacing: 1 }}>
                  CBLC · SINCE 2019 · LÂM ĐỒNG
                </div>
              </div>
            </div>
            <p className="footer-brand-desc">
              Sự kiện hè thường niên dành cho các thế hệ học sinh THPT Chuyên Bảo Lộc, Lâm Đồng.
              Dựng trại · Trò chơi lớn · Văn nghệ — mỗi mùa hè một kỷ niệm.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/chuyenbaoloccamp" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" title="Facebook">f</a>
              <a href="https://www.instagram.com/cblcamp" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" title="Instagram">📷</a>
              <a href="https://www.facebook.com/chuyenbaoloccamp/reels" target="_blank" rel="noopener noreferrer"
                className="footer-social-btn" title="Reels">▶</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Điều Hướng</h4>
            <ul>
              <li><a href="#about">→ Về CBLC</a></li>
              <li><a href="#activities">→ Hoạt Động</a></li>
              <li><a href="#gallery">→ Hình Ảnh</a></li>
              <li><a href="#videos">→ Video</a></li>
              <li><a href="#prev-years">→ Các Kỳ Trại</a></li>
              <li><a href="#contact">→ Đăng Ký</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Các Kỳ Trại</h4>
            <ul>
              <li><a href="#prev-years">☀️ Summer Shine 2025</a></li>
              <li><a href="#prev-years">→ Summer Stars 2024</a></li>
              <li><a href="#prev-years">→ Summer Love 2023</a></li>
              <li><a href="#prev-years">→ Summer Fever 2022</a></li>
              <li><a href="#prev-years">→ Summer Ever 2019</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Liên Hệ</h4>
            <ul>
              <li><a href="https://www.facebook.com/chuyenbaoloccamp" target="_blank" rel="noopener noreferrer">
                📘 facebook.com/chuyenbaoloccamp
              </a></li>
              <li><a href="https://www.instagram.com/cblcamp" target="_blank" rel="noopener noreferrer">
                📷 Instagram: @cblcamp
              </a></li>
              <li><a href="mailto:cblsummercampsince2019@gmail.com">
                ✉️ cblsummercampsince2019@gmail.com
              </a></li>
              <li><a href="tel:0775199814">📞 077 519 9814</a></li>
            </ul>
            <div style={{
              marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(255,209,102,.08)', borderRadius: 12,
              border: '1px solid rgba(255,209,102,.2)',
            }}>
              <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '.85rem', marginBottom: '.4rem' }}>
                ☀️ Summer Shine 2025
              </div>
              <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '.8rem', lineHeight: 1.6 }}>
                THPT Chuyên Bảo Lộc<br />Bảo Lộc, Lâm Đồng<br />Tháng 8, 2025
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Chuyên Bảo Lộc Camp. Made with <span className="footer-heart">♥</span> by CBLC Team.
          </p>
          <div className="footer-links">
            <a href="#about">Về CBLC</a>
            <a href="#contact">Liên Hệ</a>
            <a href="https://www.facebook.com/chuyenbaoloccamp" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
