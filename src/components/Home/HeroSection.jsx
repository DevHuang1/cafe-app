"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <style>{`
        .btn-order {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 40px;
          background: white;
          color: #111827;
          border-radius: 16px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          border: 2px solid transparent;
          transition: background 0.25s, color 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .btn-order:hover {
          background: linear-gradient(to right, #f59e0b, #f97316);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(251,146,60,0.45);
        }
        .btn-order:active {
          transform: translateY(0px) scale(0.97);
          box-shadow: none;
        }

        .btn-menu {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 40px;
          background: transparent;
          color: white;
          border-radius: 16px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.6);
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .btn-menu:hover {
          background: #8B5E3C;
          color: white;
          border-color: #8B5E3C;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(139,94,60,0.4);
        }
        .btn-menu:active {
          transform: translateY(0px) scale(0.97);
          box-shadow: none;
        }
      `}</style>

      <section className="relative flex items-center justify-center min-h-[90vh] overflow-hidden">

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

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-order">
              Order Now →
            </Link>
            <Link href="/menu" className="btn-menu">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}