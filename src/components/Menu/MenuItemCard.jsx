"use client";
export default function MenuItemCard({ item }) {
  return (
    <div className="bg-bg-card shadow-card rounded-2xl overflow-hidden border border-border hover:scale-[1.02] transition">

      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex justify-between items-center">

        <div>
          <h3 className="text-text-primary font-semibold text-lg">
            {item.name}
          </h3>
          <p className="text-text-secondary text-sm">
            {item.category}
          </p>
        </div>

        <p className="text-primary font-bold">
          {item.price} Ks
        </p>

      </div>

    </div>
  );
}