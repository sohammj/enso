import HomeClient from "./HomeClient";
import { fetchHomePage } from "@/sanity/lib/fetchHomePage";

export default async function Page() {
  const data = await fetchHomePage();
  return <HomeClient data={data} />;
}
