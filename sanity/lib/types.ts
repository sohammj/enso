import type { PortableTextBlock } from "@portabletext/types";


export type HomeHighlight = {
  label?: string;
  icon?: any; // Sanity image reference
};

export type SupportCard = {
  title?: string;
  description?: string;
  icon?: any; // Sanity image reference
  bg?: string;
  href?: string;
  fallbackIconPath?: string; // For client-side fallback
};

export type HomePageData = {
  hero?: {
    headlineLines?: string[];
    // subheadline?: string;
    subheadline?: PortableTextBlock[];
  };
  welcome?: {
    title?: string;
    // body?: string;
    body?: PortableTextBlock[];
    image?: any;
    highlights?: HomeHighlight[];
  };
  about?: {
    title?: string;
    // body?: string;
    body?: PortableTextBlock[];
    quote?: string;
  };
  pauseReflect?: {
    label?: string;
    phrases?: string[];
  };
  support?: {
    title?: string;
    subtitle?: string;
    cards?: SupportCard[];
  };
};

export type Program = {
  _id?: string;
  title?: string;
  slug?: string;
  status?: "ongoing" | "past";
  label?: string;
  subtitle?: string;
  preview?: string;
  // description?: string[];
  description?: PortableTextBlock[];
  icon?: any; // Sanity image
  closingQuote?: string;
  socialFeeds?: {
    instagram?: { enabled?: boolean; appId?: string };
    linkedin?: { enabled?: boolean; appId?: string };
  };
  cta?: {
    tagline?: string;
    text?: string;
    href?: string;
  };
  photoStrip?: { image?: any; label?: string; caption?: string }[];
};

// export type PrivateBookingPage = {
//   _id: string;
//   pageTitle?: string | null;
//   pageSubtitle?: string | null;

//   intakeFormEmbedUrl: string;
//   calendarEmbedUrl: string;
//   instagramUrl: string;

//   sessionDurationText: string;
//   feeAmount: number;
//   feeCurrency: string;

//   afterIntakeMessage: string;

//   newClientLabel: string;
//   returningClientLabel: string;
// };

export type NewClientBookingPage = {
  _id: string;
  pageTitle?: string | null;
  pageSubtitle?: string | null;
  intakeFormEmbedUrl: string;
  calendarEmbedUrl: string;
  
  sessionDurationText: string;
  feeAmount: number;
  feeCurrency: string;
  afterIntakeMessage: string;
};

export type ReturningClientBookingPage = {
  _id: string;
  pageTitle?: string | null;
  pageSubtitle?: string | null;
  calendarEmbedUrl: string;
  
  sessionDurationText: string;
  feeAmount: number;
  feeCurrency: string;
};


export type Service = {
  _id: string;
  title: string;
  slug?: string; // we’ll map currentSlug below
  label?: string;
  subtitle?: string;
  status?: "active" | "hidden";
  preview?: string;
  // description?: string[];
  description?: PortableTextBlock[];
  icon?: any; // Sanity image object
  ClosingQuote?: string;
  socialFeeds?: {
    instagram?: { enabled?: boolean; appId?: string };
    linkedin?: { enabled?: boolean; appId?: string };
  };
  cta?: {
    tagline?: string;
    subtitle?: string;
    text?: string;
    href?: string;
  };
  photoStrip?: { image?: any; label?: string; caption?: string }[];
};


export type FAQItem = {
  q?: string;
  a?: string;
};

export type FAQPageData = {
  title?: string;
  subtitle?: PortableTextBlock[];
  items?: FAQItem[];
  cta?: {
    text?: string;
    buttonText?: string;
    href?: string;
  };
};
export type AboutPageData = {
  heading?: string;
  subheading?: string;
  photos?: {
    photo1?: any;
    photo2?: any;
    photo3?: any;
    photo4?: any;
    photo5?: string;
  };
  steps?: {
    s1?: { title?: string; body?: string };
    s2?: { title?: string; body?: string };
    s3?: { title?: string; body?: string };
    s4?: { title?: string; body?: string };
    s5?: { title?: string; body?: string };
  };
};

export type JourneyContent = {
  heading: string;
  subheading?: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4?: any;
  photo5?: string;
  steps: {
    s1: { title: string; body: string };
    s2: { title: string; body: string };
    s3: { title: string; body: string };
    s4: { title: string; body: string };
    s5: { title: string; body: string };
  };
};



export type PhotoStripItem = {
  image?: any;
  label?: string;
  caption?: string;
};

