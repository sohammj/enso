'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function Hero() {
return (
<section className="section relative overflow-hidden">
<div className="container grid md:grid-cols-2 gap-10 items-center">
<div>
<motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
<span className="badge">Welcome</span>
<h1 className="h1 mt-4">Therapy, Programs & Community</h1>
<p className="p mt-4">Compassionate, evidence-informed counselling and group programs to help you slow down, cope, and grow. (Replace with client-approved copy.)</p>
<div className="flex gap-3 mt-6">
<Link href="/book" className="btn">Book a Session</Link>
<Link href="/programs" className="btn bg-white/10 hover:bg-white/20">Explore Programs</Link>
</div>
</motion.div>
</div>
<motion.img
initial={{opacity:0, scale:0.98}}
animate={{opacity:1, scale:1}}
transition={{duration:0.6, delay:0.1}}
src="/gallery/placeholder-1.jpg" alt="Therapy session" className="w-full"/>
</div>
</section>
)
}
