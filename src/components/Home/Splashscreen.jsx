"use client";
import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

export default function Splashscreen({ onComplete }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 2600);
    const t2 = setTimeout(() => onComplete?.(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ transition: "opacity 1s ease" }}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#8B5E3C] ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo — exactly like Navbar */}
      <div
        className="flex items-center gap-3"
        style={{ animation: "splashPop 0.7s ease 0.2s both" }}
      >
        <Coffee size={48} className="text-white/80" />
        <span className="font-serif text-[48px] font-bold tracking-tight text-white">
          MyCafe
        </span>
      </div>

      <p
        className="mt-2 text-[11px] tracking-[0.28em] uppercase text-white/60"
        style={{ animation: "splashFadeUp 0.8s ease 0.6s both" }}
      >
        Yangon · Est. 2026
      </p>

      {/* Loading bar */}
      <div
        className="mt-8 w-[140px] h-[3px] bg-white/20 overflow-hidden rounded-full"
        style={{ animation: "splashFadeUp 0.5s ease 0.8s both" }}
      >
        <div
          className="h-full bg-white rounded-full"
          style={{ animation: "splashLoadLine 1.8s ease 1s both" }}
        />
      </div>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.75); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashLoadLine {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}