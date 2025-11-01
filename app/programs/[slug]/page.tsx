"use client";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { programs } from "../../../lib/data";
import { motion } from "framer-motion";

export default function ProgramPage() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  if (!program) return notFound();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="bg-[#F7F4EF] text-[#111]">
      <section className="mx-auto max-w-4xl px-4 py-20">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-10"
        >
          {program.icon && (
            <Image
              src={program.icon}
              alt={`${program.title} icon`}
              width={64}
              height={64}
              className="mx-auto mb-4 opacity-80"
            />
          )}
          <p className="uppercase tracking-wide text-sm opacity-70">
            {program.label}
          </p>
          <h1 className="font-display text-4xl">{program.title}</h1>
          <p className="text-lg opacity-70 mt-2">{program.subtitle}</p>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6 leading-relaxed text-lg opacity-90"
        >
          {program.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        {/* CTA CARD */}
        {program.cta && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="text-base font-medium">{program.cta.tagline}</p>
              <p className="text-sm opacity-70">{program.subtitle}</p>
            </div>
            <a
              href={program.cta.href}
              className="bg-[#2643A0] text-white rounded-full px-5 py-3 hover:opacity-90 transition"
            >
              {program.cta.text}
            </a>
          </motion.div>
        )}
      </section>
    </main>
  );
}
