

'use client';
import { useState } from 'react';

const categories = ['All', 'Coffee', 'Tea', 'Dessert', 'Breakfast', 'Sandwich', 'Cake'];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="sticky top-0 h-fit w-48 border-r" style={{ backgroundColor: '#FFFFFF', borderColor: '#EDE0D4' }}>
      <div className="flex flex-col gap-3 px-4 py-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={
              activeCategory === category
                ? { backgroundColor: '#5C3D2E', color: '#EDE0D4', borderColor: '#957261', transform: 'scale(1.05)' }
                : { backgroundColor: '#FFFFFF', color: '#1F0F07', borderColor: '#D4B9A5' }
            }
            className="px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 text-left border hover:opacity-80"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}