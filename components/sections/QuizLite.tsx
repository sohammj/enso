"use client";
import { useState } from "react";
const qs = [
{ q: "Pick a word that fits today:", a: ["Calm","Anxious","Stuck","Hopeful"]},
{ q: "What do you need more of?", a: ["Rest","Expression","Clarity","Support"]}
];
export function QuizLite(){
const [i,setI] = useState(0);
const [ans,setAns] = useState<string[]>([]);
const next = (a:string)=>{ const n=[...ans,a]; setAns(n); setI(i+1); };
if(i>=qs.length){
const map:any = { Calm:"Try grounding art", Anxious:"Try breath + doodle", Stuck:"Try free drawing", Hopeful:"Try colour journaling" };
const res = map[ans[0]] || "Try a gentle art prompt";
return (<div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-soft"><p className="text-lg">Suggested next step:</p><p className="mt-2 text-2xl font-display">{res}</p></div>);
}
return (
<div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-soft">
<p className="text-lg font-medium">{qs[i].q}</p>
<div className="mt-4 grid grid-cols-2 gap-3">
{qs[i].a.map(a => (
<button key={a} onClick={()=>next(a)} className="rounded-xl bg-sand px-4 py-2 text-sm hover:bg-white hover:shadow-soft">{a}</button>
))}
</div>
</div>
);
}