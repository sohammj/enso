"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DomeGallery from '@/components/bits/DomeGallery'; 

/* ================= TYPES ================= */

type Album = {
  id: string;
  title: string;
  coverImage: string;
  photos: string[];
};

/* ================= SAMPLE DATA ================= */

const ALBUMS: Album[] = [
  {
    id: 'cancer-survivors',
    title: 'Art Therapy with Cancer Survivors',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      'https://images.unsplash.com/photo-1544967082-d9d25d867eeb?w=800&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
      'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&q=80'
    ]
  },
  {
    id: 'drum-kids',
    title: 'Drum Session with Kids',
    coverImage: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
      'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80'
    ]
  },
  {
    id: 'goal-setting',
    title: 'Group Session on Goal Setting',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
    ]
  },
  {
    id: 'movement-college',
    title: 'Movement Session with College Students',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80'
    ]
  },
  {
    id: 'art-festival',
    title: 'Shivaji Park Art Festival 2022',
    coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
      'https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6?w=800&q=80',
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
      'https://images.unsplash.com/photo-1531243625752-c0e9c36bb0bf?w=800&q=80'
    ]
  },
  {
    id: 'visual-art-kids',
    title: 'Visual Art Session for Kids',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80'
    ]
  }
];

/* ================= MAIN COMPONENT ================= */

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <>
      <style>{`
        .album-card-hover {
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .album-card-hover:hover {
          transform: translateY(-8px);
        }
        .album-overlay {
          transition: opacity 500ms ease-out, backdrop-filter 500ms ease-out;
        }
      `}</style>

      <section className="relative py-24  min-h-screen">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 text-center mb-20">
          <h1 className="font-serif text-5xl text-[#506EA1] mb-4">
            Gallery
          </h1>
          <p className="text-[#3A3A3A]/80 max-w-xl mx-auto text-lg">
            Glimpses from circles, workshops, campus sessions, and quiet reflections.
          </p>
        </div>

        {/* Album Grid */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {ALBUMS.map((album) => (
              <div
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
                className="album-card-hover group relative overflow-hidden rounded-3xl bg-white shadow-lg cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Caption overlay */}
                <div className="album-overlay absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 py-5 group-hover:from-black/80">
                  <p className="text-white font-medium text-lg">
                    {album.title}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {album.photos.length} photos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dome Gallery Modal */}
        {selectedAlbum && (
          <DomeGalleryModal
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
      </section>
    </>
  );
}

/* ================= DOME GALLERY MODAL ================= */

function DomeGalleryModal({ album, onClose }: { album: Album; onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    // Store original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F3EF] w-screen h-screen overflow-hidden touch-none overscroll-none">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[100] p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
        aria-label="Close gallery"
      >
        <X className="w-5 h-5 md:w-6 md:h-6 text-[#506EA1]" />
      </button>

      {/* Album Title */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[100] bg-white/90 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg max-w-[60vw]">
        <h2 className="text-[#506EA1] font-medium text-sm md:text-lg truncate">
          {album.title}
        </h2>
      </div>

      {/* Dome Gallery Component */}
      <div className="w-full h-full bg-[#F5F3EF]">
        <DomeGallery 
          images={album.photos}
          fit={1}
          minRadius={750}
          maxVerticalRotationDeg={5}
          segments={28}
          dragDampening={1}
          overlayBlurColor="transparent"
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          grayscale={false}
        />
      </div>
    </div>
  );
}