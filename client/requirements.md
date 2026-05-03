## Packages
framer-motion | Essential for the smooth countdown, runaway button, and letter reveal animations
react-confetti | Required for the full-screen celebratory confetti effect at the end

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}

API endpoints:
- GET /api/quotes returns an array of { letter: string, quote: string }
- GET /api/wishes/random returns a single { id: number, content: string }
