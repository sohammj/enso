"use client";
import { useEffect, useState } from "react";
const phrases = ["What emotion needs space today?", "What do you want to let go?", "What feels grounded right now?"];
export function TextCursor(){
const [i,setI] = useState(0);
const [typed, setTyped] = useState("");
useEffect(()=>{
let mounted = true;
let dir = 1; // 1 typing, -1 deleting
let idx = 0;
const loop = () => {
if(!mounted) return;
const target = phrases[i%phrases.length];
if(dir===1){
setTyped(target.slice(0, idx+1));
idx++;
if(idx>=target.length){ dir=-1; setTimeout(loop, 1500); return; }
} else {
setTyped(target.slice(0, idx-1));
idx--; if(idx<=0){ dir=1; setI(v=>v+1);}
}
setTimeout(loop, dir===1? 40:20);
};
loop();
return ()=>{ mounted=false; };
}, [i]);
return <span className="font-medium">{typed}<span className="animate-pulse">|</span></span>;
}