import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  Star, 
  Sparkles, 
  Plus, 
  SlidersHorizontal,
  Leaf,
  Beef,
  Coffee
} from 'lucide-react';
import { MenuItem, MENU_CATEGORIES, MenuCategoryType } from '../data/menuData';

interface MenuSectionProps {
  items: MenuItem[];
  searchQuery: string;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  searchQuery,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('All');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [chefSpecialOnly, setChefSpecialOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  // Filter & Search Logic
  const filteredItems = items.filter((item) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // Category
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // Veg / Non-Veg
    if (vegFilter === 'veg' && !item.isVeg) return false;
    if (vegFilter === 'non-veg' && item.isVeg) return false;

    // Chef Special
    if (chefSpecialOnly && !item.isChefSpecial) return false;

    return true;
  });

  // Sort Logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Food Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" /> Freshly Prepared · Campus Cafeteria Kitchen
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Craving Handcrafted Burgers, Artisanal Pizzas &amp; Dum Biryani?
          </h1>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Order directly from your phone for instant counter pick-up or dining table service. 
            Backed by live kitchen status, telemetry metrics, and high-speed order processing.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Prep: 10-15 Mins
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Fresh Farm Ingredients
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9 Star Rated by Students
            </span>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Category Pills & Filter Controls */}
      <div className="space-y-4">
        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md scale-102'
                    : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-850'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Veg/Non-Veg, Chef's Special, and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {/* Dietary Buttons */}
            <div className="inline-flex rounded-lg bg-stone-900 border border-stone-800 p-0.5">
              <button
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  vegFilter === 'all' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  vegFilter === 'veg' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'text-stone-400 hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Veg Only
              </button>
              <button
                onClick={() => setVegFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  vegFilter === 'non-veg' ? 'bg-red-950/80 text-red-400 border border-red-800/60' : 'text-stone-400 hover:text-red-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" /> Non-Veg
              </button>
            </div>

            {/* Chef's Special Toggle */}
            <button
              onClick={() => setChefSpecialOnly(!chefSpecialOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                chefSpecialOnly
                  ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Chef’s Specials
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-900 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="recommended">Popular &amp; Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      {sortedItems.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-stone-900/40 rounded-2xl border border-stone-800">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No food items found</h3>
          <p className="text-stone-400 text-sm max-w-sm mx-auto">
            Try adjusting your search keywords or dietary filters to explore our full cafeteria menu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-900/90 rounded-2xl border border-stone-800/90 hover:border-stone-700 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              {/* Card Thumbnail Image */}
              <div 
                className="relative h-48 w-full overflow-hidden bg-stone-950 cursor-pointer"
                onClick={() => onSelectItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />

                {/* Dietary badge (Veg/Non-Veg dot) */}
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-800 flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-[11px] font-medium text-stone-200">
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-800 flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-[10px] text-stone-400 font-normal">({item.reviewsCount})</span>
                </div>

                {/* Bottom Overlay: Prep time & calories */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1 bg-stone-950/70 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-amber-400" /> {item.prepTimeMinutes} mins
                  </span>
                  <span className="bg-stone-950/70 px-2 py-0.5 rounded text-stone-400">
                    {item.calories} kcal
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="text-lg font-bold text-white tracking-tight hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Badges: Spice & Chef Special */}
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    {item.spicyLevel > 0 && (
                      <span className="flex items-center gap-0.5 text-orange-400 font-mono text-[11px]">
                        <Flame className="w-3 h-3" />
                        {'🌶️'.repeat(item.spicyLevel)}
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="text-[11px] text-amber-400 font-medium">
                        Chef’s Pick
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">Price</div>
                    <div className="text-xl font-bold font-mono text-white">₹{item.price}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold border border-stone-700/80 transition-colors cursor-pointer"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => onQuickAdd(item)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all active:scale-95 shadow-md cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
