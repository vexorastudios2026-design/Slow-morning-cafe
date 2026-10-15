import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#281C15] text-[#FAF6F0] shadow-xl hover:bg-[#3D2C22] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#503A2D] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] cursor-pointer"
      aria-label="Scroll back to top of page"
    >
      <ArrowUp className="w-5 h-5 text-[#D8CCC0]" />
    </button>
  );
};
