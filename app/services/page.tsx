
"use client";

import { SplitText } from "../../components/bits/SplitText";

interface Program {
  title: string;
  description: string;
}

export default function Programs() {
  const programs: Program[] = [
    {
      title: "Individual Sessions",
      description:
        "We provide individual sessions for children, adolescents, adults, couples, and families dealing with a variety of diagnoses and challenges.",
    },
    {
      title: "Group Sessions",
      description:
        "The group setting enables you to connect with a diverse group of individuals, fostering communication and understanding through shared expression.",
    },
    {
      title: "Training & Workshops",
      description:
        "We offer workshops to schools, hospitals, colleges, and businesses, helping make mental health awareness accessible and affordable for all.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 text-center">
      <h1 className="font-display text-4xl">Services</h1>
      <SplitText
        className="mt-3 text-lg opacity-80 mx-auto max-w-3xl"
        text="Enso Counseling and Art Therapy Center helps individuals externalize and organize thoughts and emotions that are difficult to articulate."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {programs.map((program, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 aspect-square max-w-xs bg-gradient-to-br from-sun/40 via-tea/40 to-royal/40 hover:from-tea/60 hover:to-royal/60 transition-all duration-500 shadow-soft flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              {program.title}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

