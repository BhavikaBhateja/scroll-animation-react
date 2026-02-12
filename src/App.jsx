import { useState, useEffect, useRef } from 'react'
import ImageCarousel from './ImageCarousel'
import Footer from './Footer'
import Ariostea from './Ariostea'   // 👈 import splash
import './App.css'

function App() {

  const [showIntro, setShowIntro] = useState(true)  // 👈 control splash

  const [activeWordCount, setActiveWordCount] = useState(0)
  const textContainerRef = useRef(null)

  const text = `An innovation that is both inspired by and results from the innate desire to improve, renew, and reinvent surfaces as we know them. Ariostea, VANGUARD BY TRADITION. Technology as an invitation to surpass the boundaries of standardization and shape a contemporary, bold, and timeless aesthetic. A “new” that’s as much about the process as it is about a lifestyle.`

  const words = text.split(/\s+/).map((word, index) => {
    const isVanguard =
      word === 'VANGUARD' ||
      word === 'BY' ||
      word === 'TRADITION.'
    return {
      text: word,
      index,
      isHighlight: isVanguard
    }
  })

  useEffect(() => {
    if (showIntro) return  // 👈 don't run scroll animation during intro

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!textContainerRef.current) return

          const rect = textContainerRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight

          const start = windowHeight * 0.95
          const end = -rect.height * 0.2

          let progress = (start - rect.top) / (start - end)
          progress = Math.max(0, Math.min(1, progress))

          const totalWords = words.length
          const newActiveCount = Math.floor(progress * totalWords)

          setActiveWordCount(newActiveCount)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [words.length, showIntro])


  // 🔥 SHOW SPLASH FIRST
  if (showIntro) {
    return <Ariostea onFinish={() => setShowIntro(false)} />
  }


  // 🔥 YOUR ORIGINAL APP CONTENT
  return (
    <div className="app">

      <div className="hero-section">
        <img
          src="/Homepage - Ariostea_files/ar-showroom_ariostea-castellarano-it-09_2024-ref3_part17-building_exhibition_tiles.jpg"
          alt="Hero"
        />
      </div>

      <div className="hero-gap"></div>

      <div className="content-section">
        <div className="text-container" ref={textContainerRef}>
          <div className="about-label">ABOUT</div>
          <div className="animated-text">
            {words.map((word, index) => (
              <span
                key={index}
                className={`word ${word.isHighlight ? 'highlight' : ''} ${
                  index < activeWordCount ? 'active' : ''
                }`}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ImageCarousel />
      <Footer />
    </div>
  )
}

export default App
