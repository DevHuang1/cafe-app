
'use client';
import { useState } from 'react';
import FeaturedMenu from "@/components/Cart/FeaturedMenu";
import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-bg-main">
      <SearchBar />

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-56 lg:shrink-0">
          <CategoryFilter 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>

        <main className="flex-1 p-4 md:p-8">
          <FeaturedMenu activeCategory={activeCategory} />
        </main>
      </div>
    </div>
  );
}