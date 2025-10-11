"use client";
import { motion } from "framer-motion";
export function CurvedLoop(){
return (
<svg viewBox="0 0 400 200" className="mx-auto h-40 w-full">
<path id="curve" d="M20,100 C150,-20 250,220 380,100" fill="transparent" stroke="#00000020"/>
<motion.text animate={{ x: [0, 1000] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
<textPath href="#curve" startOffset="0%" className="fill-current">
mindfulness • expression • connection • community •
</textPath>
</motion.text>
</svg>
);
}