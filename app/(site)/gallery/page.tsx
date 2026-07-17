// app/(site)/gallery/page.tsx
import { fetchGalleryAlbums } from '@/sanity/lib/fetchGalleryAlbums';
import GalleryClient from './GalleryClient';
import { staticMetadata } from '@/lib/seo';

export const metadata = staticMetadata(
  'Gallery',
  'View moments from Enso Mind Matters workshops, group sessions and arts-based therapy activities in Mumbai.',
  '/gallery',
);

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const albums = await fetchGalleryAlbums();

  return <GalleryClient albums={albums} />;
}
