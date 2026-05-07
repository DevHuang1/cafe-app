
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyCafe ☕
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <Link href="/menu" className="hover:text-black transition">Menu</Link>
          <Link href="/about" className="hover:text-black transition">About</Link>
          <Link href="/contact" className="hover:text-black transition">Contact</Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 ml-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-700 font-medium bg-white">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {/* Auth Buttons Mobile */}
          <div className="flex flex-col gap-2 mt-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 border rounded-xl text-center"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 bg-black text-white rounded-xl text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
