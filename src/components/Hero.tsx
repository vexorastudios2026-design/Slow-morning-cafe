import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, Clock, Sun, Coffee } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenWhatsApp }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAF6F0] py-16 lg:py-24">
      {/* Subtle organic decorative background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#E8DFD5]/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#D6DEC9]/30 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DFD5]/80 border border-[#D8CCC0] text-xs font-medium tracking-wide text-[#503A2D]">
              <Sparkles className="w-3.5 h-3.5 text-[#7E8B76]" />
              <span>Artisanal Coffee & Slow Living in Tohana</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#281C15] leading-[1.08]">
              {CAFE_CONFIG.brand.heroHeadline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#6E6259] max-w-xl font-normal leading-relaxed">
              Step away from the rush. We roast single-origin beans, hand-roll flaky morning croissants before dawn, and pour unhurried cups crafted to be savoured sip by slow sip.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#281C15] hover:bg-[#3D2C22] text-[#FAF6F0] text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#281C15] cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowDown className="w-4 h-4 text-[#D8CCC0]" />
              </button>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E8DFD5] hover:bg-[#DDD2C6] text-[#281C15] text-sm font-semibold tracking-wide border border-[#D8CCC0] transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E8B76] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#7E8B76]" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            {/* Highlight Badges */}
            <div className="pt-6 border-t border-[#E8DFD5] grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#281C15]">100% Arabica</p>
                  <p className="text-[11px] text-[#8A7D73]">Single-Estate</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#281C15]">Fresh Daily</p>
                  <p className="text-[11px] text-[#8A7D73]">Normandy Butter</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-[#281C15]">Unhurried</p>
                  <p className="text-[11px] text-[#8A7D73]">Linger Freely</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Cafe Photography Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6F0] aspect-[4/5] bg-[#E8DFD5]">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
                  alt="Slow Mornings Cafe serene sunlit espresso bar"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#281C15]/70 via-transparent to-transparent" />
                
                {/* Floating caption card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-sm border border-[#E8DFD5] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#7E8B76] font-semibold">Morning Brew Corner</p>
                      <p className="font-serif text-lg font-semibold text-[#281C15]">Where Time Takes a Breath</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#E8DFD5] text-[#503A2D] font-medium">
                      Est. 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Overlapping secondary photo card */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 w-44 rounded-xl overflow-hidden shadow-xl border-4 border-[#FAF6F0] bg-white transform -rotate-3 hover:rotate-0 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
                  alt="Golden warm butter croissant fresh from the oven"
                  className="w-full h-28 object-cover"
                />
                <div className="p-2.5 bg-[#FAF6F0]">
                  <p className="text-[11px] font-semibold text-[#281C15]">Daily Viennoiserie</p>
                  <p className="text-[10px] text-[#8A7D73]">Baked 6:30 AM</p>
                </div>
              </div>

              {/* Specialty Seal Badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#7E8B76] text-white flex flex-col items-center justify-center shadow-lg border-2 border-white rotate-12">
                <span className="text-[10px] uppercase font-bold tracking-tighter">Hand</span>
                <span className="text-xs font-serif font-bold">Crafted</span>
                <span className="text-[9px] opacity-80">Daily</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
