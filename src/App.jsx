import { useState, useEffect, useRef } from 'react'
import Header from './Header'
import ImageCarousel from './ImageCarousel'
import Projects from './Projects'
import Footer from './Footer'
import Ariostea from './Ariostea'
import './App(3).css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeWordCount, setActiveWordCount] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down') // 👈 track direction
  const [deactivatingWords, setDeactivatingWords] = useState(new Set()) // 👈 track falling words
  const textContainerRef = useRef(null)
  const lastScrollY = useRef(0)
  const lastActiveCount = useRef(0)
  
  const text = `An innovation that is both inspired by and results from the innate desire to improve, renew, and reinvent surfaces as we know them. Ariostea, VANGUARD BY TRADITION. Technology as an invitation to surpass the boundaries of standardization and shape a contemporary, bold, and timeless aesthetic. A "new" that's as much about the process as it is about a lifestyle.`
  
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
    if (showIntro) return
    
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!textContainerRef.current) return
          
          // Detect scroll direction
          const currentScrollY = window.scrollY
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
          setScrollDirection(direction)
          lastScrollY.current = currentScrollY
          
          const rect = textContainerRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const start = windowHeight * 0.75
          const end = -rect.height * 0.3
          
          let progress = (start - rect.top) / (start - end)
          progress = Math.max(0, Math.min(1, progress))
          
          const totalWords = words.length
          const newActiveCount = Math.floor(progress * totalWords)
          
          // 👇 Detect words that are deactivating (scrolling up)
          if (newActiveCount < lastActiveCount.current && direction === 'up') {
            const newDeactivating = new Set()
            for (let i = newActiveCount; i < lastActiveCount.current; i++) {
              newDeactivating.add(i)
            }
            setDeactivatingWords(newDeactivating)
            
            // Clear after animation completes
            setTimeout(() => {
              setDeactivatingWords(new Set())
            }, 400) // Match this to CSS animation duration
          }
          
          lastActiveCount.current = newActiveCount
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
  
  if (showIntro) {
    return <Ariostea onFinish={() => setShowIntro(false)} />
  }
  
  return (
    <div className="app">
      <Header />
      
      <div className="hero-section">
        <img
          src="/ar-showroom_ariostea-castellarano-it-09_2024-ref3_part17-building_exhibition_tiles.jpg"
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
                } ${deactivatingWords.has(index) ? 'falling' : ''}`}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <ImageCarousel />
      <Projects />
      <Footer />
    </div>
  )
}

export default App