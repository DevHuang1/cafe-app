
'use client';

const categories = ['All', 'Coffee', 'Tea', 'Dessert', 'Breakfast', 'Sandwich', 'Cake'];

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="sticky top-0 bg-white z-50 border-b lg:border-b-0 lg:border-r"
         style={{ borderColor: '#EDE0D4' }}>

      {/* MOBILE */}
      <div className="lg:hidden px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-7 py-3 rounded-2xl text-sm font-medium whitespace-nowrap border transition-all active:scale-95 min-w-[90px]
                ${activeCategory === category 
                  ? 'bg-[#5C3D2E] text-white border-[#957261] shadow-md' 
                  : 'bg-white text-[#1F0F07] border-[#D4B9A5] hover:bg-[#F5F0EA]'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col gap-3 px-5 py-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`w-full px-6 py-3 rounded-2xl text-sm font-medium border text-left transition-all
              ${activeCategory === category 
                ? 'bg-[#5C3D2E] text-[#EDE0D4] border-[#957261]' 
                : 'bg-white text-[#1F0F07] border-[#D4B9A5] hover:bg-gray-50'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}