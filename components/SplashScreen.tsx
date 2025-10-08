'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const done = sessionStorage.getItem('enso-splash-done')
    if (!done) {
      setShow(true)
      const t = setTimeout(() => {
        sessionStorage.setItem('enso-splash-done', '1')
        setShow(false)
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash-fixed"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          aria-label="Opening animation"
        >
          {/* Enso stroke drawing */}
          <motion.svg width="180" height="180" viewBox="0 0 100 100" role="img" aria-label="Enso">
            <motion.path
              d="M50 10a40 40 0 1 1-.1 0"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            {/* little peach dab to hint brush end */}
            <motion.circle
              cx="82" cy="50" r="3.5"
              fill="var(--accent)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 12 }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
