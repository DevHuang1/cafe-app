

'use client';
import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="border-b py-8" style={{ backgroundColor: '#EDE0D4', borderColor: '#D4B9A5' }}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#D4B9A5',
                color: '#1F0F07',
              }}
              className="w-full px-6 py-4 border rounded-2xl focus:outline-none text-lg placeholder:text-[#957261] focus:ring-2 focus:ring-[#957261]/30"
            />
          </div>
          <button
            onClick={handleSearch}
            style={{ backgroundColor: '#5C3D2E', color: '#EDE0D4', borderColor: '#957261' }}
            className="border px-10 py-4 rounded-2xl font-semibold transition-all duration-150 shadow-md hover:brightness-110 hover:scale-105 active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
