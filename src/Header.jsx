import { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <h1>ariostea</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <a href="#collections" className="nav-link">COLLECTIONS</a>
          <a href="#projects" className="nav-link">PROJECTS</a>
          <a href="#innovations" className="nav-link">INNOVATIONS</a>
          <a href="#applications" className="nav-link">APPLICATIONS</a>
          <a href="#showroom" className="nav-link">SHOWROOM</a>
          <a href="#company" className="nav-link">COMPANY</a>
          <a href="#downloads" className="nav-link">DOWNLOADS</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>

        {/* Right Section */}
        <div className="header-right">
          <button className="search-btn">SEARCH</button>
          <button className="bookmark-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <div className="language-selector">EN</div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <a href="#collections" className="nav-link-mobile">COLLECTIONS</a>
        <a href="#projects" className="nav-link-mobile">PROJECTS</a>
        <a href="#innovations" className="nav-link-mobile">INNOVATIONS</a>
        <a href="#applications" className="nav-link-mobile">APPLICATIONS</a>
        <a href="#showroom" className="nav-link-mobile">SHOWROOM</a>
        <a href="#company" className="nav-link-mobile">COMPANY</a>
        <a href="#downloads" className="nav-link-mobile">DOWNLOADS</a>
        <a href="#contact" className="nav-link-mobile">CONTACT</a>
      </nav>
    </header>
  )
}

export default Header