/*'use client';

import { useState } from 'react';

const categories = ['All', 'Coffee', 'Tea', 'Dessert', 'Breakfast', 'Sandwich', 'Cake'];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="bg-[#f8f1e9] border-b sticky top-0 z-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200
                ${activeCategory === category 
                  ? 'bg-primary text-white shadow-md scale-105' 
                  : 'bg-bg-card hover:bg-[#f0e6d9] text-text-primary border border-[#d4b89e]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}*/
'use client';

import { useState } from 'react';

const categories = [
  'All',
  'Coffee',
  'Tea',
  'Dessert',
  'Breakfast',
  'Sandwich',
  'Cake'
];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="bg-bg-main border-b border-border sticky top-0 z-10 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200
                ${
                  activeCategory === category
                    ? 'bg-primary text-text-light shadow-card scale-105'
                    : 'bg-bg-card hover:bg-bg-muted text-text-primary border border-border'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}