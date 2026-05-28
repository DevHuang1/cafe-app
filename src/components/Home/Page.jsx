"use client";
import { useEffect, useState } from "react";
import Splashscreen from "./Splashscreen";
import Navbar from "./NavbarWrapper";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

export default function HomePage({ initialUser, initialProfile }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!ready && <Splashscreen onComplete={() => {}} />}

      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <Navbar initialUser={initialUser} initialProfile={initialProfile} />
        <main>
          <HeroSection />
        </main>
        <Footer />
      </div>
    </>
  );
}