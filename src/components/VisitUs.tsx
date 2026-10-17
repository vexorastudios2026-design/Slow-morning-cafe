import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';
import { getCafeOpenStatus } from '../utils/cafeLogic';

interface VisitUsProps {
  onOpenWhatsApp: () => void;
}

export const VisitUs: React.FC<VisitUsProps> = ({ onOpenWhatsApp }) => {
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const openStatus = getCafeOpenStatus(new Date(), CAFE_CONFIG.hours);

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7E8B76] mb-2 block">
            Welcoming You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281C15] tracking-tight">
            Visit Our XYZ Corner
          </h2>
          <p className="mt-4 text-base text-[#6E6259]">
            A quiet haven designed for slow mornings and peaceful afternoons. Here is where you can find our doors and table hours.
          </p>

          {/* Prominent Concept Notice */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8DFD5] border border-[#D8CCC0] text-xs text-[#503A2D]">
            <AlertCircle className="w-4 h-4 text-[#7E8B76] shrink-0" />
            <span>
              <strong>Concept Notice:</strong> Address and business contact details below are illustrative samples.
            </span>
          </div>
        </div>

        {/* 3 Main Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: Address */}
          <div className="bg-[#FAF6F0] p-8 rounded-2xl border border-[#E8DFD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] mb-6">
                <MapPin className="w-6 h-6 text-[#7E8B76]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#7E8B76] font-bold block mb-1">
                Illustrative Address
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#281C15] mb-3">
                Location
              </h3>
              <p className="text-base text-[#503A2D] font-medium leading-relaxed">
                {CAFE_CONFIG.contact.address}
              </p>
              <p className="text-xs text-[#8A7D73] mt-2">
                Sample portfolio address (XYZ)
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFD5]">
              <button
                type="button"
                onClick={() => setShowDirectionsModal(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#503A2D] hover:text-[#281C15] underline-offset-4 hover:underline cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#7E8B76]" />
                <span>Simulate Directions</span>
              </button>
            </div>
          </div>

          {/* Card 2: Hours & Live Status */}
          <div className="bg-[#FAF6F0] p-8 rounded-2xl border border-[#E8DFD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] mb-6">
                <Clock className="w-6 h-6 text-[#7E8B76]" />
              </div>
              
              {/* Dynamic Status Indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-2 bg-[#E8DFD5] text-[#281C15]">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                <span>{openStatus.statusText}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#281C15] mb-3">
                Cafe Hours
              </h3>
              
              <div className="space-y-2 text-sm text-[#503A2D]">
                <div className="flex justify-between py-1 border-b border-[#EFE8DF]">
                  <span className="font-medium text-[#281C15]">Monday – Friday</span>
                  <span className="font-semibold">9 AM – 8 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EFE8DF]">
                  <span className="font-medium text-[#281C15]">Saturday – Sunday</span>
                  <span className="font-semibold">8 AM – 9 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFD5] text-xs text-[#8A7D73]">
              {openStatus.subtext}
            </div>
          </div>

          {/* Card 3: Contact & Enquiries */}
          <div className="bg-[#FAF6F0] p-8 rounded-2xl border border-[#E8DFD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8DFD5] flex items-center justify-center text-[#503A2D] mb-6">
                <Phone className="w-6 h-6 text-[#7E8B76]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#7E8B76] font-bold block mb-1">
                Demo Helpline
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#281C15] mb-3">
                Enquiry Line
              </h3>
              <p className="text-lg font-bold text-[#281C15] font-mono tracking-wider">
                {CAFE_CONFIG.contact.phoneDisplay}
              </p>
              <p className="text-xs text-[#8A7D73] mt-2 leading-relaxed">
                Illustrative placeholder digits. Real inquiries connect through our portfolio design studio.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFD5]">
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#7E8B76] hover:bg-[#687660] text-white text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Atmosphere & Space Note */}
        <div className="bg-[#281C15] text-[#FAF6F0] rounded-2xl p-8 sm:p-10 border border-[#3D2C22] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#A8BBA2]">
                Courtyard Etiquette & Atmosphere
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                A Space for Soft Voices and Deep Focus
              </h3>
              <p className="text-sm text-[#D8CCC0] leading-relaxed max-w-2xl">
                We maintain quiet seating corners with high-speed guest Wi-Fi and warm natural daylight. Laptop work is welcome during weekdays, while weekend mornings are reserved for conversation, reading, and music.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="#menu"
                className="px-6 py-3 rounded-full bg-[#E8DFD5] hover:bg-white text-[#281C15] text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                View Morning Menu
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Simulated Directions Modal */}
      {showDirectionsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowDirectionsModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#FAF6F0] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8DFD5] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#7E8B76]" />
                <h4 className="font-serif text-xl font-bold text-[#281C15]">Location Notice</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowDirectionsModal(false)}
                className="p-1 rounded-md text-[#6E6259] hover:text-[#281C15]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#503A2D] leading-relaxed mb-4">
              <strong>Notice:</strong> As requested, this portfolio demonstration uses the illustrative address:
            </p>

            <div className="p-3 bg-[#E8DFD5] rounded-xl text-xs font-mono text-[#281C15] mb-4">
              {CAFE_CONFIG.contact.address}
            </div>

            <p className="text-xs text-[#6E6259] leading-relaxed mb-6">
              No real interactive map is invented or claimed to be verified. In a production client build, this card seamlessly embeds Google Maps Platform routing and geolocation.
            </p>

            <button
              type="button"
              onClick={() => setShowDirectionsModal(false)}
              className="w-full py-2.5 rounded-full bg-[#281C15] text-white text-xs font-semibold hover:bg-[#3D2C22] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
