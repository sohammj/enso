import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

export const SITE_URL = "https://www.ensomindmatters.com";
export const SITE_NAME = "Enso Mind Matters";

type SeoDocument = {
  title?: string;
  subtitle?: string;
  preview?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: any;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function staticMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const image = absoluteUrl("/ensologo.png");

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: image, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function documentMetadata(
  document: SeoDocument | null,
  path: string,
  kind: "Service" | "Program",
): Metadata {
  if (!document) {
    return {
      title: `${kind} not found`,
      robots: { index: false, follow: false },
    };
  }

  const title =
    document.seoTitle ||
    (document.title ? `${document.title} in Mumbai` : `${kind} in Mumbai`);
  const description =
    document.seoDescription ||
    document.preview ||
    document.subtitle ||
    `Learn more about this ${kind.toLowerCase()} from Enso Mind Matters in Mumbai.`;
  const image = document.seoImage
    ? urlFor(document.seoImage).width(1200).height(630).fit("crop").url()
    : absoluteUrl("/ensologo.png");

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: document.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: image, alt: document.title || SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
