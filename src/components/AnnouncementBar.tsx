import React, { useState } from 'react';
import { ExternalLink, Info, X } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export const AnnouncementBar: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative bg-[#281C15] text-[#FAF6F0] text-xs font-medium tracking-wider z-50 border-b border-[#3D2C22]">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#A8BBA2] animate-pulse" />
          <span className="font-semibold uppercase text-[#E8DFD5] tracking-widest text-[11px] sm:text-xs">
            CONCEPT DEMO · By {CAFE_CONFIG.brand.createdBy}
          </span>
          <span className="hidden sm:inline text-[#A89F95]">|</span>
          <span className="hidden md:inline text-[#D8CCC0] font-light">
            Illustrative boutique cafe website showcase
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs ml-auto">
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-1.5 text-[#D8CCC0] hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            aria-label="Toggle demo information"
          >
            <Info className="w-3.5 h-3.5 text-[#A8BBA2]" />
            <span className="hidden xs:inline">About Demo</span>
          </button>

          <a
            href={CAFE_CONFIG.brand.agencyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3D2C22] hover:bg-[#503A2D] text-[#FAF6F0] transition-colors border border-[#503A2D] text-[11px] font-medium"
          >
            <span>Visit Weblith Studio</span>
            <ExternalLink className="w-3 h-3 text-[#A8BBA2]" />
          </a>
        </div>
      </div>

      {showInfo && (
        <div className="bg-[#1E140E] border-t border-[#3D2C22] px-4 py-3 text-xs text-[#D8CCC0] animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
            <p className="leading-relaxed">
              <strong className="text-[#FAF6F0] font-medium">Portfolio Concept Note:</strong>{' '}
              Slow Mornings Cafe is a fictional brand experience designed to demonstrate modern cafe digital presence, responsive menu filtering, and customer touchpoints. All prices, phone numbers, and addresses are illustrative.
            </p>
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="p-1 text-[#A89F95] hover:text-white rounded"
              aria-label="Close demo details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
