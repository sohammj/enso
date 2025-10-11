"use client";
import { motion } from "framer-motion";
export function SplitText({ text, className="" }:{ text:string; className?:string }){
const words = text.split(" ");
return (
<p className={className}>
{words.map((w,i)=> (
<motion.span key={i} initial={{ y: "100%", opacity:0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once:true }} transition={{ delay: i*0.05, type:"spring", stiffness:120 }} className="mr-1 inline-block will-change-transform">{w}</motion.span>
))}
</p>
);
}