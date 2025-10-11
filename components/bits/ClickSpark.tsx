"use client";
import { useEffect } from "react";
export function ClickSpark(){
useEffect(()=>{
const handler = (e: MouseEvent) => {
for(let i=0;i<12;i++){
const dot = document.createElement("span");
dot.className = "pointer-events-none fixed h-1 w-1 rounded-full bg-ink/60";
document.body.appendChild(dot);
const angle = (i/12) * Math.PI*2;
const dist = 60 + Math.random()*20;
const x = e.clientX + Math.cos(angle)*dist;
const y = e.clientY + Math.sin(angle)*dist;
dot.animate([
{ transform: `translate(${e.clientX}px, ${e.clientY}px)`, opacity:1 },
{ transform: `translate(${x}px, ${y}px)`, opacity:0 }
], { duration: 600, easing: "cubic-bezier(.2,.6,.2,1)" }).onfinish=()=>dot.remove();
}
};
window.addEventListener("click", handler);
return ()=>window.removeEventListener("click", handler);
},[]);
return null;
}