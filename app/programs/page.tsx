import Link from "next/link";
import Image from "next/image";
import { programs } from "../../lib/data";

export default function ProgramsPage() {
  return (
    <main className="bg-[#F7F4EF] text-[#111] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-3">
            Our Programs
          </h1>
          <p className="text-lg opacity-70">
            Explore ways to express, connect, and heal through creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {program.icon && (
                <Image
                  src={program.icon}
                  alt={`${program.title} icon`}
                  width={48}
                  height={48}
                  className="opacity-80 mb-3"
                />
              )}
              <p className="uppercase tracking-widest text-xs text-gray-500">
                {program.label}
              </p>
              <h3 className="text-xl font-medium mt-1 mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {program.description[0].slice(0, 120)}...
              </p>
              <p className="text-[#2643A0] mt-3 text-sm font-medium group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
