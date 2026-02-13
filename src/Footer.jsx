import React, { useState, useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);

  const letters = ['a', 'r', 'i', 'o', 's', 't', 'e', 'a'];

  const [letterStates, setLetterStates] = useState(
    letters.map(() => ({
      transform: 'translateY(100%)',
      opacity: 0
    }))
  );

  useEffect(() => {
    const updateAnimation = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Footer tab visible hota hai jab rect.top < windowHeight
      // Hum progress tab shuru karte hain jab footer ka 20% visible ho
      // aur sirf windowHeight ka 35% scroll range use karte hain
      // → animation jaldi complete hogi, last letter kabhi clip nahi hogi
      const triggerPoint = windowHeight * 0.8;  // footer 20% visible hone ke baad shuru
      const range = windowHeight * 0.35;         // sirf 35% scroll mein poora complete

      const progress = Math.max(
        0,
        Math.min(1, (triggerPoint - rect.top) / range)
      );

      // Animate big letters (bottom reveal upward)
      const newStates = letters.map((_, index) => {
        // Stagger kam kiya — 0.05 → 0.03, range bhi 0.4 → 0.25
        const delay = index * 0.03;
        const letterProgress = Math.max(
          0,
          Math.min(1, (progress - delay) / 0.25)
        );

        return {
          transform: `translateY(${(1 - letterProgress) * 120}%)`,
          opacity: letterProgress
        };
      });

      setLetterStates(newStates);

      // Animate heading from top downward
      const heading = document.querySelector(".footer-header");
      if (heading) {
        heading.style.transform = `translateY(${(1 - progress) * -120}px)`;
        heading.style.opacity = progress;
      }
    };

    window.addEventListener("scroll", updateAnimation);
    window.addEventListener("resize", updateAnimation);
    updateAnimation();

    return () => {
      window.removeEventListener("scroll", updateAnimation);
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style>{`
        .footer-container {
          position: relative;
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #7f1d1d 100%);
          overflow: hidden;
        }

        .footer-content {
          position: relative;
          z-index: 2;
          padding: 60px 50px 0px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .parallax-clip {
          overflow: hidden;
          padding-top: 0.2em;
          padding-bottom: 0.12em;
          /* Footer content ke padding se bahar nikalo */
          margin-left: -50px;
          margin-right: -50px;
          padding-left: 50px;
        }

        .footer-header {
          margin-bottom: 40px;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.6s ease;
          will-change: transform, opacity;
        }

        .brand-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 5px;
          letter-spacing: 2px;
        }

        .brand-subtitle {
          font-size: 1.2rem;
          color: #1a1a1a;
          letter-spacing: 1px;
        }

        .footer-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 10px;
        }

        .nav-section h3 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .nav-section ul {
          list-style: none;
        }

        .nav-section ul li {
          margin-bottom: 12px;
          color: #1a1a1a;
          font-size: 0.95rem;
          letter-spacing: 1px;
        }

        .nav-section ul li a {
          color: #1a1a1a;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-section ul li a:hover {
          color: #4a4a4a;
        }

        .parallax-container {
          position: relative;
          /* No fixed height, no overflow hidden — text natural height lega */
          overflow: visible;
          margin-bottom: 0;
          /* Animation ke liye letters neeche se aate hain, clip karna zaroori */
          clip-path: inset(0 0 0 0);
        }

        .parallax-text {
          position: relative;
          left: 0;
          /* Responsive font-size */
          font-size: clamp(5rem, 18vw, 18rem);
          font-weight: 900;
          color: #1a1a1a;
          line-height: 0.85;
          letter-spacing: -0.02em;
          text-transform: lowercase;
          white-space: nowrap;
          display: flex;
          /* Padding bottom thoda taaki descenders clip na ho */
          padding-bottom: 0.1em;
        }

        .parallax-text span {
          display: inline-block;
          transition: transform 0.8s cubic-bezier(0.68, -0.75, 0.265, 1.75),
                      opacity 0.5s ease;
        }

        /* FIX: border-top se seedha shuru, koi gap nahi */
        .footer-bottom {
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          padding: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          color: #1a1a1a;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.85rem;
        }

        .scroll-top {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 60px;
          height: 60px;
          background-color: #1a1a1a;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .scroll-top svg {
          width: 30px;
          height: 30px;
          fill: white;
        }
      `}</style>

      <footer className="footer-container" ref={footerRef}>
        <div className="footer-content">

          <div className="footer-header">
            <h1 className="brand-title">VANGUARD</h1>
            <p className="brand-subtitle">BY TRADITION</p>
          </div>

          <nav className="footer-nav">
            <div className="nav-section">
              <h3>ARIOSTEA</h3>
              <ul>
                <li>VIA CIMABUE, 20</li>
                <li>42014, CASTELLARANO</li>
                <li>REGGIO EMILIA — ITALY</li>
              </ul>
            </div>

            <div className="nav-section">
              <h3>NAVIGATION</h3>
              <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#">COLLECTIONS</a></li>
                <li><a href="#">PROJECTS</a></li>
              </ul>
            </div>

            <div className="nav-section">
              <h3>FOLLOW</h3>
              <ul>
                <li><a href="#">FACEBOOK</a></li>
                <li><a href="#">INSTAGRAM</a></li>
                <li><a href="#">LINKEDIN</a></li>
              </ul>
            </div>
          </nav>

          <div className="parallax-clip">
            <div className="parallax-container">
              <div className="parallax-text">
                {letters.map((letter, index) => (
                  <span
                    key={index}
                    style={{
                      transform: letterStates[index].transform,
                      opacity: letterStates[index].opacity
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 ARIOSTEA</div>
            <div className="footer-links">
              <a href="#">LEGAL</a>
              <a href="#">PRIVACY</a>
              <a href="#">COOKIES</a>
            </div>
          </div>

        </div>

        <div className="scroll-top" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24">
            <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z" />
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;