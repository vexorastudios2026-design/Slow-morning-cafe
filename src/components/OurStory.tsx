import React from 'react';
import { Heart, Compass, Coffee, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split: Narrative & Photographic Accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#E8DFD5] aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                  alt="Slow Mornings Cafe natural daylight and warm wooden tables"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#281C15] text-[#FAF6F0] p-6 rounded-2xl shadow-xl max-w-xs border border-[#3D2C22]">
                <p className="font-serif italic text-base leading-snug">
                  “The best hours of the day are the ones you do not count.”
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-[#A8BBA2] font-semibold">
                  — The Slow Morning Way
                </p>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DFD5] text-xs font-semibold uppercase tracking-wider text-[#7E8B76]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Philosophy & Roots</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281C15] tracking-tight leading-tight">
              {CAFE_CONFIG.brand.storyHeadline}
            </h2>

            <p className="text-base sm:text-lg text-[#503A2D] leading-relaxed">
              In a world that celebrates rush hours, instant pods, and gulping coffee between notifications, <strong>Slow Mornings Cafe</strong> was imagined as a quiet sanctuary. We believe that the first hour of your day shouldn’t be a sprint—it should be an unhurried, nourishing ritual.
            </p>

            <p className="text-sm sm:text-base text-[#6E6259] leading-relaxed">
              Every morning in XYZ begins in quiet stillness. Before the sun crests the rooftops, the aroma of stone-ground Arabica and warm yeast drifts from our ovens. We grind beans in small batches, calibrate our water to exact micro-temperatures, and steam whole dairy into silky cloud foam.
            </p>

            <p className="text-sm sm:text-base text-[#6E6259] leading-relaxed">
              There are no hurried glances at the watch here. Whether you come with a novel, a trusted friend, or simply a sketchbook and a yearning for peace, you have a place at our table.
            </p>

            {/* Three Ethos Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8DFD5]">
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#281C15]">Pure Extraction</h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Single-estate shade-grown coffees roasted lightly to honour fruit, chocolate, and floral notes.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#281C15]">Hearth Bakes</h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Pure cultured butter, slow fermentations, and traditional French lamination every morning.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#281C15]">Open Courtyard</h4>
                <p className="text-xs text-[#6E6259] leading-normal">
                  Natural oak timber, soft terracotta, potted ferns, and gentle acoustic morning melodies.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
