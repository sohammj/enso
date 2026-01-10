export const HOME_PAGE_QUERY = /* groq */ `
*[_type == "homePage" && _id == "homePage"][0]{
    hero{
    headlineLines,
    subheadline,
    },

  welcome{
    title,
    body,
    image,
    highlights[]{label, emoji}
  },
  about{
    title,
    body,
    quote
  },
  pauseReflect{
    label,
    phrases
  },
  support{
    title,
    subtitle,
  }
}
`;


export const PROGRAMS_QUERY = /* groq */ `
*[_type == "program"] | order(coalesce(order, 9999) asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  status,
  label,
  subtitle,
  preview,
  description,
  icon,
  cta
}
`;

export const PROGRAM_BY_SLUG_QUERY = /* groq */ `
*[_type == "program" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  status,
  label,
  subtitle,
  preview,
  description,
  icon,
  cta
}
`;


// cards[]{
//       title,
//       description,
//       bg,
//       href,
//       icon,
//       fallbackIconPath
//     }



// OverlayOpacity,
//     soundButtonLabelMuted,
//     soundButtonLabelUnmuted,
//     "videoUrl": backgroundVideo.asset->url