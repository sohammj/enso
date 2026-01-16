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


export const SERVICES_QUERY = /* groq */ `
*[_type == "service" && (!defined(status) || status == "active")]
| order(coalesce(order, 9999) asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  label,
  subtitle,
  preview,
  description,
  icon,
  cta,
  photoStrip[]{ image, label, caption }

}
`;

export const SERVICE_BY_SLUG_QUERY = /* groq */ `
*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  label,
  subtitle,
  preview,
  description,
  icon,
  cta,
  photoStrip[]{ image, label, caption }

}
`;



export const FAQ_PAGE_QUERY = /* groq */ `
*[_type == "faqPage" && _id == "faqPage"][0]{
  title,
  subtitle,
  items[]{ q, a },
  cta{ text, buttonText, href }
}
`;


export const ABOUT_PAGE_QUERY = /* groq */ `
*[_type == "aboutPage" && _id == "aboutPage"][0]{
  heading,
  photos{
    photo1,
    photo2,
    photo3
  },
  steps{
    s1{ no, title, body },
    s2{ no, title, body },
    s3{ no, title, body },
    s4{
      topLeftTitle,
      topLeftBody,
      topRightStep,
      bottomLeftStep,
      bottomRightTitle,
      bottomRightBody
    }
  }
}
`;



export const GALLERY_ALBUMS_QUERY = `*[_type == "galleryAlbum"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  "photos": photos[].asset->url
}`;

export const GALLERY_ALBUM_BY_SLUG_QUERY = `*[_type == "galleryAlbum" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  "photos": photos[].asset->url
}`;


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