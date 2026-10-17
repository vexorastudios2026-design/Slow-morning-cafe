/**
 * Central Configuration for Slow Mornings Cafe
 * Created as a portfolio concept demo by Weblith Studio.
 *
 * All business contact details and placeholders are maintained here
 * in one clearly identified location.
 */

export interface CafeConfig {
  brand: {
    name: string;
    tagline: string;
    heroHeadline: string;
    heroSubtext: string;
    storyHeadline: string;
    createdBy: string;
    agencyUrl: string;
    isConceptDemo: boolean;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    isPhonePlaceholder: boolean;
    address: string;
    city: string;
    state: string;
    country: string;
    isAddressIllustrative: boolean;
    email: string;
    isEmailPlaceholder: boolean;
  };
  hours: {
    weekday: string;
    weekend: string;
    weekdayOpen: number; // 9:00 AM (24-hr format)
    weekdayClose: number; // 20:00 (8:00 PM)
    weekendOpen: number; // 8:00 AM
    weekendClose: number; // 21:00 (9:00 PM)
    timezone: string;
  };
  whatsapp: {
    phoneNumber: string; // Placeholder digits only
    isConfigured: boolean; // Set to false to trigger graceful demo guidance modal
    defaultMessage: string;
  };
  socials: {
    instagram: string;
    agencyInstagram: string;
  };
}

export const CAFE_CONFIG: CafeConfig = {
  brand: {
    name: "Slow Mornings Cafe",
    tagline: "Specialty Coffee & Gentle Mornings",
    heroHeadline: "Make Room for Slow Mornings.",
    heroSubtext:
      "A serene corner for handcrafted specialty coffee, wholesome artisanal breakfasts, and the gentle art of taking your time.",
    storyHeadline: "A Little Slower. A Little Better.",
    createdBy: "Weblith Studio",
    agencyUrl: "https://www.instagram.com/weblithstudios2026/",
    isConceptDemo: true,
  },
  contact: {
    phoneDisplay: "+91 00000 00000",
    phoneRaw: "+910000000000",
    isPhonePlaceholder: true,
    address: "XYZ",
    city: "XYZ",
    state: "XYZ",
    country: "India",
    isAddressIllustrative: true,
    email: "hello@slowmornings.demo",
    isEmailPlaceholder: true,
  },
  hours: {
    weekday: "Monday – Friday: 9 AM – 8 PM",
    weekend: "Saturday – Sunday: 8 AM – 9 PM",
    weekdayOpen: 9,
    weekdayClose: 20,
    weekendOpen: 8,
    weekendClose: 21,
    timezone: "Asia/Kolkata",
  },
  whatsapp: {
    // Demo placeholder phone number
    phoneNumber: "910000000000",
    // Marked as false so clicking displays the helpful demo enquiry helper
    isConfigured: false,
    defaultMessage:
      "Hello Slow Mornings Cafe! I'm interested in reserving a cozy table or learning more about your coffee brews.",
  },
  socials: {
    instagram: "https://www.instagram.com/weblithstudios2026/",
    agencyInstagram: "https://www.instagram.com/weblithstudios2026/",
  },
};
