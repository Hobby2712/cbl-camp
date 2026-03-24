import { useState } from 'react';

export default function Navbar({ scrolled, selectedYear, setSelectedYear, years }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'Về Trại' },
    { href: '#activities', label: 'Hoạt Động' },
    { href: '#gallery', label: 'Hình Ảnh' },
    { href: '#videos', label: 'Video' },
    { href: '#prev-years', label: 'Các Năm' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="navbar-logo">
        <img
          src="https://res.cloudinary.com/dxtcn1wpn/image/upload/v1774166833/cblc/profiles/lrsminh6q6r07hrekjmo.jpg"
          alt="CBLC Logo"
          className="navbar-logo-icon"
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
        <div className="navbar-logo-text">
          <span className="navbar-logo-name">Chuyên Bảo Lộc Camp</span>
        </div>
      </a>

      <div className="navbar-links">
        {navLinks.map(l => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>

      <select
        className="navbar-year-select"
        value={selectedYear}
        onChange={e => {
          setSelectedYear(Number(e.target.value));
          document.getElementById('prev-years')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {years.map(y => (
          <option key={y} value={y}>{y === Math.max(...years) ? `🏕️ ${y} (Hiện tại)` : `📅 ${y}`}</option>
        ))}
      </select>

      <a href="#contact" className="navbar-cta">Đăng Ký Trại</a>

      <button
        className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      <div className={`navbar-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)} style={{ color: 'var(--gold)', fontWeight: 700 }}>
          🏕️ Đăng Ký Trại 2026
        </a>
      </div>
    </nav>
  );
}
