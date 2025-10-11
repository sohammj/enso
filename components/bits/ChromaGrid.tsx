"use client";
export function ChromaGrid(){
return (
<div className="grid grid-cols-6 gap-2">
{Array.from({length:30}).map((_,i)=> (
<div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-sun/40 to-tea/40 transition hover:from-tea/60 hover:to-royal/60"/>
))}
</div>
);
}