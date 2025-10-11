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
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          aria-label="Opening animation"
        >
          {/* Option 1: Use your actual enso image with reveal animation */}
          <motion.div
            className="relative w-80 h-80"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Replace this src with your actual enso.png/gif */}
            <motion.img
              src="/enso.png"
              alt="Enso"
              className="w-full h-full object-contain"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ 
                duration: 1.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 
              }}
            />
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}