import { fetchFAQPage } from "@/sanity/lib/fetchFAQPage";
import FAQClient from "./FAQClient";
import { JsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/seo";

export const metadata = staticMetadata(
  "Counselling & Art Therapy FAQs",
  "Answers to frequently asked questions about counselling, arts-based therapy, sessions and programs at Enso Mind Matters.",
  "/faq",
);

export default async function FAQPage() {
  const data = await fetchFAQPage();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data?.items || [])
      .filter((item) => item.q && item.a)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQClient data={data} />
    </>
  );
}
