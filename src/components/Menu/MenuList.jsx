"use client";

import { useState } from "react";
import MenuItemCard from "./MenuItemCard";

const menuItems = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 4500, image: "https://picsum.photos/id/106/400/300" },
  { id: 2, name: "Latte", category: "Coffee", price: 4800, image: "https://picsum.photos/id/201/400/300" },
  { id: 3, name: "Americano", category: "Coffee", price: 3800, image: "https://picsum.photos/id/292/400/300" },
  { id: 4, name: "Mocha", category: "Coffee", price: 5500, image: "https://picsum.photos/id/431/400/300" },
  { id: 5, name: "Thai Tea", category: "Tea", price: 4200, image: "https://picsum.photos/id/669/400/300" },
  { id: 6, name: "Green Tea", category: "Tea", price: 3500, image: "https://picsum.photos/id/870/400/300" },
  { id: 7, name: "Earl Grey", category: "Tea", price: 3800, image: "https://picsum.photos/id/1015/400/300" },
  { id: 8, name: "Avocado Toast", category: "Breakfast", price: 5900, image: "https://picsum.photos/id/201/400/300" },
  { id: 9, name: "Butter Croissant", category: "Breakfast", price: 3200, image: "https://picsum.photos/id/1060/400/300" },
  { id: 10, name: "Egg Benedict", category: "Breakfast", price: 6800, image: "https://picsum.photos/id/292/400/300" },
  { id: 11, name: "Chicken Sandwich", category: "Sandwich", price: 6500, image: "https://picsum.photos/id/431/400/300" },
  { id: 12, name: "Tuna Sandwich", category: "Sandwich", price: 6200, image: "https://picsum.photos/id/669/400/300" },
  { id: 13, name: "Chocolate Brownie", category: "Dessert", price: 4200, image: "https://picsum.photos/id/870/400/300" },
  { id: 14, name: "Classic Cheesecake", category: "Cake", price: 5800, image: "https://picsum.photos/id/1015/400/300" },
  { id: 15, name: "Tiramisu", category: "Dessert", price: 6500, image: "https://picsum.photos/id/106/400/300" },
  { id: 16, name: "Red Velvet Cake", category: "Cake", price: 6200, image: "https://picsum.photos/id/201/400/300" },
  { id: 17, name: "Mango Smoothie", category: "Beverage", price: 5200, image: "https://picsum.photos/id/292/400/300" },
  { id: 18, name: "Iced Lemon Tea", category: "Tea", price: 4000, image: "https://picsum.photos/id/431/400/300" },
];

const categories = ["All", "Coffee", "Tea", "Dessert", "Breakfast", "Sandwich", "Cake"];

export default function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f1e3]">
      {/* Category Tabs */}
      <div className="sticky top-0 bg-[#f8f1e3] border-b border-[#e8d9c7] z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#4a2f1f] text-white"
                    : "bg-white border border-[#e8d9c7] text-gray-700 hover:bg-[#f5e8d3]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search our menu... (Cappuccino, Croissant, etc.)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-3 rounded-2xl border border-[#e8d9c7] bg-white focus:outline-none focus:border-[#8B5A2B]"
          />
          <button className="bg-[#4a2f1f] text-white px-8 rounded-2xl font-medium hover:bg-[#3a2518] transition">
            Search
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No menu items found.
          </p>
        )}
      </div>
    </div>
  );
}