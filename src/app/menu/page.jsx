'use client';

import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";
//import MenuList from "@/components/MenuList";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <CategoryFilter />
      <SearchBar />
     
    </div>
  );
}