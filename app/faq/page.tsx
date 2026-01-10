import { fetchFAQPage } from "@/sanity/lib/fetchFAQPage";
import FAQClient from "./FAQClient";

export default async function FAQPage() {
  const data = await fetchFAQPage();
  return <FAQClient data={data} />;
}
