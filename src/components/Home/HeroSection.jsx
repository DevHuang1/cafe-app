"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[90vh] overflow-hidden bg-bg-main">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            My Cafe
          </span>
        </h1>

        <p className="mt-6 text-xl text-white/90">
          Handcrafted coffee, fresh pastries, and moments worth savoring.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Order Now */}
          <button className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-semibold">
            Order Now →
          </button>

          {/* Explore Menu (FIXED) */}
          <Link
            href="/menu"
            className="px-10 py-4 border border-white/60 text-white rounded-2xl hover:bg-white/10 transition"
          >
            Explore Menu
          </Link>

        </div>
      </div>
    </section>
  );
}
