export function Footer(){
return (
<footer className="mt-16 border-t border-black/5">
<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3">
<p className="text-sm opacity-70">© {new Date().getFullYear()} Enso Mind Matters</p>
<p className="text-sm opacity-70">Made with art, care, and community.</p>
<div className="text-sm opacity-70 md:text-right">Mumbai, India</div>
</div>
</footer>
);
}