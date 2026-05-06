'use client';

import { useState } from 'react';
import { TextInput, Button } from '@mantine/core';   // or use Tailwind only if you prefer

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Later we will connect to API
  };

  return (
    <div className="flex gap-2 p-4 bg-white shadow-sm">
      <TextInput
        placeholder="Search menu items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}