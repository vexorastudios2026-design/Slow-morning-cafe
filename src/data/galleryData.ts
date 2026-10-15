export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'coffee' | 'bakery' | 'breakfast' | 'brewing';
  categoryLabel: string;
  image: string;
  alt: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'latte-art-rosetta',
    title: 'Artisan Rosetta Pour',
    category: 'coffee',
    categoryLabel: 'Latte Art',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    alt: 'Barista pouring delicate rosetta latte art into a ceramic cup',
    caption: 'Every morning cup begins with freshly ground beans and steamed silky micro-foam poured with steady hands.',
  },
  {
    id: 'morning-bakery-spread',
    title: 'Warm Morning Pastries',
    category: 'bakery',
    categoryLabel: 'Pastries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
    alt: 'Golden flaky croissants and pain au chocolat cooling on wooden boards',
    caption: 'Laminated by hand and baked before sunrise to meet the first morning light.',
  },
  {
    id: 'cafe-interior-corner',
    title: 'The Sunlit Reading Nook',
    category: 'interior',
    categoryLabel: 'Cafe Interiors',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
    alt: 'Warm cafe interior with timber tables, linen cushions, and soft morning sunlight',
    caption: 'Spacious seating, natural daylight, soft acoustic tunes, and quiet spaces designed for lingering.',
  },
  {
    id: 'pour-over-brewing',
    title: 'Slow V60 Pour-Over Ritual',
    category: 'brewing',
    categoryLabel: 'Coffee Brewing',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    alt: 'Barista brewing specialty single-origin coffee with a goose-neck kettle and glass dripper',
    caption: 'Precision water temperature at 92°C highlighting floral aromas and crisp fruit acidity.',
  },
  {
    id: 'breakfast-table-spread',
    title: 'Weekend Breakfast Table',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85',
    alt: 'Table filled with sourdough avocado toast, fresh orange juice, and hot cappuccino',
    caption: 'Wholesome nourishing plates prepared with fresh seasonal produce and pantry staples.',
  },
  {
    id: 'artisanal-dessert',
    title: 'Dark Ganache & Berry Tart',
    category: 'bakery',
    categoryLabel: 'Desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85',
    alt: 'Decadent chocolate dessert served on an earthy ceramic plate',
    caption: 'Indulgent treats crafted to pair effortlessly with an afternoon espresso or cold brew.',
  },
  {
    id: 'espresso-machine-bar',
    title: 'The Espresso Station',
    category: 'brewing',
    categoryLabel: 'Cafe Interiors',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Vintage copper and chrome commercial espresso machine in warm cafe lighting',
    caption: 'Our brass and chrome heart, pulsing with the gentle rhythm of ground coffee and steam.',
  },
  {
    id: 'pancake-stack-syrup',
    title: 'Fluffy Golden Pancakes',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=85',
    alt: 'Tower of fluffy buttermilk pancakes drizzled with amber maple syrup and butter',
    caption: 'Golden-brown comfort on slow weekend mornings, topped with whipped butter and maple syrup.',
  },
];
