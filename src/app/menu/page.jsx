'use client';

import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#f8f1e9]">
      <CategoryFilter />
      <SearchBar />
      {/* MenuList will go here later */}
    </div>
  );
}