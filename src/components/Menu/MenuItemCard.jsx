"use client";

export default function MenuItemCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">
              {Number(item.price).toLocaleString()}
              <span className="text-base font-medium text-gray-400 ml-1">Ks</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}