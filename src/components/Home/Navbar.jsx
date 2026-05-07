"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [fullName, setFullName] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const fetchProfileData = async (userId) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("image_url, full_name")
        .eq("id", userId)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");

        if (profile.image_url) {
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(profile.image_url);
          setAvatarUrl(data.publicUrl);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchProfileData(user.id);
      }
    };

    initializeUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchProfileData(currentUser.id);
      } else {
        setAvatarUrl(null);
        setFullName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    setUser(null);
    setAvatarUrl(null);
    setFullName("");
    router.push("/login");
  };

  const ProfilePic = ({ size = "w-8 h-8" }) => (
    <div
      className={`${size} rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border border-gray-200 shadow-sm overflow-hidden flex-shrink-0`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm">
          {fullName?.[0]?.toUpperCase() ||
            user?.email?.[0].toUpperCase() ||
            "?"}
        </span>
      )}
    </div>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyCafe ☕
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-black transition">
            Menu
          </Link>
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>

          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Hello,{" "}
                    <span className="font-semibold text-black">
                      {fullName || "User"}
                    </span>
                  </span>
                  <Link
                    href="/profile"
                    className="transition transform hover:scale-105 active:scale-95"
                  >
                    <ProfilePic size="w-9 h-9" />
                  </Link>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 hover:text-black transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-2xl p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-6 flex flex-col gap-5 bg-white border-b shadow-xl">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/menu" onClick={() => setMenuOpen(false)}>
            Menu
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-4">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
                >
                  <ProfilePic size="w-12 h-12" />
                  <div className="flex flex-col">
                    <span className="text-black font-bold truncate max-w-[200px]">
                      Hello, {fullName || "User"}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 border border-gray-200 rounded-xl text-center font-bold"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 bg-black text-white rounded-xl text-center font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
