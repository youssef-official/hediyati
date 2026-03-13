import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { cn } from '../lib/utils';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const activeCategory = searchParams.get('category') || 'All';

  const categories = ['All', 'Accessories', 'Gift Boxes', 'Personalized', 'Makeup'];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold">Our Collection</h1>
          <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-secondary rounded-xl font-medium hover:bg-accent transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="relative flex-1 sm:flex-none">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-6 py-3 bg-secondary rounded-xl font-medium focus:outline-none pr-10"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={cn(
          "lg:w-64 space-y-8",
          isFilterOpen ? "block" : "hidden lg:block"
        )}>
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                  className={cn(
                    "text-left px-4 py-2 rounded-lg transition-all",
                    activeCategory === cat 
                      ? "bg-primary text-white font-bold" 
                      : "hover:bg-accent text-muted-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>0 EGP</span>
                <span>5,000 EGP</span>
              </div>
              <input type="range" className="w-full accent-primary" min="0" max="5000" />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}