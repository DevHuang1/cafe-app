"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/store/cartStore";

const supabase = createClient();

export default function FeaturedMenu({ activeCategory, searchTerm }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase.from("menu_items").select("*");
        if (error) throw error;
        if (data) {
          const itemsWithImages = data.map((item) => {
            let publicUrl = null;
            if (item.image_url) {
              const { data: imgData } = supabase.storage
                .from("menu_images")
                .getPublicUrl(item.image_url);
              publicUrl = imgData?.publicUrl;
            }
            return { ...item, resolvedImageUrl: publicUrl };
          });
          setMenuItems(itemsWithImages);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setErrorMessage(err.message || "Could not connect to database");
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Filter by category and search
  const filtered = menuItems.filter((item) => {
    const matchCategory =
      !activeCategory || activeCategory === "All"
        ? true
        : item.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      !searchTerm
        ? true
        : item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section>

      {/* Error */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-8 text-center font-medium">
          ⚠️ {errorMessage}. Open your browser inspector console for deep logs.
        </div>
      )}

      {/* Loading skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl overflow-hidden p-8 border border-[#E8E2DA] animate-pulse">
              <div className="h-56 bg-gray-100 rounded-2xl mb-6" />
              <div className="h-6 bg-gray-100 rounded w-2/3 mb-4" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-5/6 mb-8" />
              <div className="h-12 bg-gray-100 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-6xl mb-4">☕</span>
          <h3 className="text-xl font-bold text-[#3E2723] mb-2">No items found</h3>
          <p className="text-[#957261]">Try a different category or search term</p>
        </div>
      ) : (
        /* Menu cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const rawPrice =
              typeof item.price === "string"
                ? item.price.replace(/[^0-9.]/g, "")
                : item.price;
            const formattedPrice = isNaN(Number(rawPrice))
              ? "0.00"
              : Number(rawPrice).toFixed(2);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2DA] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ boxShadow: '0 2px 12px rgba(139,94,60,0.08)' }}
              >
                {/* Image */}
                <div className="h-56 relative overflow-hidden bg-gray-100">
                  {item.resolvedImageUrl ? (
                    <img
                      src={item.resolvedImageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-[#F5F0EA]">
                      ☕
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white text-[#8B5E3C] text-xs font-bold px-3 py-1 rounded-full shadow"
                    style={{ border: '1px solid rgba(139,94,60,0.2)' }}>
                    Featured
                  </div>
                  {item.category && (
                    <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(139,94,60,0.75)', backdropFilter: 'blur(4px)' }}>
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[#3E2723] font-bold text-xl leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-[#8B5E3C] font-bold text-xl ml-2 shrink-0">
                      ${formattedPrice}
                    </span>
                  </div>

                  <p className="text-[#957261] leading-relaxed mb-6 text-sm min-h-[44px]">
                    {item.description || "No description available."}
                  </p>

                  <button
                    onClick={() => addItem({
                      id: item.id,
                      name: item.name,
                      price: Number(rawPrice),
                      image: item.resolvedImageUrl,
                      category: item.category,
                    })}
                    className="w-full text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: 'linear-gradient(to right, #B08968, #8B5E3C)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(to right, #9A7A5F, #7A5A3C)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(to right, #B08968, #8B5E3C)'}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}