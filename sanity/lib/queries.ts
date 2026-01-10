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