"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Coffee,
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const supabase = createClient();

export default function Navbar({ serverUser, serverProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const router = useRouter();

  const getAvatar = useCallback((path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  }, []);

  useEffect(() => {
    setAvatarUrl(getAvatar(serverProfile?.image_url));
  }, [serverProfile, getAvatar]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/login");
  };

  const ProfilePic = ({ size = "w-8 h-8" }) => (
    <div
      className={`${size} rounded-full bg-[#F5F1EE] flex items-center justify-center text-[#6B4226] font-bold border border-[#E8E2DA] shadow-sm overflow-hidden flex-shrink-0`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm">
          {serverProfile?.full_name?.[0]?.toUpperCase() ||
            serverUser?.email?.[0]?.toUpperCase() ||
            "?"}
        </span>
      )}
    </div>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold text-[#3E2723] flex items-center gap-2"
        >
          <Coffee className="text-[#C08A5D]" />
          <span>MyCafe</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[#5D4037] font-medium text-sm uppercase tracking-wide">
          <Link href="/" className="hover:text-[#C08A5D] transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-[#C08A5D] transition">
            Menu
          </Link>

          {serverProfile?.role === "staff" && (
            <Link
              href="/staff/dashboard"
              className="flex items-center gap-1.5 text-[#C08A5D] font-bold bg-[#C08A5D]/5 px-3 py-1.5 rounded-lg border border-[#C08A5D]/10"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#E8E2DA]">
            {serverUser ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-3 group">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                      Member
                    </p>
                    <p className="text-sm font-bold text-[#3E2723] group-hover:text-[#C08A5D] transition">
                      {serverProfile?.full_name?.split(" ")[0] || "Profile"}
                    </p>
                  </div>
                  <ProfilePic size="w-10 h-10" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="hover:text-[#C08A5D] transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 bg-[#C08A5D] text-white rounded-xl shadow-soft hover:bg-[#A8744B] transition"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-[#3E2723]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-8 flex flex-col gap-6 bg-[#FDFCFB] border-b shadow-2xl">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold"
          >
            Menu
          </Link>
          {serverUser ? (
            <div className="flex flex-col gap-4 pt-6 border-t border-[#E8E2DA]">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-[#F5F1EE] rounded-2xl"
              >
                <ProfilePic size="w-14 h-14" />
                <div>
                  <p className="text-[#3E2723] font-bold">
                    {serverProfile?.full_name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{serverUser.email}</p>
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-6 border-t border-[#E8E2DA]">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 border border-[#E8E2DA] rounded-xl text-center font-bold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="w-full py-4 bg-[#C08A5D] text-white rounded-xl text-center font-bold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
