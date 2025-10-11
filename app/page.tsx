import { EnsoBrush } from "../components/hero/EnsoBrush";
import { ClickSpark } from "../components/bits/ClickSpark";
import { CurvedLoop } from "../components/bits/CurvedLoop";
import { MagicBento } from "../components/bits/MagicBento";
import { HandwrittenNote } from "../components/sections/HandwrittenNote";
import { PauseReflect } from "../components/sections/PauseReflect";
import { GoogleReviews } from "../components/sections/GoogleReviews";
import { MapEmbed } from "../components/sections/MapEmbed";


export default function Home(){
return (
<>
<ClickSpark />
<EnsoBrush />
<section className="mx-auto max-w-6xl px-4 py-10">
<CurvedLoop />
<div className="mt-10">
<MagicBento />
</div>
</section>
<HandwrittenNote />
<PauseReflect />
<GoogleReviews />
<MapEmbed />
</>
);
}