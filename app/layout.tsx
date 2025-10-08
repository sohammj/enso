import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import SplashScreen from '../components/SplashScreen'
import { plusJakarta, playfair } from '../components/fonts'

export const metadata: Metadata = {
  title: 'Enso Mind Matters — Counselling & Programs',
  description: 'Therapy services, programs, workshops, and community.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body style={{fontFamily:'var(--font-jakarta)'}}>
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
