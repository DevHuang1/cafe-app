'use client';   

import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilter />
      <SearchBar />
    
    </div>
  );
}
