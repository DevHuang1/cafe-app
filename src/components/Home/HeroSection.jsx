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
          padding: clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px);
          background: white;
          color: #111827;
          border-radius: 14px;
          font-weight: 600;
          font-size: clamp(14px, 2vw, 16px);
          text-decoration: none;
          border: 2px solid transparent;
          white-space: nowrap;
          transition: background 0.25s, color 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .btn-order:hover {
          background: linear-gradient(to right, #f59e0b, #f97316);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(251,146,60,0.45);
        }
        .btn-order:active { transform: translateY(0) scale(0.97); box-shadow: none; }

        .btn-menu {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px);
          background: transparent;
          color: white;
          border-radius: 14px;
          font-weight: 600;
          font-size: clamp(14px, 2vw, 16px);
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.6);
          white-space: nowrap;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.15s, box-shadow 0.25s;
        }
        .btn-menu:hover {
          background: #8B5E3C;
          color: white;
          border-color: #8B5E3C;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(139,94,60,0.4);
        }
        .btn-menu:active { transform: translateY(0) scale(0.97); box-shadow: none; }

        @keyframes heroBadge {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-content > * {
          animation: heroBadge 0.7s ease both;
        }
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.55s; }
      `}</style>

      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}>

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 text-center w-full px-5 sm:px-8"
          style={{ maxWidth: "min(90vw, 700px)" }}>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span style={{ width: "28px", height: "1px", background: "rgba(251,191,36,0.7)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,191,36,0.9)", fontWeight: 600 }}>
              Yangon · Est. 2026
            </span>
            <span style={{ width: "28px", height: "1px", background: "rgba(251,191,36,0.7)" }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 8vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "white",
          }}>
            Welcome to{" "}
            <span style={{ background: "linear-gradient(to right, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              My Cafe
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            marginTop: "clamp(12px, 2vw, 20px)",
            fontSize: "clamp(15px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "clamp(12px, 2vw, 20px) auto 0",
          }}>
            Handcrafted coffee, fresh pastries, and moments worth savoring.
          </p>

          {/* Buttons */}
          <div style={{
            marginTop: "clamp(24px, 4vw, 40px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}>
            <Link href="/menu" className="btn-order">Order Now →</Link>
            <Link href="/menu" className="btn-menu">Explore Menu</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, white, transparent)", animation: "bounce 1.5s infinite" }} />
        </div>
      </section>
    </>
  );
}