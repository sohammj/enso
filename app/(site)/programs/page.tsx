import ProgramsClient from "./ProgramsClient";
import { fetchPrograms } from "@/sanity/lib/fetchPrograms";
import { staticMetadata } from "@/lib/seo";

export const metadata = staticMetadata(
  "Mental Health Programs & Support Groups in Mumbai",
  "Explore Enso Mind Matters programs, experiential groups and supportive community spaces in Mumbai.",
  "/programs",
);

export default async function ProgramsPage() {
  const programs = await fetchPrograms();
  return <ProgramsClient programs={programs} />;
}
