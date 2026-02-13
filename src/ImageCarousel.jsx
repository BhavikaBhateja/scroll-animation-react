

// import { useState } from 'react'
// import { ChevronRight } from 'lucide-react'

// function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSliding, setIsSliding] = useState(false)
//   const [slideKey, setSlideKey] = useState(0)

//   const images = [
//     {
//       url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop',
//       title: 'INSIDE ULTRA',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop',
//       title: 'MODERN SURFACES',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
//       title: 'CONTEMPORARY DESIGN',
//       label: 'INSIGHT'
//     }
//   ]

//   const handleNext = () => {
//     if (isSliding) return
    
//     setIsSliding(true)
    
//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length)
//       setIsSliding(false)
//       setSlideKey(prev => prev + 1)
//     }, 800)
//   }

//   const getNextIndex = () => {
//     return (currentIndex + 1) % images.length
//   }

//   const getNextNextIndex = () => {
//     return (currentIndex + 2) % images.length
//   }

//   return (
//     <section className="carousel-section">
//       {/* Main Image (80%) */}
//       <div className="main-image-container">
//         <div className="image-wrapper" key={slideKey}>
//           {/* Current Image (slides out) */}
//           <figure className={`image-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[currentIndex].url} alt={images[currentIndex].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[currentIndex].label}</div>
//               <h2 className="image-title">{images[currentIndex].title}</h2>
//             </div>
//           </figure>

//           {/* Next Image (slides in) */}
//           <figure className={`image-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[getNextIndex()].label}</div>
//               <h2 className="image-title">{images[getNextIndex()].title}</h2>
//             </div>
//           </figure>
//         </div>
//       </div>

//       {/* Preview Image (20%) */}
//       <div className="preview-image-container">
//         <div className="preview-wrapper" key={slideKey}>
//           {/* Current Preview (slides out) */}
//           <figure className={`preview-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//             <div className="preview-overlay"></div>
//           </figure>

//           {/* Next Preview (slides in) */}
//           <figure className={`preview-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextNextIndex()].url} alt={images[getNextNextIndex()].title} />
//             <div className="preview-overlay"></div>
//           </figure>
//         </div>
//       </div>

//       {/* Arrow Button */}
//       <button className="carousel-arrow" onClick={handleNext}>
//         <ChevronRight size={32} />
//       </button>
//     </section>
//   )
// }

// export default ImageCarousel









// import { useState, useRef, useEffect } from 'react'
// import { ChevronRight } from 'lucide-react'

// /* ───────────────────────────────────────────── */
// /* Scroll Fill Title (from TextAnimation logic) */
// /* ───────────────────────────────────────────── */
// function ScrollFillTitle({ title, triggerRef }) {
//   const [progress, setProgress] = useState(0)
//   const [hasTriggered, setHasTriggered] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!triggerRef?.current || hasTriggered) return

//       const rect = triggerRef.current.getBoundingClientRect()
//       const windowHeight = window.innerHeight

//       // Trigger when section center enters viewport
//       if (rect.top < windowHeight * 0.75) {
//         setHasTriggered(true)
//       }
//     }

//     window.addEventListener('scroll', handleScroll, { passive: true })
//     handleScroll()

//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [triggerRef, hasTriggered])

//   // Animate once triggered
//   useEffect(() => {
//     if (!hasTriggered) return

//     let start = null
//     const duration = 1200 // 1.2s smooth luxury feel

//     const animate = (timestamp) => {
//       if (!start) start = timestamp
//       const elapsed = timestamp - start
//       const p = Math.min(1, elapsed / duration)
//       setProgress(p)

//       if (p < 1) requestAnimationFrame(animate)
//     }

//     requestAnimationFrame(animate)
//   }, [hasTriggered])

//   const letters = title.split('')
//   const nonSpaceCount = letters.filter(l => l !== ' ').length
//   let nonSpaceIndex = 0

//   return (
//     <h2 className="image-title" style={{ display: 'flex', flexWrap: 'wrap' }}>
//       {letters.map((letter, i) => {
//         if (letter === ' ') {
//           return <span key={i} style={{ width: '20px' }} />
//         }

//         const idx = nonSpaceIndex++
//         const staggerSpread = 0.6
//         const windowSize = 1 - staggerSpread
//         const letterStart =
//           (idx / Math.max(nonSpaceCount - 1, 1)) * staggerSpread
//         const letterEnd = letterStart + windowSize

//         const lp = Math.min(
//           1,
//           Math.max(0, (progress - letterStart) / (letterEnd - letterStart))
//         )

//         const translateY = (1 - lp) * 80
//         const opacity = Math.min(1, lp * 2.5)
//         const fillPercent = lp * 100

//         return (
//           <span
//             key={i}
//             style={{
//               display: 'inline-block',
//               overflow: 'hidden',
//               position: 'relative',
//               lineHeight: 1.05,
//             }}
//           >
//             {/* Dark base */}
//             <span
//               style={{
//                 display: 'block',
//                 color: '#1c1c1c',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//               }}
//             >
//               {letter}
//             </span>

//             {/* White fill */}
//             <span
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 display: 'block',
//                 color: '#ffffff',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//                 clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
//               }}
//             >
//               {letter}
//             </span>
//           </span>
//         )
//       })}
//     </h2>
//   )
// }


// /* ───────────────────────────────────────────── */
// /* Image Carousel */
// /* ───────────────────────────────────────────── */
// function ImageCarousel() {
//   const sectionRef = useRef(null)

//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSliding, setIsSliding] = useState(false)
//   const [slideKey, setSlideKey] = useState(0)

//   const images = [
//     {
//       url:
//         'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop',
//       title: 'INSIDE ULTRA',
//       label: 'INSIGHT',
//     },
//     {
//       url:
//         'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop',
//       title: 'MODERN SURFACES',
//       label: 'INSIGHT',
//     },
//     {
//       url:
//         'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
//       title: 'CONTEMPORARY DESIGN',
//       label: 'INSIGHT',
//     },
//   ]

//   const handleNext = () => {
//     if (isSliding) return

//     setIsSliding(true)

//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length)
//       setIsSliding(false)
//       setSlideKey((prev) => prev + 1)
//     }, 800)
//   }

//   const getNextIndex = () => (currentIndex + 1) % images.length
//   const getNextNextIndex = () => (currentIndex + 2) % images.length

//   return (
//     <section ref={sectionRef} className="carousel-section">
//       {/* Main Image (80%) */}
//       <div className="main-image-container">
//         <div className="image-wrapper" key={slideKey}>
//           {/* Current Image */}
//           <figure
//             className={`image-figure current ${
//               isSliding ? 'sliding-out' : ''
//             }`}
//           >
//             <img
//               src={images[currentIndex].url}
//               alt={images[currentIndex].title}
//             />
//             <div className="image-overlay">
//               <div className="image-label">
//                 {images[currentIndex].label}
//               </div>

//               {/* Apply animation only on first slide */}
//               {currentIndex === 0 ? (
//                 <ScrollFillTitle
//                   title={images[currentIndex].title}
//                   triggerRef={sectionRef}
//                 />
//               ) : (
//                 <h2 className="image-title">
//                   {images[currentIndex].title}
//                 </h2>
//               )}
//             </div>
//           </figure>

//           {/* Next Image */}
//           <figure
//             className={`image-figure next ${
//               isSliding ? 'sliding-in' : ''
//             }`}
//           >
//             <img
//               src={images[getNextIndex()].url}
//               alt={images[getNextIndex()].title}
//             />
//             <div className="image-overlay">
//               <div className="image-label">
//                 {images[getNextIndex()].label}
//               </div>
//               <h2 className="image-title">
//                 {images[getNextIndex()].title}
//               </h2>
//             </div>
//           </figure>
//         </div>
//       </div>

//       {/* Preview Image (20%) */}
//       <div className="preview-image-container">
//         <div className="preview-wrapper" key={slideKey}>
//           <figure
//             className={`preview-figure current ${
//               isSliding ? 'sliding-out' : ''
//             }`}
//           >
//             <img
//               src={images[getNextIndex()].url}
//               alt={images[getNextIndex()].title}
//             />
//           </figure>

//           <figure
//             className={`preview-figure next ${
//               isSliding ? 'sliding-in' : ''
//             }`}
//           >
//             <img
//               src={images[getNextNextIndex()].url}
//               alt={images[getNextNextIndex()].title}
//             />
//           </figure>
//         </div>
//       </div>

//       {/* Arrow Button */}
//       <button className="carousel-arrow" onClick={handleNext}>
//         <ChevronRight size={32} />
//       </button>
//     </section>
//   )
// }

// export default ImageCarousel


// import { useState, useEffect } from 'react'
// import { ChevronRight } from 'lucide-react'

// /* ───────────────────────────────────────────── */
// /* Animated Title (runs on every slide change)  */
// /* ───────────────────────────────────────────── */
// function ScrollFillTitle({ title }) {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     let start = null
//     const duration = 1000 // animation duration

//     setProgress(0)

//     const animate = (timestamp) => {
//       if (!start) start = timestamp
//       const elapsed = timestamp - start
//       const p = Math.min(1, elapsed / duration)
//       setProgress(p)

//       if (p < 1) requestAnimationFrame(animate)
//     }

//     requestAnimationFrame(animate)
//   }, [title]) // re-run animation when title changes

//   const letters = title.split('')
//   const nonSpaceCount = letters.filter(l => l !== ' ').length
//   let nonSpaceIndex = 0

//   return (
//     <h2 className="image-title" style={{ display: 'flex', flexWrap: 'wrap' }}>
//       {letters.map((letter, i) => {
//         if (letter === ' ') {
//           return <span key={i} style={{ width: '20px' }} />
//         }

//         const idx = nonSpaceIndex++
//         const staggerSpread = 0.6
//         const windowSize = 1 - staggerSpread
//         const letterStart =
//           (idx / Math.max(nonSpaceCount - 1, 1)) * staggerSpread
//         const letterEnd = letterStart + windowSize

//         const lp = Math.min(
//           1,
//           Math.max(0, (progress - letterStart) / (letterEnd - letterStart))
//         )

//         const translateY = (1 - lp) * 80
//         const opacity = Math.min(1, lp * 2.5)
//         const fillPercent = lp * 100

//         return (
//           <span
//             key={i}
//             style={{
//               display: 'inline-block',
//               overflow: 'hidden',
//               position: 'relative',
//               lineHeight: 1.05,
//             }}
//           >
//             {/* Dark base */}
//             <span
//               style={{
//                 display: 'block',
//                 color: '#1c1c1c',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//               }}
//             >
//               {letter}
//             </span>

//             {/* White fill */}
//             <span
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 display: 'block',
//                 color: '#ffffff',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//                 clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
//               }}
//             >
//               {letter}
//             </span>
//           </span>
//         )
//       })}
//     </h2>
//   )
// }

// /* ───────────────────────────────────────────── */
// /* Image Carousel                               */
// /* ───────────────────────────────────────────── */
// function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSliding, setIsSliding] = useState(false)
//   const [slideKey, setSlideKey] = useState(0)

//   const images = [
//     {
//       url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop',
//       title: 'INSIDE ULTRA',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop',
//       title: 'MODERN SURFACES',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
//       title: 'CONTEMPORARY DESIGN',
//       label: 'INSIGHT'
//     }
//   ]

//   const handleNext = () => {
//     if (isSliding) return

//     setIsSliding(true)

//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length)
//       setIsSliding(false)
//       setSlideKey(prev => prev + 1)
//     }, 800)
//   }

//   const getNextIndex = () => (currentIndex + 1) % images.length
//   const getNextNextIndex = () => (currentIndex + 2) % images.length

//   return (
//     <section className="carousel-section">
//       {/* Main Image (80%) */}
//       <div className="main-image-container">
//         <div className="image-wrapper" key={slideKey}>
          
//           {/* Current Image */}
//           <figure className={`image-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[currentIndex].url} alt={images[currentIndex].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[currentIndex].label}</div>

//               {/* 🔥 Animated Title */}
//               <ScrollFillTitle title={images[currentIndex].title} />

//             </div>
//           </figure>

//           {/* Next Image */}
//           <figure className={`image-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[getNextIndex()].label}</div>
//               <h2 className="image-title">
//                 {images[getNextIndex()].title}
//               </h2>
//             </div>
//           </figure>

//         </div>
//       </div>

//       {/* Preview Image (20%) */}
//       <div className="preview-image-container">
//         <div className="preview-wrapper" key={slideKey}>
//           <figure className={`preview-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//           </figure>

//           <figure className={`preview-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextNextIndex()].url} alt={images[getNextNextIndex()].title} />
//           </figure>
//         </div>
//       </div>

//       {/* Arrow Button */}
//       <button className="carousel-arrow" onClick={handleNext}>
//         <ChevronRight size={32} />
//       </button>
//     </section>
//   )
// }

// export default ImageCarousel

// import { useState, useEffect, useRef } from 'react'
// import { ChevronRight } from 'lucide-react'

// /* ───────────────────────────────────────────── */
// /* Animated Title                               */
// /* triggerKey change hone pe animation restart  */
// /* ───────────────────────────────────────────── */
// function ScrollFillTitle({ title, triggerKey }) {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     let start = null
//     let rafId = null
//     const duration = 1000

//     setProgress(0)

//     const animate = (timestamp) => {
//       if (!start) start = timestamp
//       const elapsed = timestamp - start
//       const p = Math.min(1, elapsed / duration)
//       setProgress(p)
//       if (p < 1) rafId = requestAnimationFrame(animate)
//     }

//     rafId = requestAnimationFrame(animate)

//     return () => {
//       if (rafId) cancelAnimationFrame(rafId)
//     }
//   }, [triggerKey]) // ← triggerKey change hone pe re-run

//   const letters = title.split('')
//   const nonSpaceCount = letters.filter(l => l !== ' ').length
//   let nonSpaceIndex = 0

//   return (
//     <h2 className="image-title" style={{ display: 'flex', flexWrap: 'wrap' }}>
//       {letters.map((letter, i) => {
//         if (letter === ' ') {
//           return <span key={i} style={{ width: '20px' }} />
//         }

//         const idx = nonSpaceIndex++
//         const staggerSpread = 0.6
//         const windowSize = 1 - staggerSpread
//         const letterStart =
//           (idx / Math.max(nonSpaceCount - 1, 1)) * staggerSpread
//         const letterEnd = letterStart + windowSize

//         const lp = Math.min(
//           1,
//           Math.max(0, (progress - letterStart) / (letterEnd - letterStart))
//         )

//         const translateY = (1 - lp) * 80
//         const opacity = Math.min(1, lp * 2.5)
//         const fillPercent = lp * 100

//         return (
//           <span
//             key={i}
//             style={{
//               display: 'inline-block',
//               overflow: 'hidden',
//               position: 'relative',
//               lineHeight: 1.05,
//             }}
//           >
//             {/* Dark base */}
//             <span
//               style={{
//                 display: 'block',
//                 color: '#1c1c1c',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//               }}
//             >
//               {letter}
//             </span>

//             {/* White fill */}
//             <span
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 display: 'block',
//                 color: '#ffffff',
//                 transform: `translateY(${translateY}px)`,
//                 opacity,
//                 clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
//               }}
//             >
//               {letter}
//             </span>
//           </span>
//         )
//       })}
//     </h2>
//   )
// }

// /* ───────────────────────────────────────────── */
// /* Image Carousel                               */
// /* ───────────────────────────────────────────── */
// function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSliding, setIsSliding] = useState(false)
//   const [slideKey, setSlideKey] = useState(0)

//   // Scroll visibility ke liye
//   const [isVisible, setIsVisible] = useState(false)
//   const [scrollTriggerKey, setScrollTriggerKey] = useState(0)
//   const carouselRef = useRef(null)

//   const images = [
//     {
//       url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop',
//       title: 'INSIDE ULTRA',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop',
//       title: 'MODERN SURFACES',
//       label: 'INSIGHT'
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
//       title: 'CONTEMPORARY DESIGN',
//       label: 'INSIGHT'
//     }
//   ]

//   /* ── IntersectionObserver: carousel viewport mein aaye to animation trigger ── */
//   useEffect(() => {
//     const node = carouselRef.current
//     if (!node) return

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         const nowVisible = entry.isIntersecting

//         if (nowVisible && !isVisible) {
//           // Pehli baar ya wapas view mein aane pe animation chalao
//           setScrollTriggerKey(prev => prev + 1)
//         }

//         setIsVisible(nowVisible)
//       },
//       {
//         threshold: 0.3, // 30% visible hone pe trigger
//       }
//     )

//     observer.observe(node)
//     return () => observer.disconnect()
//   }, [isVisible])

//   const handleNext = () => {
//     if (isSliding) return

//     setIsSliding(true)

//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length)
//       setIsSliding(false)
//       setSlideKey(prev => prev + 1)
//       // Slide change pe bhi scrollTriggerKey update karo
//       setScrollTriggerKey(prev => prev + 1)
//     }, 800)
//   }

//   const getNextIndex = () => (currentIndex + 1) % images.length
//   const getNextNextIndex = () => (currentIndex + 2) % images.length

//   // Combined trigger: slide change ya scroll visibility dono
//   const animTriggerKey = `${slideKey}-${scrollTriggerKey}`

//   return (
//     <section className="carousel-section" ref={carouselRef}>
//       {/* Main Image (80%) */}
//       <div className="main-image-container">
//         <div className="image-wrapper" key={slideKey}>

//           {/* Current Image */}
//           <figure className={`image-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[currentIndex].url} alt={images[currentIndex].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[currentIndex].label}</div>

//               {/* ✅ Scroll + Slide dono se trigger hone wali animation */}
//               <ScrollFillTitle
//                 title={images[currentIndex].title}
//                 triggerKey={animTriggerKey}
//               />

//             </div>
//           </figure>

//           {/* Next Image */}
//           <figure className={`image-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//             <div className="image-overlay">
//               <div className="image-label">{images[getNextIndex()].label}</div>
//               <h2 className="image-title">
//                 {images[getNextIndex()].title}
//               </h2>
//             </div>
//           </figure>

//         </div>
//       </div>

//       {/* Preview Image (20%) */}
//       <div className="preview-image-container">
//         <div className="preview-wrapper" key={slideKey}>
//           <figure className={`preview-figure current ${isSliding ? 'sliding-out' : ''}`}>
//             <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
//           </figure>

//           <figure className={`preview-figure next ${isSliding ? 'sliding-in' : ''}`}>
//             <img src={images[getNextNextIndex()].url} alt={images[getNextNextIndex()].title} />
//           </figure>
//         </div>
//       </div>

//       {/* Arrow Button */}
//       <button className="carousel-arrow" onClick={handleNext}>
//         <ChevronRight size={32} />
//       </button>
//     </section>
//   )
// }

// export default ImageCarousel


import { useState, useEffect, useRef } from 'react'
import { ChevronRight } from 'lucide-react'

function ScrollFillTitle({ title, triggerKey }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start = null
    let rafId = null
    const duration = 1200
    setProgress(0)

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const p = Math.min(1, elapsed / duration)
      setProgress(p)
      if (p < 1) rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => { if (rafId) cancelAnimationFrame(rafId) }
  }, [triggerKey])

  const letters = title.split('')
  const nonSpaceCount = letters.filter(l => l !== ' ').length
  let nonSpaceIndex = 0

  return (
    <h2 className="image-title" style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      {letters.map((letter, i) => {
        if (letter === ' ') {
          return <span key={i} style={{ width: '20px' }} />
        }

        const idx = nonSpaceIndex++
        const staggerSpread = 0.6
        const windowSize = 1 - staggerSpread
        const letterStart = (idx / Math.max(nonSpaceCount - 1, 1)) * staggerSpread
        const letterEnd = letterStart + windowSize

        const lp = Math.min(1, Math.max(0, (progress - letterStart) / (letterEnd - letterStart)))
        const translateY = (1 - lp) * 80
        const opacity = Math.min(1, lp * 2.5)
        const fillPercent = lp * 100

        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', position: 'relative', lineHeight: 1.05 }}>
            <span style={{ display: 'block', color: '#1c1c1c', transform: `translateY(${translateY}px)`, opacity }}>
              {letter}
            </span>
            <span style={{ position: 'absolute', top: 0, left: 0, display: 'block', color: '#ffffff', transform: `translateY(${translateY}px)`, opacity, clipPath: `inset(${100 - fillPercent}% 0 0 0)` }}>
              {letter}
            </span>
          </span>
        )
      })}
    </h2>
  )
}

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [slideKey, setSlideKey] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollTriggerKey, setScrollTriggerKey] = useState(0)
  const carouselRef = useRef(null)

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop',
      title: 'INSIDE ULTRA',
      label: 'INSIGHT'
    },
    {
      url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&h=900&fit=crop',
      title: 'SURFACES',
      label: 'INSIGHT'
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
      title: 'CONTEMPORARY',
      label: 'INSIGHT'
    }
  ]

  useEffect(() => {
    const node = carouselRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting
        if (nowVisible && !isVisible) setScrollTriggerKey(prev => prev + 1)
        setIsVisible(nowVisible)
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  const handleNext = () => {
    if (isSliding) return
    setIsSliding(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsSliding(false)
      setSlideKey(prev => prev + 1)
      setScrollTriggerKey(prev => prev + 1)
    }, 800)
  }

  const getNextIndex = () => (currentIndex + 1) % images.length
  const getNextNextIndex = () => (currentIndex + 2) % images.length
  const animTriggerKey = `${slideKey}-${scrollTriggerKey}`

  return (
    <section className="carousel-section" ref={carouselRef}>

      {/* Main Image 80% */}
      <div className="main-image-container">
        <div className="image-wrapper" key={slideKey}>

          <figure className={`image-figure current ${isSliding ? 'sliding-out' : ''}`}>
            <img src={images[currentIndex].url} alt={images[currentIndex].title} />
            <div className="image-overlay">
              <div className="image-label">{images[currentIndex].label}</div>
              <ScrollFillTitle title={images[currentIndex].title} triggerKey={animTriggerKey} />
            </div>
          </figure>

          <figure className={`image-figure next ${isSliding ? 'sliding-in' : ''}`}>
            <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
            <div className="image-overlay">
              <div className="image-label">{images[getNextIndex()].label}</div>
              <h2 className="image-title">{images[getNextIndex()].title}</h2>
            </div>
          </figure>

        </div>
      </div>

      {/* Preview Image 20% — same overlay as 80% */}
      <div className="preview-image-container">
        <div className="preview-wrapper" key={slideKey}>

          <figure className={`preview-figure current ${isSliding ? 'sliding-out' : ''}`}>
            <img src={images[getNextIndex()].url} alt={images[getNextIndex()].title} />
            <div className="image-overlay">
              <div className="image-label">{images[getNextIndex()].label}</div>
              <ScrollFillTitle title={images[getNextIndex()].title} triggerKey={animTriggerKey} />
            </div>
          </figure>

          <figure className={`preview-figure next ${isSliding ? 'sliding-in' : ''}`}>
            <img src={images[getNextNextIndex()].url} alt={images[getNextNextIndex()].title} />
            <div className="image-overlay">
              <div className="image-label">{images[getNextNextIndex()].label}</div>
              <h2 className="image-title">{images[getNextNextIndex()].title}</h2>
            </div>
          </figure>

        </div>
      </div>

      <button className="carousel-arrow" onClick={handleNext}>
        <ChevronRight size={32} />
      </button>

    </section>
  )
}

export default ImageCarousel