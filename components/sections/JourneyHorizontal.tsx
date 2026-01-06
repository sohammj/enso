"use client";

import Image from "next/image";
import ScrollLockHorizontal from "@/components/bits/ScrollLockHorizontal";

type Founder = {
  name: string;
  headshot: string;
  bioShort: string;
  bioLong: string[];
};

type StudioInfo = {
  name: string;
  addressLine1: string;
  addressLine2: string;
};

type Props = {
  founder: Founder;
  studioInfo: StudioInfo;
};

/* =========================================================
   IZUM-STYLE PRIMITIVES (tight, composed, subtle 1px grid)
========================================================= */

const LINE = "border-black/10"; // subtler (izum is VERY light)
const BG = "bg-transparent";
// const PANEL_H = "h-[calc(100vh-84px)]"; // adjust if navbar differs
// const PANEL_H = "h-[min(620px,calc(100vh-84px))]";
const PANEL_H = "h-[520px] md:h-[560px]";

// Smaller media (this is the big “izum feel” fix)
// const CIRCLE_SIZE = "h-[clamp(420px,40vw,560px)] w-[clamp(420px,40vw,560px)]";
const CIRCLE_SIZE = "h-[clamp(360px,34vw,480px)] w-[clamp(360px,34vw,480px)]";

const CIRCLE_CROP = "translate-x-[22%]"; // less spill than 28%
// const ROUND_W = "max-w-[460px]";
// const ROUND_H = "h-[460px]";
const ROUND_W = "w-[360px] md:w-[400px]";
const ROUND_H = "h-[360px] md:h-[400px]";

// Content padding (slightly tighter than yours)
const PAD_X = "px-12 md:px-14";


const FRAME_X = "px-10 md:px-14"; // space from screen edges so lines don't hit the edges
const FRAME_Y = "py-10 md:py-12"; // removes top/bottom border feel + adds breathing room



const PHOTO_SIZE = "h-[360px] w-[360px] md:h-[400px] md:w-[400px]";


function StepTag() {
  return <div className="text-xs tracking-[0.22em] uppercase text-black/35">(Step)</div>;
}

function BigNo({ n }: { n: string }) {
  return (
    <div className="mt-3 font-display text-[110px] md:text-[150px] leading-none text-black">
      {n}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display uppercase tracking-wide text-[50px] md:text-[64px] leading-[0.95] text-black">
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] text-black/65 max-w-[420px] mx-auto">
      {children}
    </p>
  );
}

/* =========================================================
   PANEL 01 (photo left circle)
========================================================= */
function PanelPhotoLeft({
  photoSrc,
  title,
  body,
  stepNo,
}: {
  photoSrc: string;
  title: string;
  body: string;
  stepNo: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H} ${BG}`}>
        <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
            <div className={`relative z-0 grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)]  border-r ${LINE}`}>

                {/* PHOTO COL */}
                {/* PHOTO COL */}
                <div className="relative overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center px-10">
                        {/* <div className="relative h-[460px] w-[460px] md:h-[520px] md:w-[520px] rounded-full overflow-hidden"> */}
                        <div className={`relative ${PHOTO_SIZE} rounded-full overflow-hidden`}>

                        <Image src={photoSrc} alt="" fill className="object-cover" priority />
                        </div>
                    </div>
                </div>


                {/* VERTICAL 1px LINE (behind) */}
                <div className={`relative z-10 h-full border-l ${LINE}`} />

                {/* CONTENT COL (split horizontally) */}
                <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                {/* TOP */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <Title>{title}</Title>
                    <Body>{body}</Body>
                    </div>
                </div>

                {/* HORIZONTAL 1px LINE */}
                <div className={`w-full border-t ${LINE}`} />

                {/* BOTTOM */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <StepTag />
                    <BigNo n={stepNo} />
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}

/* =========================================================
   PANEL 02 (number+text on left, photo on right)
========================================================= */
function PanelPhotoRightRounded({
  stepNo,
  bottomTitle,
  bottomBody,
  photoSrc,
}: {
  stepNo: string;
  bottomTitle: string;
  bottomBody: string;
  photoSrc: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H} ${BG}`}>
        <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
            <div className={`relative z-0 grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>

                {/* LEFT (split horizontally) */}
                <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                {/* TOP NUMBER */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <StepTag />
                    <BigNo n={stepNo} />
                    </div>
                </div>

                {/* DIVIDER */}
                <div className={`w-full border-t ${LINE}`} />

                {/* BOTTOM TEXT */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <div className="font-display uppercase tracking-wide text-[50px] md:text-[64px] leading-[0.95] text-black">
                        {bottomTitle}
                    </div>
                    <Body>{bottomBody}</Body>
                    </div>
                </div>
                </div>

                {/* VERTICAL LINE */}
                <div className={`relative z-10 h-full border-l ${LINE}`} />

                {/* RIGHT PHOTO (rounded rectangle) */}
                <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative w-full ${ROUND_W} ${ROUND_H} rounded-2xl overflow-hidden`}>
                    <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}

/* =========================================================
   PANEL 03 (photo right circle) — mirror of Panel 01
========================================================= */
function PanelPhotoRightCircle({
  photoSrc,
  title,
  body,
  stepNo,
}: {
  photoSrc: string;
  title: string;
  body: string;
  stepNo: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H} ${BG}`}>
        <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
            <div className={`relative z-0 grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>

                {/* CONTENT COL (split horizontally) */}
                <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                {/* TOP */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <Title>{title}</Title>
                    <Body>{body}</Body>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className={`w-full border-t ${LINE}`} />

                {/* BOTTOM */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                    <div>
                    <StepTag />
                    <BigNo n={stepNo} />
                    </div>
                </div>
                </div>

                {/* VERTICAL LINE */}
                <div className={`relative z-10 h-full border-l ${LINE}`} />

                {/* PHOTO COL */}
                {/* PHOTO COL */}
                <div className="relative overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center px-10">
                        {/* <div className="relative h-[460px] w-[460px] md:h-[520px] md:w-[520px] rounded-full overflow-hidden"> */}
                        <div className={`relative ${PHOTO_SIZE} rounded-full overflow-hidden`}>

                        <Image src={photoSrc} alt="" fill className="object-cover" priority />
                        </div>
                    </div>
                </div>

                {/* <div className="relative overflow-visible">
                <div className={`pointer-events-none absolute right-0 top-1/2 z-20 -translate-y-1/2 ${CIRCLE_CROP}`}>
                    <div className={`relative ${CIRCLE_SIZE} rounded-full overflow-hidden`}>
                    <Image src={photoSrc} alt="" fill className="object-cover" priority />
                    </div>
                </div>
                </div> */}
            </div>
        </div>
    </section>
  );
}

/* =========================================================
   PANEL 04 / 05 (no photos) — 2x2 with splits
========================================================= */
function PanelNoPhotos({
  topLeftTitle,
  topLeftBody,
  topRightStep,
  bottomLeftStep,
  bottomRightTitle,
  bottomRightBody,
}: {
  topLeftTitle: string;
  topLeftBody: string;
  topRightStep: string;
  bottomLeftStep: string;
  bottomRightTitle: string;
  bottomRightBody: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H} ${BG}`}>
        <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
            <div className={`grid h-full grid-cols-2 grid-rows-2  ${LINE}`}>

                {/* TOP-LEFT (text) */}
                <div className={`flex items-center justify-center text-center ${PAD_X} border-r ${LINE} border-b ${LINE}`}>
                <div>
                    <div className="font-display uppercase tracking-wide text-[50px] md:text-[64px] leading-[0.95] text-black">
                    {topLeftTitle}
                    </div>
                    <Body>{topLeftBody}</Body>
                </div>
                </div>

                {/* TOP-RIGHT (step big) */}
                <div className={`flex items-center justify-center text-center ${PAD_X} border-b ${LINE}`}>
                <div>
                    <StepTag />
                    <BigNo n={topRightStep} />
                </div>
                </div>

                {/* BOTTOM-LEFT (step big) */}
                <div className={`flex items-center justify-center text-center ${PAD_X} border-r ${LINE}`}>
                <div>
                    <StepTag />
                    <BigNo n={bottomLeftStep} />
                </div>
                </div>

                {/* BOTTOM-RIGHT (text) */}
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                <div>
                    <div className="font-display uppercase tracking-wide text-[50px] md:text-[64px] leading-[0.95] text-black">
                    {bottomRightTitle}
                    </div>
                    <Body>{bottomRightBody}</Body>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */
export default function JourneyHorizontal({ founder, studioInfo }: Props) {
  const copy = {
    s1: {
      title: "BRIEFING",
      body:
        "Meeting (in person or via video call) and discussion of the project idea. We listen to your wishes and goals to understand exactly what you want to achieve.",
      no: "01",
    },
    s2: {
      no: "02",
      title: "ANALYTICS",
      body:
        "After prepayment, we conduct a comprehensive market analysis, study competitors, and identify the target audience. Based on the collected information, we prepare the project’s technical specification (TS) and agree on it with you.",
    },
    s3: {
      title: "CONCEPT",
      body:
        "We are starting to develop the design of the first page. We create a concept and present it to you. After receiving feedback, we make the necessary adjustments and approve the final version.",
      no: "03",
    },
    s4: {
      topLeftTitle: "DESIGN-PROJECT",
      topLeftBody:
        "Based on the approved concept, we are developing the design of all other pages. We present each page and coordinate it with you to make sure that the result meets your expectations.",
      topRightStep: "05",
      bottomLeftStep: "04",
      bottomRightTitle: "DEVELOPMENT",
      bottomRightBody:
        "At the final stage, we begin the project's layout and development. We are presenting the completed website to you for review. We make any necessary adjustments, if required, and upon completion, sign the acceptance certificate, finalizing the project in accordance with all your requirements.",
    },
  };

  const photo1 = founder.headshot;
  const photo2 = founder.headshot;
  const photo3 = founder.headshot;

  return (
    <ScrollLockHorizontal speed={1.1} className={BG}>
      <PanelPhotoLeft photoSrc={photo1} title={copy.s1.title} body={copy.s1.body} stepNo={copy.s1.no} />
      <PanelPhotoRightRounded stepNo={copy.s2.no} bottomTitle={copy.s2.title} bottomBody={copy.s2.body} photoSrc={photo2} />
      <PanelPhotoRightCircle photoSrc={photo3} title={copy.s3.title} body={copy.s3.body} stepNo={copy.s3.no} />
      <PanelNoPhotos
        topLeftTitle={copy.s4.topLeftTitle}
        topLeftBody={copy.s4.topLeftBody}
        topRightStep={copy.s4.topRightStep}
        bottomLeftStep={copy.s4.bottomLeftStep}
        bottomRightTitle={copy.s4.bottomRightTitle}
        bottomRightBody={copy.s4.bottomRightBody}
      />
    </ScrollLockHorizontal>
  );
}
