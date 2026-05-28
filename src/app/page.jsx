"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Home/NavbarWrapper";
import HeroSection from "@/components/Home/HeroSection";
import Footer from "@/components/Home/Footer";
import Splashscreen from "@/components/Home/Splashscreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3600);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splashscreen onComplete={() => {}} />;

  return (
    <>
      <Navbar initialUser={null} initialProfile={null} />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}