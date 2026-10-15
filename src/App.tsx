/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { OurStory } from './components/OurStory';
import { CoffeeRitualFinder } from './components/CoffeeRitualFinder';
import { GallerySection } from './components/GallerySection';
import { VisitUs } from './components/VisitUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { BackToTop } from './components/BackToTop';
import type { MenuItem } from './data/menuData';
import { formatINR } from './utils/cafeLogic';

export default function App() {
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [whatsAppCustomMessage, setWhatsAppCustomMessage] = useState<string | undefined>(undefined);

  const handleOpenWhatsApp = (customMessage?: string) => {
    setWhatsAppCustomMessage(customMessage);
    setWhatsAppModalOpen(true);
  };

  const handleCloseWhatsApp = () => {
    setWhatsAppModalOpen(false);
    setWhatsAppCustomMessage(undefined);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleItemEnquire = (item: MenuItem) => {
    const message = `Hello Slow Mornings Cafe! I'm interested in trying the ${item.name} (${formatINR(item.price)}). Could you tell me more about today's fresh batch / availability?`;
    handleOpenWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#281C15] flex flex-col font-sans selection:bg-[#E8DFD5] selection:text-[#281C15]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navigation */}
      <Navbar onOpenWhatsApp={() => handleOpenWhatsApp()} />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreMenu={handleExploreMenu}
          onOpenWhatsApp={() => handleOpenWhatsApp()}
        />

        {/* 4. Menu Section */}
        <MenuSection onItemEnquire={handleItemEnquire} />

        {/* 5. Our Story Section */}
        <OurStory />

        {/* Interactive Coffee Ritual Selector */}
        <CoffeeRitualFinder
          onSelectRecommendedItem={handleItemEnquire}
          onOpenWhatsApp={handleOpenWhatsApp}
        />

        {/* 6. Gallery Section with Lightbox */}
        <GallerySection />

        {/* 7. Visit Us Section */}
        <VisitUs onOpenWhatsApp={() => handleOpenWhatsApp()} />

        {/* 8. Contact Section */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. WhatsApp Enquiry Modal */}
      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={handleCloseWhatsApp}
        customMessage={whatsAppCustomMessage}
      />

      {/* 11. Back to Top Button */}
      <BackToTop />
    </div>
  );
}
