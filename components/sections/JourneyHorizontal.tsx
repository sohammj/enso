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
   STYLE PRIMITIVES
========================================================= */
const LINE = "border-black/10";
const BG = "bg-transparent";

// Desktop: horizontal panels
const PANEL_H_DESKTOP = "md:h-[560px]";
// Mobile: auto height with padding
const SECTION_MOBILE = "py-16";
const BORDER_MOBILE = "border-b-2 border-black/10";

const PHOTO_SIZE_MOBILE = "h-[320px] w-[320px]";
const PHOTO_SIZE_DESKTOP = "md:h-[400px] md:w-[400px]";

const PAD_X = "px-6 md:px-14";
const FRAME_X = "px-0 md:px-14";
const FRAME_Y = "py-0 md:py-12";

function StepTag() {
  return <div className="text-xs tracking-[0.22em] uppercase text-black/35">(Step)</div>;
}

function BigNo({ n }: { n: string }) {
  return (
    <div className="mt-3 font-display text-[80px] md:text-[150px] leading-none text-black">
      {n}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display uppercase tracking-wide text-[36px] md:text-[64px] leading-[0.95] text-black">
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 md:mt-6 text-[15px] md:text-[16px] leading-[1.65] text-black/65 max-w-[520px] mx-auto">
      {children}
    </p>
  );
}

/* =========================================================
   PANEL 01 - Photo + Content (Vertical on mobile, side-by-side on desktop)
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
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* Mobile: Clean Vertical Stack */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {/* Photo */}
          <div className="flex items-center justify-center mb-12">
            <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
              <Image src={photoSrc} alt="" fill className="object-cover" priority />
            </div>
          </div>
          
          {/* Title & Body */}
          <div className={`text-center ${PAD_X} mb-12`}>
            <Title>{title}</Title>
            <Body>{body}</Body>
          </div>
          
          {/* Step Number */}
          <div className={`text-center ${PAD_X}`}>
            <StepTag />
            <BigNo n={stepNo} />
          </div>
        </div>

        {/* Desktop: Horizontal Grid */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          {/* PHOTO COL */}
          <div className="relative overflow-hidden">
            <div className="h-full w-full flex items-center justify-center px-10">
              <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          </div>

          {/* VERTICAL LINE */}
          <div className={`relative z-10 h-full border-l ${LINE}`} />

          {/* CONTENT COL */}
          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{title}</Title>
                <Body>{body}</Body>
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
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
   PANEL 02 - Number + Content + Rounded Photo
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
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* Mobile: Clean Vertical Stack */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {/* Step Number */}
          <div className={`text-center ${PAD_X} mb-12`}>
            <StepTag />
            <BigNo n={stepNo} />
          </div>
          
          {/* Photo */}
          <div className="flex items-center justify-center mb-12">
            <div className={`relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-lg`}>
              <Image src={photoSrc} alt="" fill className="object-cover" priority />
            </div>
          </div>
          
          {/* Title & Body */}
          <div className={`text-center ${PAD_X}`}>
            <Title>{bottomTitle}</Title>
            <Body>{bottomBody}</Body>
          </div>
        </div>

        {/* Desktop: Horizontal Grid */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <StepTag />
                <BigNo n={stepNo} />
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{bottomTitle}</Title>
                <Body>{bottomBody}</Body>
              </div>
            </div>
          </div>
          <div className={`relative z-10 h-full border-l ${LINE}`} />
          <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
            <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
              <Image src={photoSrc} alt="" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 03 - Photo Right Circle
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
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* Mobile: Clean Vertical Stack */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {/* Step Number */}
          <div className={`text-center ${PAD_X} mb-12`}>
            <StepTag />
            <BigNo n={stepNo} />
          </div>
          
          {/* Photo */}
          <div className="flex items-center justify-center mb-12">
            <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
              <Image src={photoSrc} alt="" fill className="object-cover" priority />
            </div>
          </div>
          
          {/* Title & Body */}
          <div className={`text-center ${PAD_X}`}>
            <Title>{title}</Title>
            <Body>{body}</Body>
          </div>
        </div>

        {/* Desktop: Horizontal Grid */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{title}</Title>
                <Body>{body}</Body>
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <StepTag />
                <BigNo n={stepNo} />
              </div>
            </div>
          </div>
          <div className={`relative z-10 h-full border-l ${LINE}`} />
          <div className="relative overflow-hidden">
            <div className="h-full w-full flex items-center justify-center px-10">
              <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 04 - No Photos (2x2 Grid)
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
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* Mobile: Vertical Stack - Logical Order (04 then 05) */}
        <div className="md:hidden">
          {/* Step 04 */}
          <div className={`${SECTION_MOBILE} ${BORDER_MOBILE}`}>
            <div className={`text-center ${PAD_X} mb-8`}>
              <StepTag />
              <BigNo n={bottomLeftStep} />
            </div>
            <div className={`text-center ${PAD_X}`}>
              <Title>{topLeftTitle}</Title>
              <Body>{topLeftBody}</Body>
            </div>
          </div>
          
          {/* Step 05 */}
          <div className={`${SECTION_MOBILE}`}>
            <div className={`text-center ${PAD_X} mb-8`}>
              <StepTag />
              <BigNo n={topRightStep} />
            </div>
            <div className={`text-center ${PAD_X}`}>
              <Title>{bottomRightTitle}</Title>
              <Body>{bottomRightBody}</Body>
            </div>
          </div>
        </div>

        {/* Desktop: 2x2 Grid */}
        <div className={`hidden md:grid h-full grid-cols-2 grid-rows-2 ${LINE}`}>
          <div className={`flex items-center justify-center text-center ${PAD_X} border-r ${LINE} border-b ${LINE}`}>
            <div>
              <Title>{topLeftTitle}</Title>
              <Body>{topLeftBody}</Body>
            </div>
          </div>
          
          <div className={`flex items-center justify-center text-center ${PAD_X} border-b ${LINE}`}>
            <div>
              <StepTag />
              <BigNo n={topRightStep} />
            </div>
          </div>
          
          <div className={`flex items-center justify-center text-center ${PAD_X} border-r ${LINE}`}>
            <div>
              <StepTag />
              <BigNo n={bottomLeftStep} />
            </div>
          </div>
          
          <div className={`flex items-center justify-center text-center ${PAD_X}`}>
            <div>
              <Title>{bottomRightTitle}</Title>
              <Body>{bottomRightBody}</Body>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function JourneyHorizontal({ founder, studioInfo }: Props) {
  const copy = {
    s1: {
      title: "BRIEFING",
      body: "Meeting (in person or via video call) and discussion of the project idea. We listen to your wishes and goals to understand exactly what you want to achieve.",
      no: "01",
    },
    s2: {
      no: "02",
      title: "ANALYTICS",
      body: "After prepayment, we conduct a comprehensive market analysis, study competitors, and identify the target audience. Based on the collected information, we prepare the project's technical specification (TS) and agree on it with you.",
    },
    s3: {
      title: "CONCEPT",
      body: "We are starting to develop the design of the first page. We create a concept and present it to you. After receiving feedback, we make the necessary adjustments and approve the final version.",
      no: "03",
    },
    s4: {
      topLeftTitle: "DESIGN-PROJECT",
      topLeftBody: "Based on the approved concept, we are developing the design of all other pages. We present each page and coordinate it with you to make sure that the result meets your expectations.",
      topRightStep: "05",
      bottomLeftStep: "04",
      bottomRightTitle: "DEVELOPMENT",
      bottomRightBody: "At the final stage, we begin the project's layout and development. We are presenting the completed website to you for review. We make any necessary adjustments, if required, and upon completion, sign the acceptance certificate, finalizing the project in accordance with all your requirements.",
    },
  };

  const photo1 = founder.headshot;
  const photo2 = founder.headshot;
  const photo3 = founder.headshot;

  return (
    <>
      {/* Mobile: Vertical Stack (no ScrollLockHorizontal) */}
      <div className="md:hidden">
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
      </div>

      {/* Desktop: Horizontal Scroll */}
      <div className="hidden md:block">
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
      </div>
    </>
  );
}