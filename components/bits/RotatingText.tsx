"use client";
import { motion } from "framer-motion";
export function RotatingText({ children }:{ children: React.ReactNode }){
return (
<motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="inline-block">
{children}
</motion.div>
);
}