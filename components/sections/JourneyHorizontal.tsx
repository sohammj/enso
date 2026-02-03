"use client";

import Image from "next/image";
import ScrollLockHorizontal from "@/components/bits/ScrollLockHorizontal";
import type { JourneyContent } from "@/sanity/lib/types";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type PT = PortableTextBlock[];

function PTText({ value }: { value?: PT }) {
  if (!value?.length) return null;
  return <PortableText value={value} />;
}

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
  return (
    <div className="text-xs tracking-[0.22em] uppercase text-black/35"></div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display uppercase tracking-wide text-[36px] md:text-[64px] leading-[0.95] text-black [&_p]:m-0">
      {children}
    </div>
  );
}

function BodyInNoSlot({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 md:mt-0 text-[15px] md:text-[16px] leading-[1.7] text-black/65 max-w-[520px] mx-auto [&_p]:m-0">
      {children}
    </div>
  );
}

/* =========================================================
   PANEL 01 - Photo Left, Text Right
========================================================= */
function PanelPhotoLeft({
  photoSrc,
  title,
  body,
}: {
  photoSrc: string;
  title: PT;
  body: PT;
}) {
  const hasText = title?.length || body?.length;

  return (
    <section className={`relative flex-none ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {photoSrc && (
            <div className="flex items-center justify-center mb-12">
              <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          )}

          {hasText && (
            <>
              <div className={`text-center ${PAD_X} mb-10`}>
                <Title><PTText value={title} /></Title>
              </div>
              <div className={`text-center ${PAD_X}`}>
                <StepTag />
                <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
              </div>
            </>
          )}
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:block h-full`}>
          {hasText && photoSrc ? (
            <div className={`grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
              <div className="relative overflow-hidden">
                <div className="h-full w-full flex items-center justify-center px-10">
                  <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                    <Image src={photoSrc} alt="" fill className="object-cover" priority />
                  </div>
                </div>
              </div>

              <div className={`relative z-10 h-full border-l ${LINE}`} />

              <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div className="mx-auto w-full max-w-[520px]">
                    <Title><PTText value={title} /></Title>
                  </div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div className="mx-auto w-full max-w-[520px]">
                    <StepTag />
                    <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                  </div>
                </div>
              </div>
            </div>
          ) : hasText ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className="grid grid-rows-[1fr_1px_1fr] h-full w-full max-w-[520px]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div><Title><PTText value={title} /></Title></div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div>
                    <StepTag />
                    <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                  </div>
                </div>
              </div>
            </div>
          ) : photoSrc ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className="relative overflow-hidden">
                <div className="flex items-center justify-center px-10">
                  <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                    <Image src={photoSrc} alt="" fill className="object-cover" priority />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 02 - Text Left, Rounded Photo Right
========================================================= */
function PanelPhotoRightRounded({
  bottomTitle,
  bottomBody,
  photoSrc,
}: {
  bottomTitle: PT;
  bottomBody: PT;
  photoSrc: string;
}) {
  const hasText = bottomTitle?.length || bottomBody?.length;

  return (
    <section className={`relative flex-none ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {hasText && (
            <div className={`text-center ${PAD_X} mb-10`}>
              <StepTag />
              <BodyInNoSlot><PTText value={bottomBody} /></BodyInNoSlot>
            </div>
          )}

          {photoSrc && (
            <div className="flex items-center justify-center mb-12">
              <div className={`relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-lg`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          )}

          {hasText && (
            <div className={`text-center ${PAD_X}`}>
              <Title><PTText value={bottomTitle} /></Title>
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:block h-full`}>
          {hasText && photoSrc ? (
            <div className={`grid h-full grid-cols-[minmax(360px,0.75fr)_1px_minmax(520px,1fr)] border-r ${LINE}`}>
              <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div>
                    <StepTag />
                    <BodyInNoSlot><PTText value={bottomBody} /></BodyInNoSlot>
                  </div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div><Title><PTText value={bottomTitle} /></Title></div>
                </div>
              </div>

              <div className={`relative z-10 h-full border-l ${LINE}`} />

              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : hasText ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className="grid grid-rows-[1fr_1px_1fr] h-full w-full max-w-[360px]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div>
                    <StepTag />
                    <BodyInNoSlot><PTText value={bottomBody} /></BodyInNoSlot>
                  </div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div><Title><PTText value={bottomTitle} /></Title></div>
                </div>
              </div>
            </div>
          ) : photoSrc ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 03 - Text Left, Circle Photo Right
========================================================= */
function PanelPhotoRightCircle({
  photoSrc,
  title,
  body,
}: {
  photoSrc: string;
  title: PT;
  body: PT;
}) {
  const hasText = title?.length || body?.length;

  return (
    <section className={`relative flex-none ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {hasText && (
            <div className={`text-center ${PAD_X} mb-10`}>
              <StepTag />
              <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
            </div>
          )}

          {photoSrc && (
            <div className="flex items-center justify-center mb-12">
              <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          )}

          {hasText && (
            <div className={`text-center ${PAD_X}`}>
              <Title><PTText value={title} /></Title>
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:block h-full`}>
          {hasText && photoSrc ? (
            <div className={`grid h-full grid-cols-[minmax(520px,1fr)_1px_minmax(360px,0.75fr)] border-r ${LINE}`}>
              <div className="grid h-full grid-rows-[1fr_1px_1fr]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div className="w-full max-w-[520px]">
                    <Title><PTText value={title} /></Title>
                  </div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div className="w-full max-w-[520px]">
                    <StepTag />
                    <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
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
          ) : hasText ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className="grid grid-rows-[1fr_1px_1fr] h-full w-full max-w-[520px]">
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div><Title><PTText value={title} /></Title></div>
                </div>
                <div className={`w-full border-t ${LINE}`} />
                <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                  <div>
                    <StepTag />
                    <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                  </div>
                </div>
              </div>
            </div>
          ) : photoSrc ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className="relative overflow-hidden">
                <div className="h-full w-full flex items-center justify-center px-10">
                  <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                    <Image src={photoSrc} alt="" fill className="object-cover" priority />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 04 - Text Left, Rounded Photo Right
========================================================= */
function PanelStep4WithPhotoRounded({
  title,
  body,
  photoSrc,
}: {
  title: PT;
  body: PT;
  photoSrc: string;
}) {
  const hasText = title?.length || body?.length;

  return (
    <section className={`relative flex-none ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE} ${BORDER_MOBILE}`}>
          {hasText && (
            <>
              <div className={`text-center ${PAD_X} mb-10`}>
                <Title><PTText value={title} /></Title>
              </div>
              <div className={`text-center ${PAD_X} mb-12`}>
                <StepTag />
                <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
              </div>
            </>
          )}

          {photoSrc && (
            <div className="flex items-center justify-center">
              <div className={`relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-lg`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:block h-full`}>
          {hasText && photoSrc ? (
            <div className={`grid h-full grid-cols-[minmax(520px,1fr)_1px_minmax(360px,0.75fr)] border-r ${LINE}`}>
              <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                <div className="w-full max-w-[520px]">
                  <Title><PTText value={title} /></Title>
                  <div className={`w-full border-t ${LINE} my-6`} />
                  <StepTag />
                  <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                </div>
              </div>

              <div className={`relative z-10 h-full border-l ${LINE}`} />

              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : hasText ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className={`flex items-center justify-center text-center ${PAD_X} w-full max-w-[520px]`}>
                <div>
                  <Title><PTText value={title} /></Title>
                  <div className={`w-full border-t ${LINE} my-6`} />
                  <StepTag />
                  <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                </div>
              </div>
            </div>
          ) : photoSrc ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative w-[360px] md:w-[400px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PANEL 05 - Text Left, Circle Photo Right
========================================================= */
function PanelStep5TitleBodyThenImage({
  title,
  body,
  photoSrc,
}: {
  title: PT;
  body: PT;
  photoSrc: string;
}) {
  const hasText = title?.length || body?.length;

  return (
    <section className={`relative flex-none ${PANEL_H_DESKTOP} ${BG}`}>
      <div className={`h-full ${FRAME_X} ${FRAME_Y}`}>
        {/* MOBILE */}
        <div className={`md:hidden ${SECTION_MOBILE}`}>
          {hasText && (
            <>
              <div className={`text-center ${PAD_X} mb-8`}>
                <Title><PTText value={title} /></Title>
              </div>
              <div className={`text-center ${PAD_X} mb-12`}>
                <StepTag />
                <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
              </div>
            </>
          )}

          {photoSrc && (
            <div className="flex items-center justify-center">
              <div className={`relative ${PHOTO_SIZE_MOBILE} rounded-full overflow-hidden shadow-lg`}>
                <Image src={photoSrc} alt="" fill className="object-cover" priority />
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className={`hidden md:block h-full`}>
          {hasText && photoSrc ? (
            <div className={`grid h-full grid-cols-[minmax(520px,1fr)_1px_minmax(360px,0.75fr)] border-r ${LINE}`}>
              <div className={`flex items-center justify-center text-center ${PAD_X}`}>
                <div className="w-full max-w-[520px]">
                  <Title><PTText value={title} /></Title>
                  <div className={`w-full border-t ${LINE} my-6`} />
                  <StepTag />
                  <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                </div>
              </div>

              <div className={`relative z-10 h-full border-l ${LINE}`} />

              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : hasText ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className={`flex items-center justify-center text-center ${PAD_X} w-full max-w-[520px]`}>
                <div>
                  <Title><PTText value={title} /></Title>
                  <div className={`w-full border-t ${LINE} my-6`} />
                  <StepTag />
                  <BodyInNoSlot><PTText value={body} /></BodyInNoSlot>
                </div>
              </div>
            </div>
          ) : photoSrc ? (
            <div className={`flex h-full items-center justify-center border-r ${LINE}`}>
              <div className={`relative z-20 flex items-center justify-center ${PAD_X}`}>
                <div className={`relative ${PHOTO_SIZE_DESKTOP} rounded-full overflow-hidden`}>
                  <Image src={photoSrc} alt="" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          ) : null}
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
  const photo4 = (journey as any).photo4;
  const photo5 = (journey as any).photo5;

  const copy = journey.steps;

  return (
    <>
      <div className="md:hidden">
        <PanelPhotoLeft photoSrc={photo1} title={copy.s1.title} body={copy.s1.body} />
        <PanelPhotoRightRounded bottomTitle={copy.s2.title} bottomBody={copy.s2.body} photoSrc={photo2} />
        <PanelPhotoRightCircle photoSrc={photo3} title={copy.s3.title} body={copy.s3.body} />
        <PanelStep4WithPhotoRounded title={copy.s4.title} body={copy.s4.body} photoSrc={photo4} />
        <PanelStep5TitleBodyThenImage title={copy.s5.title} body={copy.s5.body} photoSrc={photo5} />
      </div>

      <div className="hidden md:block">
        <ScrollLockHorizontal speed={1.1} className={BG}>
          <PanelPhotoLeft photoSrc={photo1} title={copy.s1.title} body={copy.s1.body} />
          <PanelPhotoRightRounded bottomTitle={copy.s2.title} bottomBody={copy.s2.body} photoSrc={photo2} />
          <PanelPhotoRightCircle photoSrc={photo3} title={copy.s3.title} body={copy.s3.body} />
          <PanelStep4WithPhotoRounded title={copy.s4.title} body={copy.s4.body} photoSrc={photo4} />
          <PanelStep5TitleBodyThenImage title={copy.s5.title} body={copy.s5.body} photoSrc={photo5} />
        </ScrollLockHorizontal>
      </div>
    </>
  );
}