import { desc } from "framer-motion/client";

export default function FeaturedMenu() {
  const menuItems = [
    { 
      id: 1, 
      name: "Signature Espresso", 
      price: "$4.50", 
      desc: "Bold and rich dark roast with chocolate notes.",
      image: "/espresso.jpg" // Espresso
    },
    { 
      id: 2, 
      name: "Caramel Macchiato", 
      price: "$5.50", 
      desc: "Creamy vanilla and caramel drizzle.",
      image: "/caramel cacchiato.jpg" // Caramel Macchiato
    },
    { 
      id: 3, 
      name: "Matcha Latte", 
      price: "$5.00", 
      desc: "Premium ceremonial matcha with silky milk.",
      image: "/matcha latte.jpg" // Matcha Latte
    },
  ];

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

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Real Image */}
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
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
                    {item.price}
                  </span>
                </div>

                <p className="text-text-secondary leading-relaxed mb-8 min-h-[50px]">
                  {item.desc}
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
      </div>
    </section>
  );
}