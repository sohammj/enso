import { CircularGallery } from "../../components/bits/CircularGallery";


export default function Gallery(){
const images = [
"https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format",
"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format",
"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format",
"https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format",
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format"
];
return (
<div className="mx-auto max-w-6xl px-4 py-14">
<h1 className="font-display text-4xl">Gallery</h1>
<p className="mt-2 opacity-80">Glimpses from workshops, art prompts, and quiet moments.</p>
<div className="mt-10">
<CircularGallery images={images}/>
</div>
</div>
);
}