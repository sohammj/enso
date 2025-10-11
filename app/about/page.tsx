import Balancer from "react-wrap-balancer";
import { RotatingText } from "../../components/bits/RotatingText";


export default function About(){
return (
<div className="mx-auto max-w-6xl px-4 py-14">
<h1 className="font-display text-4xl">Our Journey</h1>
<p className="mt-3 max-w-3xl text-lg opacity-80"><Balancer>
Founded by Parul Dewal, Enso Mind Matters is a space for emotional expression and holistic well-being through Art-Based Therapy. Parul is an experienced Art Therapist, part of The Red Pencil Art Therapists team, delivering international ‘Art-Based Capacity Building and Training’ for teachers in Jammu & Kashmir with the Piramal Foundation. From June to December, the team trains 150 teachers to become student counselors equipped with socio-emotional learning skills through art-based activities.
</Balancer></p>
<div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
  <img
    src="/1000–1200px (1200 x 1000 px) (Presentation).svg"
    className="rounded-2xl shadow-soft"
    alt="Studio"
  />
<div>
<p className="text-sm opacity-80">Enso</p>
<p className="mt-2 grid list-disc gap-1 pl-5 text-sm opacity-80">
Enso is more than just a therapy center — it’s a growing community that believes in reflection, connection, and creative healing.
</p>
<div className="mt-6 text-center md:text-left">
{/* <RotatingText><span className="inline-block rounded-full bg-white px-4 py-2 shadow-soft">art • therapy • community •</span></RotatingText> */}
</div>
</div>
</div>
</div>
);
}