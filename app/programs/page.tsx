import ProgramsClient from "./ProgramsClient";
import { fetchPrograms } from "@/sanity/lib/fetchPrograms";

export default async function ProgramsPage() {
  const programs = await fetchPrograms();
  return <ProgramsClient programs={programs} />;
}
