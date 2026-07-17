import { notFound } from "next/navigation";
import { fetchProgramBySlug } from "@/sanity/lib/fetchProgramBySlug";
import ProgramClient from "./ProgramClient";
import type { Metadata } from "next";
import { documentMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);
  return documentMetadata(program, `/programs/${slug}`, "Program");
}

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
