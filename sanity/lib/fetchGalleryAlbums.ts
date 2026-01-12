// sanity/lib/fetchGalleryAlbums.ts
import { fetchFromSanity } from './fetch';
import { GALLERY_ALBUMS_QUERY } from './queries';

export interface GalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  photos: string[];
}

export async function fetchGalleryAlbums(): Promise<GalleryAlbum[]> {
  try {
    const albums = await fetchFromSanity<GalleryAlbum[]>({
      query: GALLERY_ALBUMS_QUERY,
      tags: ['galleryAlbum'],
    });
    return albums || [];
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }
}