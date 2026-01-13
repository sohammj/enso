"use client";
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DomeGallery from '@/components/bits/DomeGallery';
import { GalleryAlbum } from '@/sanity/lib/fetchGalleryAlbums';

interface GalleryClientProps {
  albums: GalleryAlbum[];
}

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function GalleryClient({ albums }: GalleryClientProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

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
      
      <section className="relative py-24 min-h-screen">
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
          {albums.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#3A3A3A]/60 text-lg">
                No albums available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {albums.map((album) => (
                <div
                  key={album._id}
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
                      {album.photos.length} photo{album.photos.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
function DomeGalleryModal({ 
  album, 
  onClose 
}: { 
  album: GalleryAlbum; 
  onClose: () => void;
}) {
  const isMobile = useIsMobile();

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
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
          fit={isMobile ? 0.85 : 1}
          minRadius={isMobile ? 650 : 750}
          maxVerticalRotationDeg={isMobile ? 0 : 5}
          segments={isMobile ? 20 : 28}
          dragDampening={isMobile ? 1.2 : 1}
          overlayBlurColor="transparent"
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          grayscale={false}
        />
      </div>
    </div>
  );
}