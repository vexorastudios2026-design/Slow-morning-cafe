import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  getCafeOpenStatus,
  format12Hour,
  isPhonePlaceholder,
  buildWhatsAppUrl,
  filterMenuItems,
  formatINR,
} from './cafeLogic.ts';
import type { MenuItem } from '../data/menuData.ts';

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.enquiryType);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid emails', () => {
  const result = validateContactForm({
    fullName: 'Aarav Sharma',
    email: 'not-an-email',
    enquiryType: 'Table Reservation',
    message: 'We would love a corner table for 2 tomorrow morning.',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please provide a valid email address.');
  assert.equal(result.errors.fullName, undefined);
});

test('validateContactForm accepts valid complete submissions', () => {
  const result = validateContactForm({
    fullName: 'Priya Mehra',
    email: 'priya@example.com',
    enquiryType: 'Private Event',
    message: 'Looking to host a small birthday breakfast gathering for 6 guests.',
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('getCafeOpenStatus correctly identifies weekday open and closed periods', () => {
  const hours = { weekdayOpen: 9, weekdayClose: 20, weekendOpen: 8, weekendClose: 21 };

  // Wednesday at 11:30 AM -> should be open
  const wedOpen = new Date(2026, 9, 14, 11, 30); // Wed Oct 14
  const resOpen = getCafeOpenStatus(wedOpen, hours);
  assert.equal(resOpen.isOpen, true);
  assert.equal(resOpen.statusText, 'Open for Coffee & Bakes');

  // Wednesday at 19:30 (7:30 PM) -> closing soon within 1 hr
  const wedClosing = new Date(2026, 9, 14, 19, 30);
  const resClosing = getCafeOpenStatus(wedClosing, hours);
  assert.equal(resClosing.isOpen, true);
  assert.equal(resClosing.isClosingSoon, true);
  assert.equal(resClosing.statusText, 'Closing Soon');

  // Wednesday at 22:00 -> closed
  const wedClosed = new Date(2026, 9, 14, 22, 0);
  const resClosed = getCafeOpenStatus(wedClosed, hours);
  assert.equal(resClosed.isOpen, false);
});

test('format12Hour formats correctly', () => {
  assert.equal(format12Hour(9), '9:00 AM');
  assert.equal(format12Hour(12), '12:00 PM');
  assert.equal(format12Hour(20), '8:00 PM');
  assert.equal(format12Hour(21), '9:00 PM');
});

test('isPhonePlaceholder detects dummy placeholder patterns', () => {
  assert.equal(isPhonePlaceholder('+91 00000 00000'), true);
  assert.equal(isPhonePlaceholder('910000000000'), true);
  assert.equal(isPhonePlaceholder('0000000000'), true);
  assert.equal(isPhonePlaceholder('+91 98765 43210'), false);
});

test('buildWhatsAppUrl creates clean valid wa.me link and flags placeholder', () => {
  const dummyRes = buildWhatsAppUrl('910000000000', 'Hello Slow Mornings!');
  assert.equal(dummyRes.isPlaceholder, true);
  assert.ok(dummyRes.url.includes('wa.me/910000000000'));
  assert.ok(dummyRes.url.includes('text=Hello%20Slow%20Mornings!'));

  const realRes = buildWhatsAppUrl('919876543210', 'Hi');
  assert.equal(realRes.isPlaceholder, false);
});

test('filterMenuItems filters by category, query and dietary tags', () => {
  const sampleItems: MenuItem[] = [
    {
      id: 'espresso',
      name: 'Espresso',
      category: 'coffee',
      categoryLabel: 'Coffee',
      price: 120,
      description: 'Double shot single-origin',
      dietary: ['vegan', 'specialty'],
      image: '',
    },
    {
      id: 'cappuccino',
      name: 'Cappuccino',
      category: 'coffee',
      categoryLabel: 'Coffee',
      price: 180,
      description: 'Velvety micro-foam',
      dietary: ['vegetarian', 'bestseller'],
      image: '',
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      category: 'breakfast',
      categoryLabel: 'Breakfast',
      price: 260,
      description: 'Artisan sourdough',
      dietary: ['vegan'],
      image: '',
    },
  ];

  // Category filter
  const coffeeOnly = filterMenuItems(sampleItems, 'coffee');
  assert.equal(coffeeOnly.length, 2);

  // Search filter
  const searchAvo = filterMenuItems(sampleItems, 'all', 'avocado');
  assert.equal(searchAvo.length, 1);
  assert.equal(searchAvo[0].id, 'avocado-toast');

  // Dietary filter
  const veganOnly = filterMenuItems(sampleItems, 'all', '', 'vegan');
  assert.equal(veganOnly.length, 2);
});

test('formatINR formats currency with rupee symbol', () => {
  assert.equal(formatINR(120), '₹120');
  assert.equal(formatINR(1500), '₹1,500');
});
