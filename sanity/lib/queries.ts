// GROQ Query
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
    highlights[]{
      label,
      icon
    }
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
    cards[]{
      title,
      description,
      icon,
      bg,
      href
    }
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
  cta,
  photoStrip[]{ image, label, caption }
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
  cta,
  photoStrip[]{ image, label, caption }
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
    photo3,
    photo5
  },
  steps{
    s1{ title, body },
    s2{ title, body },
    s3{ title, body },
    s4{ title, body },
    s5{ title, body }
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


export const newClientBookingPageQuery = `
*[_type == "newClientBookingPage" && _id == "newClientBookingPage"][0]{
  _id,
  pageTitle,
  pageSubtitle,
  intakeFormEmbedUrl,
  calendarEmbedUrl,
  
  sessionDurationText,
  feeAmount,
  feeCurrency,
  afterIntakeMessage
}
`;

export const returningClientBookingPageQuery = `
*[_type == "returningClientBookingPage" && _id == "returningClientBookingPage"][0]{
  _id,
  pageTitle,
  pageSubtitle,
  calendarEmbedUrl,

  sessionDurationText,
  feeAmount,
  feeCurrency
}
`;

// export const privateBookingPageQuery = `
// *[_type == "privateBookingPage" && _id == "privateBookingPage"][0]{
//   _id,
//   pageTitle,
//   pageSubtitle,
//   intakeFormEmbedUrl,
//   calendarEmbedUrl,
//   instagramUrl,
//   sessionDurationText,
//   feeAmount,
//   feeCurrency,
//   afterIntakeMessage,
//   newClientLabel,
//   returningClientLabel
// }
// `;



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