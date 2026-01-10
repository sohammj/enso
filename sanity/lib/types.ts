export type HomeHighlight = { label?: string; emoji?: string };

export type SupportCard = {
  title?: string;
  description?: string;
  bg?: string;
  href?: string;
  icon?: any; // Sanity image object
  fallbackIconPath?: string;
};

export type HomePageData = {
  hero?: {
    headlineLines?: string[];
    subheadline?: string;
    // overlayOpacity?: number;
    // soundButtonLabelMuted?: string;
    // soundButtonLabelUnmuted?: string;
    // videoUrl?: string | null;
  };

  welcome?: {
    title?: string;
    body?: string;
    image?: any;
    highlights?: HomeHighlight[];
  };
  about?: {
    title?: string;
    body?: string;
    quote?: string;
  };
  pauseReflect?: {
    label?: string;
    phrases?: string[];
  };
  support?: {
    title?: string;
    subtitle?: string;
    // cards?: SupportCard[];
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
  description?: string[];
  icon?: any; // Sanity image
  cta?: {
    tagline?: string;
    text?: string;
    href?: string;
  };
};


export type Service = {
  _id: string;
  title: string;
  slug?: string; // we’ll map currentSlug below
  label?: string;
  subtitle?: string;
  status?: "active" | "hidden";
  preview?: string;
  description?: string[];
  icon?: any; // Sanity image object
  cta?: {
    tagline?: string;
    subtitle?: string;
    text?: string;
    href?: string;
  };
};


export type FAQItem = {
  q?: string;
  a?: string;
};

export type FAQPageData = {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  cta?: {
    text?: string;
    buttonText?: string;
    href?: string;
  };
};
export type AboutPageData = {
  heading?: string;
  photos?: {
    photo1?: any;
    photo2?: any;
    photo3?: any;
  };
  steps?: {
    s1?: { no?: string; title?: string; body?: string };
    s2?: { no?: string; title?: string; body?: string };
    s3?: { no?: string; title?: string; body?: string };
    s4?: {
      topLeftTitle?: string;
      topLeftBody?: string;
      topRightStep?: string;
      bottomLeftStep?: string;
      bottomRightTitle?: string;
      bottomRightBody?: string;
    };
  };
};

export type JourneyContent = {
  heading: string;
  photo1: string;
  photo2: string;
  photo3: string;
  steps: {
    s1: { no: string; title: string; body: string };
    s2: { no: string; title: string; body: string };
    s3: { no: string; title: string; body: string };
    s4: {
      topLeftTitle: string;
      topLeftBody: string;
      topRightStep: string;
      bottomLeftStep: string;
      bottomRightTitle: string;
      bottomRightBody: string;
    };
  };
};
