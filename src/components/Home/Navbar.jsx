"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import {
  Coffee, LayoutDashboard, LogOut,
  Menu as MenuIcon, X, ShoppingCart,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const supabase = createClient();

function Avatar({ size = "w-9 h-9", avatarUrl, profile, user }) {
  return (
    <div className={`${size} rounded-full bg-[#F5F1EE] flex items-center justify-center text-[#6B4226] font-bold border border-[#E8E2DA] shadow-sm overflow-hidden flex-shrink-0`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm">
          {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
        </span>
      )}
    </div>
  );
}

export default function Navbar({ initialUser, initialProfile, hideAuth = false, hideCart = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [profile, setProfile] = useState(initialProfile);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const pathname = usePathname();

  // hideAuth = true means we are on login/signup page
  // On auth pages: show Home/Menu/About + ← Back button (no cart, no login/join)
  // On normal pages: show Home/Menu/About + cart + login/join (or user avatar)

  useEffect(() => { setUser(initialUser); setProfile(initialProfile); }, [initialUser, initialProfile]);

  useEffect(() => {
    if (!profile?.image_url) { setAvatarUrl(null); return; }
    const path = profile.image_url;
    if (path.startsWith("http")) { setAvatarUrl(path); return; }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(data.publicUrl);
  }, [profile]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user);
        const { data } = await supabase.from("profiles").select("image_url, full_name, role").eq("id", session.user.id).maybeSingle();
        setProfile(data);
        router.refresh();
      }
      if (event === "SIGNED_OUT") { setUser(null); setProfile(null); router.refresh(); }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    setUser(null); setProfile(null);
    router.push("/login"); router.refresh();
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative; font-size: 15px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.75); text-decoration: none;
          padding: 6px 2px; transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2px; background: white; border-radius: 2px;
          transform: scaleX(0); transform-origin: center; transition: transform 0.25s ease;
        }
        .nav-link:hover { color: white; }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: white; }

        .btn-join {
          display: inline-block; padding: 11px 28px; background: white;
          color: #8B5E3C; font-size: 14px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 12px; text-decoration: none; border: 2px solid transparent;
          transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-join:hover { background: #8B5E3C; color: white; border-color: white; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
        .btn-join:active { transform: translateY(0); box-shadow: none; }

        .btn-login {
          font-size: 15px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: rgba(255,255,255,0.75);
          text-decoration: none; padding: 8px 16px; border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .btn-login:hover { background: rgba(255,255,255,0.15); color: white; }

        .btn-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; color: white; text-decoration: none;
          padding: 10px 18px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.4);
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .btn-back:hover { background: rgba(255,255,255,0.15); border-color: white; transform: translateX(-2px); }
        .btn-back:active { transform: translateX(0) scale(0.97); }

        .btn-signout { transition: color 0.2s, background 0.2s, transform 0.15s; border-radius: 8px; padding: 8px; }
        .btn-signout:hover { color: #fca5a5; background: rgba(255,255,255,0.1); transform: scale(1.1); }

        .cart-btn { position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; color: rgba(255,255,255,0.8); text-decoration: none; transition: background 0.2s, color 0.2s, transform 0.15s; }
        .cart-btn:hover { background: rgba(255,255,255,0.15); color: white; transform: scale(1.08); }
        .cart-badge { position: absolute; top: -4px; right: -4px; background: white; color: #8B5E3C; font-size: 10px; font-weight: 800; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; padding: 0 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); animation: badgePop 0.25s ease; }
        @keyframes badgePop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }

        .mobile-link { font-size: 18px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.8); text-decoration: none; padding: 10px 0; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; display: block; }
        .mobile-link:hover, .mobile-link.active { color: white; border-bottom-color: white; }
      `}</style>

      <nav className="w-full fixed top-0 left-0 z-50 bg-[#8B5E3C]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-white flex items-center gap-2.5 hover:opacity-90 transition">
            <Coffee size={26} className="text-white/80" />
            <span>MyCafe</span>
          </Link>

          {/* Desktop right — nav links + actions together */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className={`nav-link ${isActive(href) ? "active" : ""}`}>
                {label}
              </Link>
            ))}
            {profile?.role === "staff" && (
              <Link href="/staff/dashboard" className={`nav-link flex items-center gap-1.5 ${isActive("/staff/dashboard") ? "active" : ""}`}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}
            <div className="flex items-center gap-3 pl-6 border-l border-white/30">
            {hideAuth ? (
              /* AUTH PAGES: only ← Back */
              <Link href="/" className="btn-back">← Back</Link>
            ) : (
              /* NORMAL PAGES: cart + login/join or user */
              <>
{!hideCart && (
                <Link href="/cart" className="cart-btn">
                  <ShoppingCart size={22} />
                  {totalItems > 0 && <span key={totalItems} className="cart-badge">{totalItems}</span>}
                </Link>
              )}
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link href="/profile" className="flex items-center gap-3 group">
                      <div className="text-right">
                        <p className="text-[10px] text-white/60 font-bold uppercase leading-none">Member</p>
                        <p className="text-sm font-bold text-white group-hover:text-white/70 transition mt-0.5">
                          {profile?.full_name?.split(" ")[0] || "Profile"}
                        </p>
                      </div>
                      <Avatar size="w-10 h-10" avatarUrl={avatarUrl} profile={profile} user={user} />
                    </Link>
                    <button onClick={handleSignOut} className="btn-signout text-white/50">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="btn-login">Login</Link>
                    <Link href="/signup" className="btn-join">Join Now</Link>
                  </>
                )}
              </>
            )}
            </div>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            {hideAuth ? (
              /* AUTH PAGES: only ← Back */
              <Link href="/" className="btn-back" style={{ padding: '8px 14px', fontSize: '13px' }}>← Back</Link>
            ) : (
              /* NORMAL PAGES: cart + hamburger */
              <>
{!hideCart && (
                <Link href="/cart" className="cart-btn">
                  <ShoppingCart size={22} />
                  {totalItems > 0 && <span key={totalItems} className="cart-badge">{totalItems}</span>}
                </Link>
              )}
                <button className="text-white p-1 rounded-lg hover:bg-white/10 active:bg-white/20 transition" onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile drawer — only on normal pages */}
        {menuOpen && !hideAuth && (
          <div className="md:hidden px-8 py-8 flex flex-col gap-2 bg-[#7A5233] border-t border-white/10">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`mobile-link ${isActive(href) ? "active" : ""}`}>
                {label}
              </Link>
            ))}
            {user ? (
              <div className="flex flex-col gap-4 pt-6 mt-2 border-t border-white/20">
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition">
                  <Avatar size="w-14 h-14" avatarUrl={avatarUrl} profile={profile} user={user} />
                  <div>
                    <p className="text-white font-bold text-base">{profile?.full_name || "User"}</p>
                    <p className="text-sm text-white/60 mt-0.5">{user.email}</p>
                  </div>
                </Link>
                <button onClick={handleSignOut} className="w-full py-4 bg-red-900/30 text-red-300 rounded-xl font-bold text-base flex items-center justify-center gap-2 border border-red-800/30 hover:bg-red-900/50 active:scale-95 transition">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-6 mt-2 border-t border-white/20">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="w-full py-4 border-2 border-white/40 rounded-xl text-center font-bold text-white text-base hover:bg-white/10 active:scale-95 transition">Login</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="w-full py-4 bg-white text-[#8B5E3C] rounded-xl text-center font-bold text-base hover:bg-white/90 active:scale-95 transition">Join Now</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}