
'use client';
import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      
      {/* Search bar full width at top */}
      <SearchBar />

      {/* Sidebar + Content side by side */}
      <div className="flex">
        
        {/* Category sidebar on the left */}
        <div className="w-48 shrink-0">
          <CategoryFilter />
        </div>

        {/* Main content on the right */}
        <main className="flex-1 p-8">
          {/* menu items go here */}
        </main>

      </div>
    </div>
  );
} 
