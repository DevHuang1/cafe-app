"use client";

export default function MenuItemCard({ item }) {
  return (
    <div className="bg-white border border-[#e8d9c7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-[17px] leading-tight line-clamp-2 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-[#8B5A2B]">
              {Number(item.price).toLocaleString()}
              <span className="text-base font-medium text-gray-500 ml-1">Ks</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}