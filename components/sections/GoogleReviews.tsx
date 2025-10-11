export function GoogleReviews(){
return (
<section className="mx-auto max-w-6xl px-4 py-16">
<h2 className="font-display text-3xl">What people say</h2>
<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
{[1,2,3].map(i=> (
<article key={i} className="rounded-2xl bg-white p-5 shadow-soft">
<div className="mb-2 flex items-center gap-2">
<div className="h-9 w-9 rounded-full bg-black/10"/>
<div>
<p className="text-sm font-medium">Happy Client</p>
<p className="text-xs opacity-70">★★★★★ on Google</p>
</div>
</div>
<p className="text-sm">Warm, kind, and practical sessions. Art made it easier to talk and heal.</p>
</article>
))}
</div>
<p className="mt-4 text-sm opacity-70">(Real Google Reviews embed can be added via Place ID widget later.)</p>
</section>
);
}