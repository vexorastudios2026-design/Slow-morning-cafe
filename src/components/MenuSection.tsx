import React, { useState, useMemo } from 'react';
import { Search, Sparkles, MessageCircle, AlertCircle, Check } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/menuData';
import { filterMenuItems, formatINR } from '../utils/cafeLogic';

interface MenuSectionProps {
  onItemEnquire: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onItemEnquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return filterMenuItems(MENU_ITEMS, selectedCategory, searchQuery, dietaryFilter);
  }, [selectedCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F6F0E8] border-y border-[#E8DFD5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7E8B76] mb-2 block">
            Handcrafted Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#281C15] tracking-tight">
            Crafted for Unhurried Moments
          </h2>
          <p className="mt-4 text-base text-[#6E6259] leading-relaxed">
            From calibrated double-shots to slow-simmered spiced chai and morning bakes fresh from the stone oven. Take a moment to browse our staple selection.
          </p>

          {/* Illustrative Disclaimer Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DFD5] text-xs text-[#503A2D] font-medium border border-[#D8CCC0]">
            <AlertCircle className="w-3.5 h-3.5 text-[#7E8B76]" />
            <span>Illustrative Menu: All items and prices (in INR ₹) are concept demonstrations.</span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-6 mb-12">
          {/* Main Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3" role="tablist">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7E8B76] ${
                    isSelected
                      ? 'bg-[#281C15] text-[#FAF6F0] shadow-md scale-105'
                      : 'bg-[#FAF6F0] text-[#6E6259] hover:bg-[#E8DFD5] hover:text-[#281C15] border border-[#E8DFD5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search and Dietary filters */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8A7D73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search coffee, tea, bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-sm text-[#281C15] placeholder:text-[#9B8F85] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7D73] hover:text-[#281C15] font-bold"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center w-full md:w-auto">
              <span className="text-xs text-[#8A7D73] font-medium mr-1">Filter:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'specialty', label: 'Specialty Roast' },
                { id: 'bestseller', label: 'House Bestseller' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  type="button"
                  onClick={() => setDietaryFilter(diet.id)}
                  className={`text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    dietaryFilter === diet.id
                      ? 'bg-[#7E8B76] text-white shadow-sm'
                      : 'bg-[#FAF6F0] text-[#6E6259] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#8A7D73] mb-6 px-2">
          <span>
            Showing <strong className="text-[#281C15]">{filteredItems.length}</strong> items
            {selectedCategory !== 'all' && ` in ${MENU_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
          </span>
          {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="text-[#7E8B76] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] p-8 max-w-lg mx-auto">
            <p className="font-serif text-xl font-semibold text-[#281C15]">No offerings match your search</p>
            <p className="text-sm text-[#6E6259] mt-2">
              Try adjusting your search query or clearing dietary filters to explore our full menu.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-5 px-5 py-2 rounded-full bg-[#281C15] text-[#FAF6F0] text-xs font-semibold hover:bg-[#3D2C22] transition-colors"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Item Image with tags */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E8DFD5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Category pill */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#281C15]/80 backdrop-blur-sm text-[#FAF6F0] text-[10px] uppercase font-semibold tracking-wider">
                      {item.categoryLabel}
                    </span>

                    {/* Dietary or Bestseller badge */}
                    {item.dietary?.includes('bestseller') && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#7E8B76] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                        Bestseller
                      </span>
                    )}
                    {item.dietary?.includes('specialty') && !item.dietary?.includes('bestseller') && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#C86D51] text-white text-[10px] uppercase font-bold tracking-wider shadow">
                        Specialty
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#281C15] group-hover:text-[#503A2D] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-sans font-bold text-lg text-[#281C15] shrink-0 bg-[#E8DFD5]/60 px-2.5 py-0.5 rounded-lg border border-[#D8CCC0]">
                        {formatINR(item.price)}
                      </span>
                    </div>

                    <p className="text-sm text-[#6E6259] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting notes or prep tag */}
                    {item.tastingNotes && (
                      <div className="mt-3.5 pt-3 border-t border-[#EFE8DF] flex items-center gap-1.5 text-xs text-[#7E8B76]">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span className="italic truncate">{item.tastingNotes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#EFE8DF] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItemForDetail(item)}
                    className="text-xs font-semibold text-[#503A2D] hover:text-[#281C15] underline-offset-4 hover:underline cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => onItemEnquire(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8DFD5] hover:bg-[#D8CCC0] text-[#281C15] text-xs font-medium transition-colors cursor-pointer"
                    aria-label={`Enquire about ${item.name} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#7E8B76]" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal for Item Details */}
      {selectedItemForDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedItemForDetail(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#FAF6F0] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DFD5] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-[#E8DFD5]">
              <img
                src={selectedItemForDetail.image}
                alt={selectedItemForDetail.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedItemForDetail(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#7E8B76]">
                  {selectedItemForDetail.categoryLabel}
                </span>
                <span className="font-bold text-xl text-[#281C15] bg-[#E8DFD5] px-3 py-1 rounded-lg">
                  {formatINR(selectedItemForDetail.price)}
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#281C15] mb-2">
                {selectedItemForDetail.name}
              </h3>

              <p className="text-sm text-[#6E6259] leading-relaxed mb-4">
                {selectedItemForDetail.description}
              </p>

              {selectedItemForDetail.tastingNotes && (
                <div className="p-3 bg-[#EFE8DF] rounded-xl mb-4 text-xs text-[#503A2D]">
                  <strong className="font-semibold block mb-1">Tasting Notes & Profile:</strong>
                  {selectedItemForDetail.tastingNotes}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5]">
                <span className="text-[11px] text-[#8A7D73]">Sample illustrative pricing</span>
                <button
                  type="button"
                  onClick={() => {
                    const item = selectedItemForDetail;
                    setSelectedItemForDetail(null);
                    onItemEnquire(item);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7E8B76] hover:bg-[#687660] text-white text-xs font-semibold shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
