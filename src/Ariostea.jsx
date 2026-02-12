import React, { useEffect, useState } from "react";

export default function Ariostea({ onFinish }) {
  const title = "ariostea";
  const letters = title.split("");

  const [progress, setProgress] = useState(0);
  const [revealStates, setRevealStates] = useState(
    letters.map(() => ({
      transform: "translateY(120%)",
      opacity: 0
    }))
  );

  useEffect(() => {
    let start = null;
    const duration = 1600;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        if (onFinish) setTimeout(onFinish, 400);
      }
    };

    requestAnimationFrame(animate);

    // Reveal stagger
    letters.forEach((_, index) => {
      setTimeout(() => {
        setRevealStates(prev => {
          const updated = [...prev];
          updated[index] = {
            transform: "translateY(0%)",
            opacity: 1
          };
          return updated;
        });
      }, index * 120);
    });

  }, [onFinish]);

  return (
    <>
      <style>{`
        .ariostea-container {
          background: #dadada;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 0 3vw 4vh 3vw;
          overflow: hidden;
        }

        .ariostea-title {
          width: 100%;
          font-size: 19vw;
          font-weight: 900;
          text-transform: lowercase;
          line-height: 0.8;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .letter-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
          transform: translateY(120%);
          opacity: 0;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.6s ease;
        }

        .base-letter {
          color: rgba(0, 0, 0, 0.2);
        }

        .fill-letter {
          position: absolute;
          top: 0;
          left: 0;
          color: #000;
        }
      `}</style>

      <div className="ariostea-container">
        <h1 className="ariostea-title">
          {letters.map((letter, i) => {
            const fillPercent = progress * 100;

            return (
              <span
                key={i}
                className="letter-wrapper"
                style={{
                  transform: revealStates[i].transform,
                  opacity: revealStates[i].opacity
                }}
              >
                <span className="base-letter">{letter}</span>

                <span
                  className="fill-letter"
                  style={{
                    clipPath: `inset(${100 - fillPercent}% 0 0 0)`
                  }}
                >
                  {letter}
                </span>
              </span>
            );
          })}
        </h1>
      </div>
    </>
  );
}
