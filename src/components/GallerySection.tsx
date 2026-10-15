import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Camera } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F6F0E8] border-t border-[#E8DFD5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7E8B76] mb-2 block">
            Visual Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281C15] tracking-tight">
            Glimpses of Slow Mornings
          </h2>
          <p className="mt-4 text-base text-[#6E6259]">
            A visual chronicle of our roasting sessions, morning oven bakes, hand-poured lattes, and sun-drenched cafe moments.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'coffee', label: 'Latte Art' },
            { id: 'bakery', label: 'Pastries & Bakes' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'brewing', label: 'Coffee Brewing' },
            { id: 'interior', label: 'Cafe Interiors' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#281C15] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#FAF6F0] text-[#6E6259] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${item.title}`}
              className="group relative rounded-xl overflow-hidden aspect-square bg-[#E8DFD5] shadow-sm hover:shadow-md cursor-pointer border border-[#E8DFD5] focus:outline-none focus:ring-2 focus:ring-[#7E8B76]"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with title & zoom icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#281C15]/85 via-[#281C15]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#FAF6F0]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#A8BBA2]">
                    {item.categoryLabel}
                  </span>
                  <Maximize2 className="w-4 h-4 text-[#FAF6F0]" />
                </div>
                <h4 className="font-serif text-lg font-semibold mt-1 text-white">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Small prompt */}
        <div className="text-center mt-8 text-xs text-[#8A7D73]">
          Click any photo to explore in high resolution with full notes.
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Top Bar: Counter & Close */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs text-[#D8CCC0]">
              <Camera className="w-4 h-4 text-[#A8BBA2]" />
              <span>
                Photo {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center: Image & Navigation Arrows */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10 cursor-pointer"
              aria-label="Previous photo (Left arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].alt}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10 cursor-pointer"
              aria-label="Next photo (Right arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title & Caption */}
          <div
            className="w-full max-w-2xl text-center text-white pt-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF6F0]">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CCC0] mt-1.5 max-w-xl mx-auto leading-relaxed">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
