/**
 * Pure helper and business logic functions for Slow Mornings Cafe
 * Unit-testable and decoupled from UI components.
 */

import type { MenuItem } from '../data/menuData';

export interface ContactFormData {
  fullName: string;
  email: string;
  enquiryType: string;
  message: string;
  preferredDate?: string;
  partySize?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  const trimmedName = (data.fullName || '').trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  const trimmedEmail = (data.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  const trimmedType = (data.enquiryType || '').trim();
  if (!trimmedType) {
    errors.enquiryType = 'Please select an enquiry type.';
  }

  const trimmedMessage = (data.message || '').trim();
  if (!trimmedMessage) {
    errors.message = 'Please share a brief note or question.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface HoursConfig {
  weekdayOpen: number; // e.g. 9
  weekdayClose: number; // e.g. 20
  weekendOpen: number; // e.g. 8
  weekendClose: number; // e.g. 21
}

export interface OpenStatusResult {
  isOpen: boolean;
  statusText: string;
  subtext: string;
  isClosingSoon: boolean;
}

export function getCafeOpenStatus(
  currentDate: Date,
  hours: HoursConfig = {
    weekdayOpen: 9,
    weekdayClose: 20,
    weekendOpen: 8,
    weekendClose: 21,
  }
): OpenStatusResult {
  const day = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = day === 0 || day === 6;
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentTimeDecimal = currentHour + currentMinute / 60;

  const openTime = isWeekend ? hours.weekendOpen : hours.weekdayOpen;
  const closeTime = isWeekend ? hours.weekendClose : hours.weekdayClose;

  const isOpen = currentTimeDecimal >= openTime && currentTimeDecimal < closeTime;
  const isClosingSoon = isOpen && (closeTime - currentTimeDecimal <= 1.0);

  if (isOpen) {
    if (isClosingSoon) {
      const minutesLeft = Math.max(1, Math.round((closeTime - currentTimeDecimal) * 60));
      return {
        isOpen: true,
        isClosingSoon: true,
        statusText: 'Closing Soon',
        subtext: `Open now · Closes in ${minutesLeft} mins at ${format12Hour(closeTime)}`,
      };
    }
    return {
      isOpen: true,
      isClosingSoon: false,
      statusText: 'Open for Coffee & Bakes',
      subtext: `Welcoming guests until ${format12Hour(closeTime)} today`,
    };
  }

  // Currently closed
  let opensNextTime: string;
  if (currentTimeDecimal < openTime) {
    opensNextTime = `Opens today at ${format12Hour(openTime)}`;
  } else {
    // Tomorrow's open time
    const nextDayIsWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 6;
    const nextOpen = nextDayIsWeekend ? hours.weekendOpen : hours.weekdayOpen;
    opensNextTime = `Opens tomorrow at ${format12Hour(nextOpen)}`;
  }

  return {
    isOpen: false,
    isClosingSoon: false,
    statusText: 'Currently Resting',
    subtext: `Closed now · ${opensNextTime}`,
  };
}

export function format12Hour(hour24: number): string {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${period}`;
}

export function isPhonePlaceholder(phoneNumber: string): boolean {
  if (!phoneNumber) return true;
  const digits = phoneNumber.replace(/\D/g, '');
  // Matches all zeroes like 0000000000 or repetitive dummy numbers
  return /^0+$/.test(digits) || digits.length < 10 || digits.includes('000000');
}

export function buildWhatsAppUrl(
  phoneDigits: string,
  message: string
): { url: string; isPlaceholder: boolean } {
  const cleanPhone = phoneDigits.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(message.trim());
  const isPlaceholder = isPhonePlaceholder(cleanPhone);

  const url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  return { url, isPlaceholder };
}

export function filterMenuItems(
  items: MenuItem[],
  category: string,
  searchQuery: string = '',
  dietaryFilter: string = 'all'
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // Category match
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Dietary match
    if (dietaryFilter !== 'all') {
      if (!item.dietary || !item.dietary.includes(dietaryFilter as any)) {
        return false;
      }
    }

    // Search query match
    if (normalizedQuery) {
      const matchName = item.name.toLowerCase().includes(normalizedQuery);
      const matchDesc = item.description.toLowerCase().includes(normalizedQuery);
      const matchNotes = item.tastingNotes ? item.tastingNotes.toLowerCase().includes(normalizedQuery) : false;
      if (!matchName && !matchDesc && !matchNotes) {
        return false;
      }
    }

    return true;
  });
}

export function formatINR(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
