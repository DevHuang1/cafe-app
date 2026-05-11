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
  const [user, setUser] = useState(serverUser);
  const [role, setRole] = useState(serverProfile?.role || null);
  const [fullName, setFullName] = useState(serverProfile?.full_name || "");
  const [avatarUrl, setAvatarUrl] = useState(null);

  const router = useRouter();

  const getAvatar = useCallback((path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  }, []);

  const updateLocalState = useCallback(
    async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setFullName("");
        setAvatarUrl(null);
        return;
      }

      setUser(currentUser);
      const { data: profile } = await supabase
        .from("profiles")
        .select("image_url, full_name, role")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profile) {
        setRole(profile.role);
        setFullName(profile.full_name || "");
        setAvatarUrl(getAvatar(profile.image_url));
      }
    },
    [getAvatar],
  );

  useEffect(() => {
    setUser(serverUser);
    setRole(serverProfile?.role || null);
    setFullName(serverProfile?.full_name || "");
    setAvatarUrl(getAvatar(serverProfile?.image_url));
  }, [serverUser, serverProfile, getAvatar]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        await updateLocalState(session?.user);
        router.refresh();
      }
      if (event === "SIGNED_OUT") {
        updateLocalState(null);
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router, updateLocalState]);

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
          {fullName?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase() ||
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
          {role === "staff" && (
            <Link
              href="/staff/dashboard"
              className="flex items-center gap-1.5 text-[#C08A5D] font-bold bg-[#C08A5D]/5 px-3 py-1.5 rounded-lg border border-[#C08A5D]/10"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#E8E2DA]">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-3 group">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                      Member
                    </p>
                    <p className="text-sm font-bold text-[#3E2723] group-hover:text-[#C08A5D] transition">
                      {fullName.split(" ")[0] || "Profile"}
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
        <div className="md:hidden px-6 py-8 flex flex-col gap-6 bg-[#FDFCFB] border-b shadow-2xl animate-in slide-in-from-top-4">
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
          {role === "staff" && (
            <Link
              href="/staff/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-bold text-[#C08A5D]"
            >
              Staff Dashboard
            </Link>
          )}
          <div className="pt-6 border-t border-[#E8E2DA]">
            {user ? (
              <div className="flex flex-col gap-4">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 p-4 bg-[#F5F1EE] rounded-2xl"
                >
                  <ProfilePic size="w-14 h-14" />
                  <div>
                    <p className="text-[#3E2723] font-bold">
                      {fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
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
              <div className="flex flex-col gap-3">
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
        </div>
      )}
    </nav>
  );
}
