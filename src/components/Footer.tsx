import React from 'react';
import { Coffee, Instagram, ExternalLink, Heart } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E140E] text-[#D8CCC0] border-t border-[#3D2C22] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3D2C22]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3D2C22] flex items-center justify-center text-[#FAF6F0]">
                <Coffee className="w-5 h-5 text-[#A8BBA2]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6F0]">
                  {CAFE_CONFIG.brand.name}
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#A8BBA2] font-semibold">
                  Tohana, Haryana, India
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A89F95] leading-relaxed max-w-sm">
              An unhurried boutique café concept crafted for slow mornings, artisanal coffee rituals, and warm neighbourhood hospitality.
            </p>

            <div className="pt-2">
              <a
                href={CAFE_CONFIG.brand.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#281C15] hover:bg-[#3D2C22] text-[#FAF6F0] border border-[#503A2D] text-xs transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#A8BBA2]" />
                <span>Follow Weblith Studio</span>
                <ExternalLink className="w-3 h-3 text-[#A89F95]" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF6F0]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Menu & Pricing</a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Visual Journal</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Visit Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Form</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF6F0]">
              Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-semibold text-white">Mon – Fri</p>
                <p className="text-[#A89F95]">9:00 AM – 8:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-white">Sat – Sun</p>
                <p className="text-[#A89F95]">8:00 AM – 9:00 PM</p>
              </div>
              <p className="text-[11px] text-[#A8BBA2] pt-1">
                Breakfast served daily until 1:00 PM
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Placeholders (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF6F0]">
              Connect (Demo)
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#FAF6F0] font-mono">
                {CAFE_CONFIG.contact.phoneDisplay}
              </p>
              <p className="text-[#A89F95] text-[11px]">
                Illustrative contact number
              </p>
              <p className="text-[#FAF6F0]">
                {CAFE_CONFIG.contact.address}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-[#3D2C22] text-[#A8BBA2]">
                  Weblith Studio Portfolio Concept
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Agency Attribution & Disclaimer Block */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-xl bg-[#281C15] border border-[#3D2C22] text-xs text-[#A89F95] leading-relaxed">
            <strong className="text-[#FAF6F0]">Concept Demonstration Disclaimer:</strong>{' '}
            Slow Mornings Cafe is a fictional brand concept and website experience engineered by{' '}
            <a
              href={CAFE_CONFIG.brand.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAF6F0] font-semibold underline underline-offset-2 hover:text-[#A8BBA2]"
            >
              Weblith Studio
            </a>
            . All menu items, pricing figures in INR (₹), physical locations, opening schedules, and telephone digits are illustrative samples designed exclusively for portfolio demonstration. No live bookings or order fulfillments are processed.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7D73] gap-3 pt-2">
            <p>
              © {currentYear} Slow Mornings Cafe. Website concept by{' '}
              <a
                href={CAFE_CONFIG.brand.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF6F0] hover:text-[#A8BBA2] font-semibold transition-colors"
              >
                Weblith Studio
              </a>
              .
            </p>

            <a
              href={CAFE_CONFIG.brand.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Designed & Built by Weblith Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
