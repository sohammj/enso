import { notFound } from "next/navigation";
import { fetchProgramBySlug } from "@/sanity/lib/fetchProgramBySlug";
import ProgramClient from "./ProgramClient";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = await fetchProgramBySlug(slug);
  if (!program) return notFound();

  return <ProgramClient program={program} />;
}
