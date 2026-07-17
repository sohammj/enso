import HomeClient from "./HomeClient";
import { fetchHomePage } from "@/sanity/lib/fetchHomePage";
import { staticMetadata } from "@/lib/seo";

export const metadata = staticMetadata(
  "Counselling & Art Therapy in Mumbai",
  "Enso Mind Matters offers counselling, arts-based therapy, support groups and mental health workshops in Mahim, Mumbai.",
  "/",
);

export default async function Page() {
  const data = await fetchHomePage();
  return <HomeClient data={data} />;
}
