"use client";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "../../../lib/data";

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return notFound();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="text-[#111]">
      <section className="mx-auto max-w-4xl px-4 py-20">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-10"
        >
          {service.icon && (
            <Image
              src={service.icon}
              alt={`${service.title} icon`}
              width={64}
              height={64}
              className="mx-auto mb-4 opacity-80"
            />
          )}
          <p className="uppercase tracking-wide text-sm opacity-70">
            {service.label || "SERVICE"}
          </p>
          <h1 className="font-display text-4xl">{service.title}</h1>
          {service.subtitle && (
            <p className="text-lg opacity-70 mt-2">{service.subtitle}</p>
          )}
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6 leading-relaxed text-lg opacity-90"
        >
          {Array.isArray(service.description)
            ? service.description.map((para, i) => <p key={i}>{para}</p>)
            : <p>{service.body}</p>}
        </motion.div>

        {/* CTA CARD */}
        {service.cta && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="text-base font-medium">{service.cta.tagline}</p>
              <p className="text-sm opacity-70">{service.cta.subtitle}</p>
            </div>
            <a
              href={service.cta.href}
              className="bg-[#2643A0] text-white rounded-full px-5 py-3 hover:opacity-90 transition"
            >
              {service.cta.text}
            </a>
          </motion.div>
        )}
      </section>
    </main>
  );
}
