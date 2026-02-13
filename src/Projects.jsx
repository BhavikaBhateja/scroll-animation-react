import { useState, useEffect, useRef } from 'react'
import './Projects.css'

/* ───────────────────────────────────────────── */
/* Scroll-Triggered Title Animation             */
/* ───────────────────────────────────────────── */
function ScrollFillTitle({ title }) {
  const [progress, setProgress] = useState(0)
  const titleRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return

      const rect = titleRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Start animation when title is 1.1 screens below
      const triggerPoint = windowHeight * 1.3
      
      if (rect.top <= triggerPoint) {
        const maxScroll = windowHeight * 0.4 // Perfect speed - 50vh scroll
        const scrolled = triggerPoint - rect.top
        const newProgress = Math.min(1, Math.max(0, scrolled / maxScroll))
        setProgress(newProgress)
      } else {
        setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const letters = title.split('')
  const nonSpaceCount = letters.filter(l => l !== ' ').length
  let nonSpaceIndex = 0

  return (
    <h2 className="projects-title" ref={titleRef}>
      {letters.map((letter, i) => {
        if (letter === ' ') {
          return <span key={i} className="letter-space" />
        }

        const idx = nonSpaceIndex++
        const staggerSpread = 0.5
        const windowSize = 1 - staggerSpread
        const letterStart = (idx / Math.max(nonSpaceCount - 1, 1)) * staggerSpread
        const letterEnd = letterStart + windowSize

        const lp = Math.min(
          1,
          Math.max(0, (progress - letterStart) / (letterEnd - letterStart))
        )

        // Vertical slide animation - bottom to top (like Ariostea)
        const translateY = (1 - lp) * 120 // Start from 120% down
        const opacity = Math.min(1, lp * 1.5)
        
        // Fill from bottom to top (invert the logic)
        const fillPercent = lp * 100

        return (
          <span 
            key={i} 
            className="letter-wrapper"
            style={{
              transform: `translateY(${translateY}%)`,
              opacity,
            }}
          >
            {/* Dark base text - always visible behind */}
            <span className="letter-base">
              {letter}
            </span>
            
            {/* White fill - reveals from bottom to top */}
            <span
              className="letter-fill"
              style={{
                clipPath: `inset(${100 - fillPercent}% 0 0 0)`, // bottom to top reveal
              }}
            >
              {letter}
            </span>
          </span>
        )
      })}
    </h2>
  )
}

/* ───────────────────────────────────────────── */
/* Projects Section                             */
/* ───────────────────────────────────────────── */
function Projects() {
  const projects = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1200&fit=crop&q=80',
      location: 'ZURICH, SWITZERLAND',
      title: 'Lindt Home of Chocolate',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=1200&fit=crop&q=80',
      location: 'SALÒ, ITALY',
      title: 'Hotel A-Rosa Lake Garda',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=1200&fit=crop&q=80',
      location: 'MILAN, ITALY',
      title: 'DOLCE&GABBANA FW 26/27 FASHION SHOW',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=1200&fit=crop&q=80',
      location: 'MILAN, ITALY',
      title: 'Casa SCV, a stylish retreat',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1200&fit=crop&q=80',
      location: 'MILAN, ITALY',
      title: 'Sonder Building',
    },
  ]

  return (
    <section className="projects-section">
      <div className="projects-container">
        {/* Animated Title */}
        <ScrollFillTitle title="PROJECTS" />

        {/* Static 5-Column Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <div className="project-location">{project.location}</div>
                <h3 className="project-title">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects