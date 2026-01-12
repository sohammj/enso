// app/(site)/gallery/page.tsx
import { fetchGalleryAlbums } from '@/sanity/lib/fetchGalleryAlbums';
import GalleryClient from './GalleryClient';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const albums = await fetchGalleryAlbums();

  return <GalleryClient albums={albums} />;
}