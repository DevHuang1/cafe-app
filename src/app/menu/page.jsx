"use client";
import FeaturedMenu from "@/components/Cart/FeaturedMenu";
import CategoryFilter from "@/components/Menu/CategoryFilter";
import SearchBar from "@/components/Menu/SearchBar";
import MenuList from "@/components/MenuList";

export default function Page() {
  return (
    <div>
      <MenuList />
    </div>
  );
}

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
          <FeaturedMenu />
        </main>
      </div>
    </div>
  );
}
