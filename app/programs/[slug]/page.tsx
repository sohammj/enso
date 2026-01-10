import { notFound } from "next/navigation";
import { fetchProgramBySlug } from "@/sanity/lib/fetchProgramBySlug";
import ProgramClient from "./ProgramClient";

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const program = await fetchProgramBySlug(params.slug);
  if (!program) return notFound();

  return <ProgramClient program={program} />;
}
