"use client";
import { useEffect, useRef } from "react";


export function CircularText({ text = "enso mind matters • art therapy • " , radius = 80, className=""}){
const ref = useRef<HTMLDivElement>(null);
useEffect(()=>{
const el = ref.current!;
el.innerHTML = "";
const chars = text.split("");
chars.forEach((ch, i)=>{
const span = document.createElement("span");
const rotate = (i / chars.length) * 360;
span.style.position = "absolute";
span.style.transform = `rotate(${rotate}deg) translate(${radius}px)`;
span.textContent = ch;
el.appendChild(span);
});
}, [text, radius]);
return <div ref={ref} className={`relative h-[${radius*2}px] w-[${radius*2}px] select-none ${className}`}/>;
}