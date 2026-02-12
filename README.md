# Scroll Animation React App

A responsive React application with scroll-triggered text animation where faded words become dark as you scroll, and "VANGUARD BY TRADITION" turns red.

## Features

- ✨ Smooth scroll-triggered text animation
- 🎨 Words transition from gray to black as you scroll
- ❤️ "VANGUARD BY TRADITION" highlights in red
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Built with Vite for fast development
- 🎯 Optimized performance with requestAnimationFrame

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

## Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Responsive Breakpoints

- **Mobile (< 480px)**: Optimized for small screens
- **Tablet (480px - 768px)**: Medium-sized devices
- **Desktop (768px - 1024px)**: Standard desktops
- **Large Desktop (1024px - 1440px)**: Wide screens
- **Extra Large (> 1440px)**: Ultra-wide displays

## How It Works

- The text starts with all words in a light gray color (#d0d0d0)
- As you scroll down the page, words progressively turn dark (#1a1a1a)
- The phrase "VANGUARD BY TRADITION" turns red (#c41e3a) when activated
- Scroll position determines how many words are "active" (darkened)
- Smooth transitions create a pleasant reading experience

## Technologies

- React 18
- Vite 6
- CSS3 with responsive design
- JavaScript (ES6+)

## Customization

You can customize the animation by modifying:

- `App.css`: Colors, font sizes, spacing, transitions
- `App.jsx`: Scroll animation logic, text content, activation speed
- Adjust the multiplier in `scrollProgress * totalWords * 1.5` to change animation speed

## License

MIT
