import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import PreviousYears from './components/PreviousYears';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { campsData, CURRENT_YEAR } from './data/campsData';

export default function App() {
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const years = Object.keys(campsData).map(Number).sort((a, b) => b - a);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxImg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImg]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const SPARKS = ['✨', '⭐', '🌟', '💫', '☀️', '🔆', '✦', '★'];

  return (
    <div className="app">
      {/* Animated sparks */}
      <div className="leaves-container" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <div key={i} className={`leaf leaf-${i + 1}`}>{s}</div>
        ))}
      </div>

      <Navbar
        scrolled={scrolled}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        years={years}
      />

      <Hero camp={campsData[CURRENT_YEAR]} />
      <About camp={campsData[CURRENT_YEAR]} />
      <Teams />
      <Activities />
      <Gallery camp={campsData[CURRENT_YEAR]} setLightboxImg={setLightboxImg} />
      <VideoSection />
      <PreviousYears
        campsData={campsData}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        currentYear={CURRENT_YEAR}
        setLightboxImg={setLightboxImg}
      />
      <Contact />
      <Footer />

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Đóng">✕</button>
          <img src={lightboxImg.url} alt={lightboxImg.caption} onClick={e => e.stopPropagation()} />
          {lightboxImg.caption && <p className="lightbox-caption">{lightboxImg.caption}</p>}
        </div>
      )}

      {/* Back to top */}
      <button
        className={`back-to-top ${scrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Lên đầu trang"
      >↑</button>
    </div>
  );
}
