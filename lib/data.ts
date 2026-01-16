// lib/data.ts

export const studioInfo = {
  name: "Enso Mind Matters",
  tagline:
    "Creating space for growth, healing, and community through Art-Based Therapy.",
  subtagline:
    "At Enso Mind Matters, we believe in nurturing emotional well-being through creativity, mindfulness, and connection.",
  addressLine1: "3 United House, besides Starcity Cinema,",
  addressLine2: "Manmala Tank Road, Mahim, Mumbai 400016",
  email: "parul.enso@gmail.com",
  phone: "", // if they give you one later
  cityTag: "Mumbai, India",
};

export const founder = {
  name: "Parul Dewal-Hande",
  bioShort:
    "Founder, Art-Based Therapist, Group Facilitator.",
  bioLong: [
    // pulled + lightly cleaned from old “About me” page. :contentReference[oaicite:1]{index=1}
    "Parul Dewal-Hande is a certified Art-Based Therapy practitioner from the World Centre of Creative Learning (WCCL). She also holds a Master's in Industrial Psychology and a Diploma in Counselling Psychology.",
    "Across 11+ years, she has supported teenagers and adults through anxiety, depression, trauma, relationship concerns, stress, and self-esteem challenges.",
    "Her work spans corporates, NGOs, orphanages, colleges, and mental health clinics. She believes everyone is capable of healing and growth if they're given safety, compassion, and the right tools.",
    "Parul is part of The Red Pencil Art Therapists team delivering international 'Art-Based Capacity Building and Training' for teachers in Jammu & Kashmir with the Piramal Foundation — training ~150 teachers (June–Dec) to become student counselors using socio-emotional learning and art-based techniques. :contentReference[oaicite:2]{index=2}",
  ],
  roles: [
    "Founder of Enso Counseling and Art Therapy Centre, Mumbai",
    "College counsellor at Ruparel College, Mumbai",
    "Trustee of DU Foundation",
  ], // also mentioned in IIT Bombay event bio. :contentReference[oaicite:3]{index=3}
  headshot: "/paurl hande.jpg", // add asset
};

// export const programs = [
//   {
//     slug: "fika",
//     title: "Fika",
//     subtitle: "Support Circle",
//     label: "Program",
//     description: [
//       "Fika is a monthly support circle where we slow down and connect. We hold space to talk about emotions, stress, anxiety, coping, friendship, and mindfulness — without judgment.",
//       "Each month we explore a different theme, for example: ‘Rewind Your Friendship’, ‘Finding Your Emotional Lighthouse’, ‘Let’s Scan Anxiety’, ‘Mindfulness’. Sessions use art-based therapy, gentle prompts, and shared conversation.",
//       "Anyone who needs a pause, wants to understand their emotions more deeply, or simply wants to be witnessed in a safe group is welcome.",
//     ],
//     cta: {
//       text: "Join the next Fika circle",
//       href: "/start-a-conversation",
//       tagline: "Want to join the next session?",
//     },
//     icon: "/icons/fika.svg",

//   },
//   {
//    slug: "cope",
//     title: "Cope",
//     subtitle: "Resilience & Expression",
//     label: "Program",
//     description: [
//       "Cope is more than just a therapy program — it’s a growing community of people learning to process emotions through art and awareness.",
//       "We explore stress, anxiety, and change using creative techniques. Sessions include journaling, guided art prompts, and reflections that help translate emotion into expression and growth.",
//       "Our aim is to nurture resilience, balance, and inner peace — so participants feel more empowered and self-aware in their daily lives.",
//     ],
//     cta: {
//       text: "Book a Cope session",
//       href: "/start-a-conversation",
//       tagline: "Want to experience the next Cope session?",
//     },
//     icon: "/icons/cope.png",
//   },
//   {
//     slug: "aakar",
//     title: "Aakar",
//     subtitle: "Creative Growth Program",
//     label: "Program",
//     description: [
//       "Aakar focuses on identity and healing through creative exploration. It helps participants understand their inner narratives using art-based reflection and group work.",
//       "The sessions combine introspection, artistic engagement, and mindful dialogue to foster personal growth and connection.",
//       "This program is ideal for those seeking deeper self-understanding through creativity.",
//     ],
//     cta: {
//       text: "Enroll in Aakar",
//       href: "/start-a-conversation",
//       tagline: "Ready to begin your growth journey?",
//     },
//     icon: "/icons/akar.svg",
//   },
// ];
export type ProgramStatus = "ongoing" | "past";

export type Program = {
  slug: string;
  title: string;
  subtitle?: string;
  label?: string;
  status: ProgramStatus;
  preview?: string; // short summary for cards
  description: string[]; // full detail page content
  icon?: string;
  cta?: {
    text: string;
    href: string;
    tagline?: string;
  };
};

export const programs: Program[] = [
  // ✅ ONGOING
  {
    slug: "aakar",
    title: "AAKAR",
    subtitle: "Experiential Group Session",
    label: "Program",
    status: "ongoing",
    preview:
      "A once-a-month experiential space to pause, reflect, and express in a supportive community.",
    description: [
      "AAKAR is a once-a-month experiential group session created to offer individuals a space to pause, reflect, and express themselves in a supportive community setting. Conducted both online and offline, AAKAR brings people together to explore mindfulness and self-awareness through simple yet meaningful activities.",
      "The sessions are offered at a minimal cost, keeping the space accessible and inclusive. Rather than focusing on problem-solving alone, AAKAR emphasizes slowing down, noticing inner experiences, and sharing reflections with others in a safe, non-judgmental environment.",
      "Each AAKAR session revolves around a thoughtfully chosen theme or activity, such as mindfulness-based explorations, Pause and Reflect, Try Not Laugh, Speaking Tree sessions focused on boundary setting, and Ink and Insight using writing and reflection for self-exploration.",
      "These activities invite participants to observe their thoughts, emotions, and patterns while learning from shared experiences within the group.",
    ],
    icon: "/icons/akar.svg",
    cta: {
      text: "Enquire about AAKAR",
      href: "/start-a-conversation",
      tagline: "Want to join an upcoming session?",
    },
  },
  {
    slug: "mind-matters-workplace",
    title: "MindMatter @ Workplace",
    subtitle: "Corporate Wellbeing & Leadership",
    label: "Program",
    status: "ongoing",
    preview:
      "A customized corporate wellbeing and leadership program designed around your organization’s needs.",
    description: [
      "MindMatter @ Workplace is a customized corporate program by Enso Art Therapy and Counseling Centre, designed to support employee wellbeing and leadership development.",
      "We work closely with organizations to curate and design interventions based on their specific needs, culture, and goals.",
      "What we offer includes customized workshops on workplace wellbeing, emotional intelligence, communication, mindfulness, and team dynamics; psychometric assessments to understand strengths, behavior patterns, and leadership potential; one-on-one leadership and behavioral skill development interventions; and a Corporate Leadership Readiness Program for emerging and current leaders.",
      "Grounded in psychology and experiential learning, our programs focus on building self-awareness.",
    ],
    icon: "/icons/mindmatters.png", // change if you have a better file
    cta: {
      text: "Discuss a workplace program",
      href: "/start-a-conversation",
      tagline: "Want a custom intervention for your team?",
    },
  },

  // 🕊 PAST
  {
    slug: "fika",
    title: "Fika",
    subtitle: "Online Support Group",
    label: "Past Program",
    status: "past",
    preview:
      "An online support group created during COVID-19 to offer connection, emotional expression, and shared presence.",
    description: [
      "Inspired by the Swedish tradition of Fika—a mindful pause from daily activity to connect over coffee, light food, and conversation—Enso Art Therapy and Counseling Centre initiated an online emotional support group during the COVID-19 pandemic titled “Fika in COVID Time.”",
      "At a time marked by isolation, uncertainty, and emotional overwhelm, this program was conceptualized as a safe, informal, and inclusive virtual space where individuals could pause, connect, and simply be.",
      "“Fika in COVID Time” was an open online support group, welcoming individuals at any stage of life, with any mental health concern—or even those who simply needed connection during a difficult period.",
      "Participants were not required to have a specific diagnosis or agenda. The emphasis was on human connection, emotional expression, and shared presence.",
    ],
    icon: "/icons/fika.svg",
    // no CTA for past programs
  },
  {
    slug: "cope",
    title: "Cope",
    subtitle: "Career Orientations in Psychology & Education",
    label: "Past Program",
    status: "past",
    preview:
      "An initiative guiding students toward clarity on psychology career pathways through accessible webinars and mentoring.",
    description: [
      "The C.O.P.E Project (Career Orientations in Psychology & Education) is an initiative by a group of like-minded, qualified psychology graduates from the 2010 batch of D.G. Ruparel College, Mumbai.",
      "United by a shared commitment to education and mentorship, the initiative was created to support students who aspire to build a career in the field of psychology.",
      "The primary aim of The C.O.P.E Project is to educate and guide young minds about the diverse pathways available in psychology and education. Many students enter the field with enthusiasm but limited clarity about academic routes, specializations, and real-world professional expectations.",
      "Since the onset of the COVID-19 pandemic, The C.O.P.E Project has been organizing online webinars and orientation sessions conducted by professionals working across various domains of psychology.",
      "These sessions focus on understanding different career pathways in psychology, academic requirements and specializations, practical realities of working in the field, and setting realistic expectations about training, challenges, and growth. To ensure accessibility, these webinars are offered at a minimal cost.",
    ],
    icon: "/icons/cope.png",
    // no CTA for past programs
  },
];


export const services = [
  {
    slug: "individual-sessions",
    title: "Individual Sessions",
    label: "Service",
    subtitle: "Private, compassionate one-on-one space",
    icon: "/icons/individual1.png", // or any local/public image
    description: [
      "In individual sessions, we create a private, compassionate space to talk about what you're carrying — anxiety, burnout, grief, self-worth, identity, and more.",
      "We use verbal processing along with art-based techniques to help you express things that are hard to put into words."
    ],
    cta: {
      tagline: "Ready to begin your journey?",
      subtitle: "One-on-one guidance tailored to you.",
      text: "Start a conversation",
      href: "/start-a-conversation",
    },
  },
  {
    slug: "group-sessions",
    title: "Group Sessions",
    label: "Service",
    subtitle: "Creative connection and reflection together",
    icon: "/icons/group.svg",
    description: [
      "Group spaces allow you to feel seen and understood by people navigating similar feelings.",
      "We explore common themes — stress, boundaries, friendship, and self-compassion — through creative work, grounding, and reflection."
    ],
    cta: {
      tagline: "Want to join our next group?",
      subtitle: "Connect, create, and reflect together.",
      text: "Join the next session",
      href: "/start-a-conversation",
    },
  },
  {
  slug: "workshops-and-training",
  title: "Workshops & Training",
  label: "Service",
  subtitle: "Creative workshops for self-expression and learning",
  icon: "/icons/workshop.svg", // optional, place any image in /public/icons/
  description: [
    "Our workshops and training sessions focus on exploring creativity, self-expression, and emotional awareness through art-based practices.",
    "Each session is designed to help participants connect with themselves and others while learning tangible tools for mindfulness and well-being.",
    "We facilitate both private group workshops and organizational training for teams seeking a balance of creativity, reflection, and connection."
  ],
  cta: {
    tagline: "Want to organize a workshop?",
    subtitle: "Reach out to plan a personalized art-based training.",
    text: "Contact us",
    href: "/start-a-conversation",
  },
},
];


export const faqs = [
  // adapted from the FAQ page. :contentReference[oaicite:7]{index=7}
  {
    q: "Does Enso only provide art-based therapy?",
    a: "No. Enso believes in an eclectic approach. We adapt modalities to the client's comfort, needs, and readiness — art is one pathway, not the only one.",
  },
  {
    q: "Is art-based therapy only for children? Do I need to be 'good at art'?",
    a: "No. There’s no age limit, and you do not need any art background. We care about expression, not perfection.",
  },
  {
    q: "What happens in a typical session?",
    a: "We begin with what you're going through. Then we may use movement, clay, visual arts, sound, journaling, storytelling — whatever helps you access and organize what you're feeling.",
  },
  {
    q: "Do you offer online sessions?",
    a: "Yes. We offer both in-person sessions in Mahim, Mumbai, and online sessions.",
  },
  {
    q: "How do I book?",
    a: "You can fill out the booking form, email us, or message us on WhatsApp. We'll get back to you with available slots.",
  },
];
