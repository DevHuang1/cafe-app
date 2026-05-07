'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#f8f1e9] border-b py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search our menu... (Cappuccino, Croissant, etc.)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 bg-white border border-[#d4b89e] rounded-2xl focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/20 text-lg placeholder:text-[#9c7c5f]"
            />
          </div>
          
          <button
            onClick={handleSearch}
            className="bg-[#6F4E37] hover:bg-[#5A3F2C] text-white px-10 py-4 rounded-2xl font-medium transition-all flex items-center gap-2 shadow-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}