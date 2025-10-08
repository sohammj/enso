import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'


export const metadata: Metadata = {
title: 'Enso Mind Matters — Counselling & Programs',
description: 'Therapy services, programs, workshops, and community. (Placeholder content.)'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}