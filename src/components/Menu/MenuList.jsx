"use client";

import MenuItemCard from "./MenuItemCard";

const menuItems = [
  { id: 1,  name: "Cappuccino",        category: "Coffee",    price: 4500, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" },
  { id: 2,  name: "Latte",             category: "Coffee",    price: 4800, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600" },
  { id: 3,  name: "Americano",         category: "Coffee",    price: 3800, image: "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?w=600" },
  { id: 4,  name: "Mocha",             category: "Coffee",    price: 5500, image: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600" },

  { id: 5,  name: "Thai Tea",          category: "Tea",       price: 4200, image: "https://images.unsplash.com/photo-1644031995386-fe9665dc5b57?w=600" },
  { id: 6,  name: "Bubble Tea",        category: "Tea",       price: 3500, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600" },
  { id: 7,  name: "Milk Tea",          category: "Tea",       price: 3800, image: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=600" },

  { id: 8,  name: "Avocado Toast",     category: "Breakfast", price: 5900, image: "https://plus.unsplash.com/premium_photo-1676106623583-e68dd66683e3?w=600" },
  { id: 9,  name: "Butter Croissant",  category: "Breakfast", price: 3200, image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=600" },
  { id: 10, name: "Egg Benedict",      category: "Breakfast", price: 6800, image: "https://plus.unsplash.com/premium_photo-1663854478286-4313b556a12e?w=600" },

  { id: 11, name: "Chicken Sandwich",  category: "Sandwich",  price: 6500, image: "https://plus.unsplash.com/premium_photo-1738802845911-809a01acfa50?w=600" },
  { id: 12, name: "Tuna Sandwich",     category: "Sandwich",  price: 6200, image: "https://images.unsplash.com/photo-1716834092510-3be5db563920?w=600" },

  { id: 13, name: "Chocolate Brownie", category: "Dessert",   price: 4200, image: "https://images.unsplash.com/photo-1606313564573-104197cf8f91?w=600" },
  { id: 14, name: "Cheesecake",        category: "Cake",      price: 5800, image: "https://images.unsplash.com/photo-1676300185983-d5f242babe34?w=600" },
  { id: 15, name: "Tiramisu",          category: "Dessert",   price: 6500, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600" },
  { id: 16, name: "Red Velvet Cake",   category: "Cake",      price: 6200, image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600" },

  { id: 17, name: "Strawberry Smoothie", category: "Beverage", price: 5200, image: "https://plus.unsplash.com/premium_photo-1669686982303-7da68cdd4595?w=600" },
  { id: 18, name: "Iced Lemon Tea",    category: "Tea",       price: 4000, image: "https://media.istockphoto.com/id/1401730890/photo/pitcher-of-cold-ice-tea-with-rural-summer-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Lbo4S4Z0h_Fcbj-mJ27odEqdQ-hrgq0zAYJfQvJgi6M=" },
];

export default function MenuList() {
  return (
    <div className="min-h-screen bg-[#f8f1e3] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#4a2f1f]">Our Menu</h1>
          <p className="text-gray-600 mt-2">Freshly made with love</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}