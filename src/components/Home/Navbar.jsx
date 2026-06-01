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

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

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
          position: relative;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: white;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .nav-link:hover { color: white; }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: white; }

        .btn-join {
          display: inline-block;
          padding: 9px 20px;
          background: white;
          color: #8B5E3C;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 10px;
          text-decoration: none;
          border: 2px solid transparent;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .btn-join:hover {
          background: #7A5233;
          color: white;
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        .btn-join:active { transform: translateY(0); box-shadow: none; }

        .btn-login {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s;
        }
        .btn-login:hover { background: rgba(255,255,255,0.15); color: white; }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.4);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .btn-back:hover { background: rgba(255,255,255,0.15); border-color: white; }
        .btn-back:active { transform: scale(0.97); }

        .btn-signout {
          transition: color 0.2s, background 0.2s, transform 0.15s;
          border-radius: 8px;
          padding: 8px;
        }
        .btn-signout:hover { color: #fca5a5; background: rgba(255,255,255,0.1); transform: scale(1.1); }

        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .cart-btn:hover { background: rgba(255,255,255,0.15); color: white; transform: scale(1.08); }
        .cart-btn:active { transform: scale(0.95); }

        .cart-badge {
          position: absolute;
          top: -4px; right: -4px;
          background: white;
          color: #8B5E3C;
          font-size: 10px;
          font-weight: 800;
          min-width: 17px;
          height: 17px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          animation: badgePop 0.25s ease;
        }
        @keyframes badgePop {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .mobile-link {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          transition: color 0.2s, padding-left 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-link:hover,
        .mobile-link.active {
          color: white;
          padding-left: 8px;
        }
        .mobile-link.active::after {
          content: '•';
          color: rgba(255,255,255,0.5);
          font-size: 20px;
        }

        /* Drawer slide animation */
        @keyframes drawerSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .drawer-anim { animation: drawerSlide 0.2s ease both; }
      `}</style>

      <nav className="w-full fixed top-0 left-0 z-50 bg-[#8B5E3C]"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>

        <div className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ padding: "0 20px", height: "64px" }}>

          {/* Logo */}
          <Link href="/"
            className="font-serif font-bold text-white flex items-center gap-2 hover:opacity-90 transition flex-shrink-0"
            style={{ fontSize: "clamp(18px, 4vw, 22px)" }}>
            <Coffee size={22} className="text-white/80" />
            <span>MyCafe</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className={`nav-link ${isActive(href) ? "active" : ""}`}>
                {label}
              </Link>
            ))}
            {profile?.role === "staff" && (
              <Link href="/staff/dashboard"
                className={`nav-link flex items-center gap-1.5 ${isActive("/staff/dashboard") ? "active" : ""}`}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
            )}

            <div className="flex items-center gap-2 lg:gap-3 pl-4 lg:pl-6 border-l border-white/30">
              {hideAuth ? (
                <Link href="/" className="btn-back">← Back</Link>
              ) : (
                <>
                  {!hideCart && (
                    <Link href="/cart" className="cart-btn">
                      <ShoppingCart size={20} />
                      {totalItems > 0 && (
                        <span key={totalItems} className="cart-badge">{totalItems}</span>
                      )}
                    </Link>
                  )}
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link href="/profile" className="flex items-center gap-2 group">
                        <div className="text-right hidden lg:block">
                          <p className="text-[9px] text-white/55 font-bold uppercase leading-none">Member</p>
                          <p className="text-sm font-bold text-white group-hover:text-white/70 transition mt-0.5">
                            {profile?.full_name?.split(" ")[0] || "Profile"}
                          </p>
                        </div>
                        <Avatar size="w-9 h-9" avatarUrl={avatarUrl} profile={profile} user={user} />
                      </Link>
                      <button onClick={handleSignOut} className="btn-signout text-white/50">
                        <LogOut size={18} />
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
          <div className="md:hidden flex items-center gap-2">
            {hideAuth ? (
              <Link href="/" className="btn-back">← Back</Link>
            ) : (
              <>
                {!hideCart && (
                  <Link href="/cart" className="cart-btn">
                    <ShoppingCart size={22} />
                    {totalItems > 0 && (
                      <span key={totalItems} className="cart-badge">{totalItems}</span>
                    )}
                  </Link>
                )}
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/10 active:bg-white/20 transition"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && !hideAuth && (
          <div className="md:hidden drawer-anim"
            style={{ background: "#7A5233", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ padding: "8px 20px 24px" }}>

              {/* Nav links */}
              <div>
                {navLinks.map(({ label, href }) => (
                  <Link key={href} href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-link ${isActive(href) ? "active" : ""}`}>
                    {label}
                  </Link>
                ))}
              </div>

              {/* Auth section */}
              <div style={{ marginTop: "20px" }}>
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl transition"
                      style={{ background: "rgba(255,255,255,0.1)" }}>
                      <Avatar size="w-12 h-12" avatarUrl={avatarUrl} profile={profile} user={user} />
                      <div>
                        <p className="text-white font-bold text-base leading-tight">
                          {profile?.full_name || "User"}
                        </p>
                        <p className="text-white/55 text-sm mt-0.5 truncate max-w-[200px]">
                          {user.email}
                        </p>
                      </div>
                    </Link>
                    <button onClick={handleSignOut}
                      className="w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition active:scale-95"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }}>
                      <LogOut size={17} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full py-3.5 rounded-xl text-center font-bold text-white text-base transition active:scale-95"
                      style={{ border: "2px solid rgba(255,255,255,0.35)" }}>
                      Login
                    </Link>
                    <Link href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="w-full py-3.5 rounded-xl text-center font-bold text-base transition active:scale-95"
                      style={{ background: "white", color: "#8B5E3C" }}>
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}