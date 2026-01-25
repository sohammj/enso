"use client";

import Image from "next/image";
import ScrollLockHorizontal from "@/components/bits/ScrollLockHorizontal";
import type { JourneyContent } from "@/sanity/lib/types";

/* =========================================================
   STYLE PRIMITIVES
========================================================= */
const LINE = "border-black/10";
const BG = "bg-transparent";
const PANEL_H_DESKTOP = "md:h-[560px]";
const SECTION_MOBILE = "py-16";
const BORDER_MOBILE = "border-b-2 border-black/10";

const PHOTO_SIZE_MOBILE = "h-[320px] w-[320px]";
const PHOTO_SIZE_DESKTOP = "md:h-[400px] md:w-[400px]";

const PAD_X = "px-6 md:px-14";
const FRAME_X = "px-0 md:px-14";
const FRAME_Y = "py-0 md:py-12";

function StepTag() {
  return <div className="text-xs tracking-[0.22em] uppercase text-black/35"></div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display uppercase tracking-wide text-[36px] md:text-[64px] leading-[0.95] text-black">
      {children}
    </div>
  );
}

function BodyInNoSlot({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 md:mt-0 text-[15px] md:text-[16px] leading-[1.7] text-black/65 max-w-[520px] mx-auto">
      {children}
    </p>
  );
}

/* =========================================================
   PANEL 01
========================================================= */
function PanelPhotoLeft({
  photoSrc,
  title,
  body,
}: {
  photoSrc: string;
  title: string;
  body: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          <div className="flex items-center justify-center mb-12">
            <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>

          <div className={`text-center ${PAD_X} mb-10`}>
            <Title>{title}</Title>
          </div>

          <div className={`text-center ${PAD_X}`}>
            <StepTag />
            <BodyInNoSlot>{body}</BodyInNoSlot>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className="relative overflow-hidden">
            <div className="h-full w-full flex items-center justify-center px-10">
              <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
              </div>
            </div>
          </div>

          <div className={`relative z-10 h-full border-l ${LINE}`} />

          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{title}</Title>
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <StepTag />
                <BodyInNoSlot>{body}</BodyInNoSlot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 02 (rounded rectangle photo)
========================================================= */
function PanelPhotoRightRounded({
  bottomTitle,
  bottomBody,
  photoSrc,
}: {
  bottomTitle: string;
  bottomBody: string;
  photoSrc: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          <div className={`text-center ${PAD_X} mb-10`}>
            <StepTag />
            <BodyInNoSlot>{bottomBody}</BodyInNoSlot>
          </div>

          <div className="flex items-center justify-center mb-12">
            <div className={`relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-lg`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>

          <div className={`text-center ${PAD_X}`}>
            <Title>{bottomTitle}</Title>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <StepTag />
                <BodyInNoSlot>{bottomBody}</BodyInNoSlot>
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{bottomTitle}</Title>
              </div>
            </div>
          </div>

          <div className={`relative z-10 h-full border-l ${LINE}`} />

          <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
            <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 03
========================================================= */
function PanelPhotoRightCircle({
  photoSrc,
  title,
  body,
}: {
  photoSrc: string;
  title: string;
  body: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          <div className={`text-center ${PAD_X} mb-10`}>
            <StepTag />
            <BodyInNoSlot>{body}</BodyInNoSlot>
          </div>

          <div className="flex items-center justify-center mb-12">
            <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>

          <div className={`text-center ${PAD_X}`}>
            <Title>{title}</Title>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className="grid h-full grid-rows-[1fr_1px_1fr]">
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <Title>{title}</Title>
              </div>
            </div>
            <div className={`w-full border-t ${LINE}`} />
            <div className={`flex items-center justify-center text-center ${PAD_X}`}>
              <div>
                <StepTag />
                <BodyInNoSlot>{body}</BodyInNoSlot>
              </div>
            </div>
          </div>

          <div className={`relative z-10 h-full border-l ${LINE}`} />

          <div className="relative overflow-hidden">
            <div className="h-full w-full flex items-center justify-center px-10">
              <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 04 (Step 4 only, no photo)
========================================================= */
function PanelStep4NoPhoto({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          <div className={`text-center ${PAD_X} mb-8`}>
            <Title>{title}</Title>
          </div>
          <div className={`text-center ${PAD_X}`}>
            <StepTag />
            <BodyInNoSlot>{body}</BodyInNoSlot>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
          <div className={`flex items-center justify-center text-center ${PAD_X}`}>
            <Title>{title}</Title>
          </div>

          <div className={`relative z-10 h-full border-l ${LINE}`} />

          <div className={`flex items-center justify-center text-center ${PAD_X}`}>
            <div>
              <StepTag />
              <BodyInNoSlot>{body}</BodyInNoSlot>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 05 (Step 5: Title -> Body -> Image) SAME PHOTO SIZE AS PANEL 02
========================================================= */
function PanelStep5TitleBodyThenImage({
  title,
  body,
  photoSrc,
}: {
  title: string;
  body: string;
  photoSrc: string;
}) {
  return (
    <section className={`relative flex-none w-screen ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE}`}>
          <div className={`text-center ${PAD_X} mb-8`}>
            <Title>{title}</Title>
          </div>
          
          
          
          <div className={`text-center ${PAD_X} mb-12`}>
            <StepTag />
            <BodyInNoSlot>{body}</BodyInNoSlot>
          </div>

          <div className="flex items-center justify-center">
            {/* ✅ EXACT SAME AS PANEL 02 MOBILE PHOTO */}
            <div className={`relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-lg`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:grid h-full grid-cols-[minmax(520px,1fr)_1px_minmax(360px,0.75fr)] border-r ${LINE}`}>
          {/* LEFT: title + body stacked (keeps the same order as mobile) */}
          <div className={`flex items-center justify-center text-center ${PAD_X}`}>
            <div>
              <Title>{title}</Title>
              <div className={`w-full border-t ${LINE}`} />
              <div className="mt-6">
                <StepTag />
                <BodyInNoSlot>{body}</BodyInNoSlot>
              </div>
            </div>
          </div>

          <div className={`relative z-10 h-full border-l ${LINE}`} />

          {/* RIGHT: image (same dimensions as PANEL 02 desktop photo) */}
          <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
            <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
              {photoSrc ? <Image src={photoSrc} alt="" fill className="object-cover" priority /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN
========================================================= */
export default function JourneyHorizontal({ journey }: { journey: JourneyContent }) {
  const photo1 = journey.photo1;
  const photo2 = journey.photo2;
  const photo3 = journey.photo3;

  // Step 5 photo (fallback to photo2)
  const photo5 = (journey as any).photo5 || photo2;

  const copy = journey.steps;

  return (
    <>
      <div className="md:hidden">
        <PanelPhotoLeft photoSrc={photo1} title={copy.s1.title} body={copy.s1.body} />
        <PanelPhotoRightRounded bottomTitle={copy.s2.title} bottomBody={copy.s2.body} photoSrc={photo2} />
        <PanelPhotoRightCircle photoSrc={photo3} title={copy.s3.title} body={copy.s3.body} />

        {/* Step 4: title -> body */}
        <PanelStep4NoPhoto title={copy.s4.title} body={copy.s4.body} />

        {/* Step 5: title -> body -> image */}
        <PanelStep5TitleBodyThenImage title={copy.s5.title} body={copy.s5.body} photoSrc={photo5} />
      </div>

      <div className="hidden md:block">
        <ScrollLockHorizontal speed={1.1} className={BG}>
          <PanelPhotoLeft photoSrc={photo1} title={copy.s1.title} body={copy.s1.body} />
          <PanelPhotoRightRounded bottomTitle={copy.s2.title} bottomBody={copy.s2.body} photoSrc={photo2} />
          <PanelPhotoRightCircle photoSrc={photo3} title={copy.s3.title} body={copy.s3.body} />

          <PanelStep4NoPhoto title={copy.s4.title} body={copy.s4.body} />
          <PanelStep5TitleBodyThenImage title={copy.s5.title} body={copy.s5.body} photoSrc={photo5} />
        </ScrollLockHorizontal>
      </div>
    </>
  );
}
