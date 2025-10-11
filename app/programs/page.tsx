import { ChromaGrid } from "../../components/bits/ChromaGrid";
import { SplitText } from "../../components/bits/SplitText";


export default function Programs(){
return (
<div className="mx-auto max-w-6xl px-4 py-14">
<h1 className="font-display text-4xl">Our Programs</h1>
<SplitText className="mt-3 text-lg opacity-80" text="Therapy, workshops, teen circles, corporate wellbeing, and more."/>
<div className="mt-8"><ChromaGrid/></div>
<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
{["Individual Therapy","Group Art Circles","Teens Program","Corporate Workshops"].map(t => (
<div key={t} className="rounded-2xl bg-white p-6 shadow-soft">
<h3 className="text-xl font-medium">{t}</h3>
<p className="mt-2 text-sm opacity-80">Short description and outcomes. Includes art-based prompts and reflection.</p>
</div>
))}
</div>
</div>
);
}