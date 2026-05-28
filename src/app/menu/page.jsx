'use client';
import { useState } from 'react';
import FeaturedMenu from "@/components/Cart/FeaturedMenu";
import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: '#FDFCFB' }}>

      {/* Search bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Mobile category pills */}
      <div className="lg:hidden sticky z-30" style={{ top: '132px' }}>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          mobile
        />
      </div>

      {/* Page layout */}
      <div className="flex">

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-56 shrink-0">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-8">

          {/* Animated heading */}
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.22em] text-[#C08A5D] font-semibold mb-3"
              style={{ animation: 'fadeUp 0.6s ease both' }}>
              Handcrafted with love
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3E2723]"
              style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}>
              Our{' '}
              <span className="text-[#8B5E3C]">Featured</span>{' '}
              Menu
            </h1>
            <p className="mt-3 text-[#957261] text-base"
              style={{ animation: 'fadeUp 0.6s ease 0.2s both' }}>
              Using the finest ingredients, brewed to perfection
            </p>
            <div className="mt-5 flex items-center justify-center gap-3"
              style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4A882]" />
              <span className="text-[#C4A882] text-lg">☕</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4A882]" />
            </div>
          </div>

          {/* Active category badge */}
          <div className="flex items-center gap-3 mb-6"
            style={{ animation: 'fadeUp 0.5s ease 0.4s both' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(139,94,60,0.1)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.2)' }}>
              <span>✦</span>
              <span>{activeCategory === 'All' ? 'All Items' : activeCategory}</span>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(192,138,93,0.1)', color: '#C08A5D', border: '1px solid rgba(192,138,93,0.2)' }}>
                <span>🔍</span>
                <span>&ldquo;{searchTerm}&rdquo;</span>
              </div>
            )}
          </div>

          <FeaturedMenu
            activeCategory={activeCategory}
            searchTerm={searchTerm}
          />
        </main>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}