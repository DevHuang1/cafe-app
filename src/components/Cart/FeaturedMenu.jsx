"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function FeaturedMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")

          .limit(5);

        if (error) throw error;

        if (data) {
          const itemsWithImages = data.map((item) => {
            const { data: imgData } = supabase.storage
              .from("menu_images")
              .getPublicUrl(item.image_url);

            return {
              ...item,
              resolvedImageUrl: imgData.publicUrl,
            };
          });

          setMenuItems(itemsWithImages);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <section className="bg-bg-main py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-text-primary text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-[#B08968]">Featured Menu</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto text-lg">
            Handcrafted with love using the finest ingredients
          </p>
          <div className="w-24 h-1 bg-[#B08968] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Loading / Skeleton State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden p-8 border border-border animate-pulse"
              >
                <div className="h-56 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
                <div className="h-12 bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Menu Cards List */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Real Image from Storage */}
                <div className="h-56 relative overflow-hidden bg-gray-100">
                  {item.resolvedImageUrl ? (
                    <img
                      src={item.resolvedImageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-text-primary font-bold text-2xl leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-[#B08968] font-bold text-xl">
                      {/* Formats decimal pricing into expected currency style dynamically */}
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Using item.description to align with the SQL table setup */}
                  <p className="text-text-secondary leading-relaxed mb-8 min-h-[50px]">
                    {item.description || "No description available."}
                  </p>

                  {/* Linear Gradient Button */}
                  <button
                    className="w-full bg-gradient-to-r from-[#B08968] to-[#8B5E3C] 
                               hover:from-[#9A7A5F] hover:to-[#7A5A3C]
                               text-white font-semibold py-4 rounded-2xl 
                               transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
