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
