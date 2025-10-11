"use client";
import { motion } from "framer-motion";
export function CircularGallery({ images }:{ images: string[] }){
const radius = 160;
return (
<div className="relative mx-auto h-[360px] w-[360px]">
{images.map((src, i)=>{
const angle = (i / images.length) * Math.PI*2;
const x = Math.cos(angle)*radius + 180 - 50;
const y = Math.sin(angle)*radius + 180 - 50;
return (
<motion.img key={src} src={src} alt="gallery" className="absolute h-24 w-24 rounded-xl object-cover shadow-soft"
initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} style={{ left: x, top:y }} />
);
})}
</div>
);
}