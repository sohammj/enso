"use client";
import { motion } from "framer-motion";
export function MagicBento(){
const items = [
{ title: "Therapy", col: "col-span-2", row:"row-span-2" },
{ title: "Workshops", col: "col-span-1", row:"row-span-1" },
{ title: "Teens", col: "col-span-1", row:"row-span-1" },
{ title: "Art Circles", col: "col-span-2", row:"row-span-1" },
{ title: "Corporate", col: "col-span-1", row:"row-span-2" }
];
return (
<div className="grid grid-cols-3 gap-3 md:grid-cols-4">
{items.map((it,i)=> (
<motion.div key={i} whileHover={{ scale:1.03 }} className={`${it.col} ${it.row} rounded-2xl bg-white p-4 shadow-soft`}>
<p className="text-lg font-medium">{it.title}</p>
<p className="text-sm opacity-70">Explore →</p>
</motion.div>
))}
</div>
);
}