import { useState, useEffect } from "react";
import "./App.css";

// Lista de todas las fotos de Mari
const photos = [
  "IMG-20250907-WA0020.jpg",
  "IMG-20250907-WA0021.jpg",
  "IMG-20250907-WA0022.jpg",
  "IMG-20250907-WA0023.jpg",
  "IMG-20250907-WA0024.jpg",
  "IMG-20250907-WA0025.jpg",
  "IMG-20250907-WA0026.jpg",
  "IMG-20250907-WA0027.jpg",
  "IMG-20250907-WA0028.jpg",
  "IMG-20250907-WA0029.jpg",
  "IMG-20250907-WA0030.jpg",
  "IMG-20250907-WA0031.jpg",
  "IMG-20250907-WA0032.jpg",
  "IMG-20250907-WA0033.jpg",
  "IMG-20250907-WA0035.jpg",
  "IMG-20250907-WA0036.jpg",
  "IMG-20250907-WA0037.jpg",
  "IMG-20250907-WA0038.jpg",
  "IMG-20250907-WA0039.jpg",
  "IMG-20250907-WA0040.jpg",
  "IMG-20250907-WA0041.jpg",
  "IMG-20250907-WA0042.jpg",
  "IMG-20250907-WA0043.jpg",
  "IMG-20250907-WA0044.jpg",
  "IMG-20250907-WA0045.jpg",
  "IMG-20250907-WA0046.jpg",
  "IMG-20250907-WA0047.jpg",
  "IMG-20250907-WA0048.jpg",
  "IMG-20250907-WA0049.jpg",
  "IMG-20250907-WA0050.jpg",
  "IMG-20250907-WA0051.jpg",
  "IMG-20250907-WA0052.jpg",
  "IMG-20250907-WA0053.jpg",
  "IMG-20250907-WA0054.jpg",
  "IMG-20250907-WA0055.jpg",
  "IMG-20250907-WA0056.jpg",
  "IMG-20250907-WA0057.jpg",
  "IMG-20250907-WA0058.jpg",
  "IMG-20250907-WA0059.jpg",
  "IMG-20250907-WA0060.jpg",
  "IMG-20250907-WA0061.jpg",
];

function ConfettiHearts() {
  // Menos corazones para móviles
  const heartsCount = window.innerWidth <= 768 ? 8 : 15;
  
  return (
    <div className="confetti-hearts">
      {Array.from({ length: heartsCount }).map((_, i) => (
        <span
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

function CircularCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Versión móvil - carrusel simple
  if (isMobile) {
    return (
      <div className="mobile-carousel-container">
        <div className="mobile-carousel">
          <div className="mobile-photo-wrapper">
            <img 
              src={`/photos/${photos[currentIndex]}`} 
              alt={`Mari ${currentIndex + 1}`}
              className="mobile-photo"
            />
            <div className="mobile-photo-overlay">
              <div className="mobile-heart">💖</div>
            </div>
          </div>
        </div>
        
        <div className="mobile-controls">
          <button 
            className="mobile-btn prev"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
          >
            ‹
          </button>
          <span className="mobile-counter">
            {currentIndex + 1} / {photos.length}
          </span>
          <button 
            className="mobile-btn next"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
          >
            ›
          </button>
        </div>
        
        <div className="mobile-dots">
          {photos.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              className={`mobile-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
          {photos.length > 8 && <span className="mobile-more">+{photos.length - 8}</span>}
        </div>
      </div>
    );
  }

  // Versión desktop - carrusel con múltiples fotos
  const getVisiblePhotos = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + photos.length) % photos.length;
      visible.push({
        photo: photos[index],
        position: i,
        index: index,
      });
    }
    return visible;
  };

  return (
    <div className="elegant-carousel-container">
      <div className="carousel-stage">
        {getVisiblePhotos().map(({ photo, position, index }) => (
          <div
            key={index}
            className={`photo-card ${position === 0 ? "center" : ""} ${
              position < 0 ? "left" : position > 0 ? "right" : ""
            }`}
            style={{
              transform: `translateX(${position * 200}px) translateZ(${
                position === 0 ? 0 : -100
              }px) scale(${position === 0 ? 1.1 : 0.85})`,
              zIndex: 5 - Math.abs(position),
              opacity: Math.abs(position) > 1 ? 0.3 : 1,
            }}
            onClick={() => {
              if (position !== 0) {
                setCurrentIndex(index);
              }
            }}
          >
            <div className="card-wrapper">
              <img src={`/photos/${photo}`} alt={`Mari ${index + 1}`} />
              <div className="card-overlay">
                <div className="heart-float">💖</div>
              </div>
              {position === 0 && <div className="center-highlight"></div>}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-info">
        <div className="photo-dots">
          {photos.slice(0, 10).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
          {photos.length > 10 && <span className="more-dots">...</span>}
        </div>

        <div className="carousel-controls">
          <button
            className="ctrl-btn prev"
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + photos.length) % photos.length
              )
            }
          >
            ‹
          </button>
          <span className="photo-number">
            {currentIndex + 1} de {photos.length}
          </span>
          <button
            className="ctrl-btn next"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % photos.length)
            }
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecialWords() {
  return (
    <div className="special-words">
      <h2>💕 Mi negrita.... 💕</h2>
      <div className="words-container">
        <p>
          Es muy duro para mi escribirte algo cuando todos los días no me canso
          de decirte lo orgulloso que me haces sentir y lo mucho que te amo,
          aparte de ser una increíble pareja eres una excelente persona, traes
          paz, traes alegría, traes admiración, y es que como no admirarte
          cuando te has convertido en una persona que no se falla a si misma,
          que es disciplinada, y que ha su corta edad piensa de la manera que
          piensa. Aparte de esto tengo muchas cosas que agradecerte pero sobre
          todo te agradezco por el amor tan incondicional que me brindas, por
          ayudarme a levantarme cuando estoy mal, y por seguir ahí firme a pesar
          de las cosas que han pasado. Estas en una etapa de tu vida de
          constantes cambios y estrés, nunca pero nunca le vayas a bajar, eres
          una niña capaz de todo y juntos nos vamos a comer el mundo. Te amare
          toda mi vida negrita, y siempre vamos a ser el uno del otro.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="cumple-mari">
      <ConfettiHearts />
      <h1>🎂 Feliz Cumple Mari 🎂</h1>
      <p className="sub">Que seas muy feliz con tus 17 años, te amo.</p>

      <CircularCarousel />

      <SpecialWords />

      <div className="final-message">
        <span>Feliz cumpleaños Mari te amo</span>
        <br />
        <span className="firma">att: Tu negrito</span>
      </div>
    </div>
  );
}

export default App;
