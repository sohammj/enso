"use client";
import { motion } from "framer-motion";


export function EnsoBrush(){
return (
<div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2">
<div>
<h1 className="font-display text-4xl md:text-6xl">Creating space for growth, healing, and community through Art-Based Therapy.</h1>
<p className="mt-4 text-lg opacity-80">At Enso Mind Matters, we believe in nurturing emotional well-being through creativity, mindfulness, and connection.</p>
</div>
<div className="relative">
<svg viewBox="0 0 400 400" className="mx-auto h-80 w-80">
<defs>
<linearGradient id="ink" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#000" stopOpacity="0.9"/>
<stop offset="100%" stopColor="#000" stopOpacity="0.2"/>
</linearGradient>
</defs>
<motion.circle cx="200" cy="200" r="150" fill="transparent" stroke="url(#ink)" strokeWidth="18" strokeLinecap="round"
initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: "easeInOut" }}/>
{/* inner reveals */}
<motion.circle cx="130" cy="190" r="18" fill="#ffd166" initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:2.6 }}/>
<motion.circle cx="250" cy="120" r="16" fill="#6bb5a2" initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:2.8 }}/>
<motion.circle cx="260" cy="260" r="14" fill="#2643A0" initial={{ scale:0 }} whileInView={{ scale:1 }} transition={{ delay:3.0 }}/>
</svg>
<p className="pointer-events-none absolute inset-x-0 top-2 text-center text-sm opacity-60">The Enso – wholeness in imperfection</p>
</div>
</div>
);
}