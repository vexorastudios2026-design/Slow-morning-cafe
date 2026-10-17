import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, MessageCircle } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

interface NavbarProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'menu', 'story', 'gallery', 'visit', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Our Story', href: '#story', id: 'story' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Visit Us', href: '#visit', id: 'visit' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD5]'
          : 'bg-[#FAF6F0] border-b border-[#EFE8DF]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#7E8B76] rounded-md px-1 py-1"
            aria-label="Slow Mornings Cafe Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#281C15] flex items-center justify-center text-[#FAF6F0] shadow-sm group-hover:bg-[#3D2C22] transition-colors">
              <Coffee className="w-5 h-5 text-[#D8CCC0] group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#281C15] group-hover:text-[#503A2D] transition-colors">
                {CAFE_CONFIG.brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#7E8B76] font-medium -mt-1">
                Specialty Coffee & Bakes
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none focus:ring-2 focus:ring-[#7E8B76] rounded ${
                    isActive
                      ? 'text-[#281C15] font-semibold'
                      : 'text-[#6E6259] hover:text-[#281C15]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7E8B76] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenWhatsApp()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7E8B76] hover:bg-[#687660] text-white text-xs md:text-sm font-medium tracking-wide transition-all shadow-sm hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E8B76] cursor-pointer"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-[#281C15] hover:bg-[#E8DFD5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7E8B76]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[112px] z-50 lg:hidden bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#FAF6F0] h-full shadow-2xl p-6 flex flex-col justify-between border-r border-[#E8DFD5] animate-slideRight"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] mb-6">
                <span className="font-serif text-lg font-semibold text-[#281C15]">Menu Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-[#6E6259] hover:text-[#281C15]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E8DFD5] text-[#281C15] font-semibold'
                          : 'text-[#503A2D] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DFD5] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#7E8B76] text-white font-medium text-sm shadow hover:bg-[#687660] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
              <div className="text-center text-xs text-[#8A7D73]">
                Concept demo · XYZ
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
