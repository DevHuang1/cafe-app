"use client";
import { Coffee, MapPin, Clock, Phone, Heart, Award, Users, Leaf } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Coffee size={28} />,
      title: "Crafted with Care",
      desc: "Every cup is brewed to order using single-origin beans sourced directly from ethical farms.",
    },
    {
      icon: <Heart size={28} />,
      title: "Made with Love",
      desc: "Our baristas train for months to perfect every pour, every steam, every detail.",
    },
    {
      icon: <Leaf size={28} />,
      title: "Sustainably Sourced",
      desc: "We partner only with farms that pay fair wages and practice sustainable agriculture.",
    },
    {
      icon: <Users size={28} />,
      title: "Community First",
      desc: "MyCafe is a space for creators, dreamers, and neighbours to slow down together.",
    },
  ];

  const team = [
    { name: "Huang",         role: "Head Barista",        emoji: "👨‍🍳", color: "#6B4226" },
    { name: "Harry",         role: "Pastry Chef",          emoji: "👨‍🍳", color: "#8B5E3C" },
    { name: "Kimchi",        role: "Café Manager",         emoji: "👩‍💼", color: "#A0522D" },
    { name: "Kimjurubyjane", role: "Customer Experience",  emoji: "👩‍💻", color: "#C08A5D" },
    { name: "Lamin Htun",    role: "Stock Manager",        emoji: "👨‍🏭", color: "#7A5233" },
    { name: "Meo_95",        role: "Cashier 1",            emoji: "👩‍💼", color: "#9C6B3C" },
    { name: "Myatt",         role: "Cashier 2",            emoji: "👩‍💼", color: "#B08968" },
    { name: "Ruka...a",      role: "Café Waiter",          emoji: "👩‍🍽️", color: "#D4A574" },
  ];

  const stats = [
    { num: "2026", label: "Est." },
    { num: "47+", label: "Menu Items" },
    { num: "500+", label: "Daily Guests" },
    { num: "12", label: "Team Members" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.4s both; }

        .val-card {
          background: white;
          border: 1.5px solid #E8E2DA;
          border-radius: 20px;
          padding: 28px 24px;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(139,94,60,0.12);
          border-color: #C08A5D;
        }

        .team-card {
          background: white;
          border: 1.5px solid #E8E2DA;
          border-radius: 20px;
          padding: 24px 20px;
          text-align: center;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(139,94,60,0.1);
        }

        .stat-card {
          text-align: center;
          padding: 24px 16px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #C08A5D;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="min-h-screen pt-[72px]" style={{ background: "#FDFCFB" }}>

        {/* ── HERO ── */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            minHeight: "60vh",
            background: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2070') center/cover no-repeat",
          }}
        >
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(12,9,6,0.55) 0%, rgba(12,9,6,0.7) 100%)"
          }} />
          <div className="relative z-10 text-center px-6 max-w-3xl fade-up">
            <p className="section-label" style={{ color: "#C08A5D" }}>Our Story</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "20px" }}>
              More than coffee.<br />
              <em style={{ color: "#C08A5D" }}>A way of life.</em>
            </h1>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto" }}>
              Born in Yangon in 2026, MyCafe was built on one belief — that a great cup of coffee deserves a beautiful moment to go with it.
            </p>
          </div>
        </div>

        {/* ── STATS ── */}
        <div style={{ background: "#8B5E3C" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: "white", lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginTop: "6px", fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STORY ── */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-up-1">
              <p className="section-label">Who We Are</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#3E2723", lineHeight: 1.2, marginBottom: "20px" }}>
                A small team with a <em style={{ color: "#8B5E3C" }}>big passion</em>
              </h2>
              <p style={{ fontSize: "16px", color: "#6B5544", lineHeight: 1.9, marginBottom: "16px" }}>
                We started MyCafe as a tiny corner shop in the heart of Yangon. No fancy investors, no corporate playbook — just a love for exceptional coffee and warm hospitality.
              </p>
              <p style={{ fontSize: "16px", color: "#6B5544", lineHeight: 1.9 }}>
                Today, we serve hundreds of guests daily, but our values haven't changed. We still roast our own beans, bake our pastries fresh every morning, and greet every guest by name.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <div style={{ width: "48px", height: "2px", background: "#C08A5D", borderRadius: "2px" }} />
                <span style={{ fontSize: "13px", color: "#C08A5D", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Est. Yangon 2026</span>
              </div>
            </div>

            <div className="fade-up-2 relative">
              <div
                style={{
                  height: "420px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000') center/cover no-repeat",
                  boxShadow: "0 24px 64px rgba(139,94,60,0.2)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  background: "#8B5E3C",
                  borderRadius: "16px",
                  padding: "16px 20px",
                  boxShadow: "0 8px 24px rgba(139,94,60,0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Award size={22} color="white" />
                  <div>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: 0 }}>Best Café 2026</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", margin: 0 }}>Yangon Food Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <div style={{ background: "#F5F0EA" }} className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12 fade-up">
              <p className="section-label">What We Stand For</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#3E2723" }}>
                Our <em style={{ color: "#8B5E3C" }}>Values</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className={`val-card fade-up-${Math.min(i + 1, 4)}`}>
                  <div style={{ width: "52px", height: "52px", background: "rgba(139,94,60,0.1)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B5E3C", marginBottom: "16px" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "16px", color: "#3E2723", marginBottom: "10px" }}>{v.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B5544", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TEAM ── */}
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12 fade-up">
            <p className="section-label">The People Behind the Cup</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#3E2723" }}>
              Meet our <em style={{ color: "#8B5E3C" }}>Team</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <div key={i} className={`team-card fade-up-${Math.min(i + 1, 4)}`}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "32px", boxShadow: `0 4px 16px ${t.color}55` }}>
                  {t.emoji}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#3E2723", marginBottom: "4px" }}>{t.name}</h3>
                <p style={{ fontSize: "13px", color: "#C08A5D", fontWeight: 600 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── VISIT US ── */}
        <div style={{ background: "#8B5E3C" }} className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
              <div>
                <p className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>Find Us</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Visit Us</h3>
                <div className="flex items-start gap-3">
                  <MapPin size={18} style={{ color: "rgba(255,255,255,0.7)", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                    No.79 Myakywantha Street,<br />Yangon, Myanmar
                  </p>
                </div>
              </div>
              <div>
                <p className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>Hours</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Opening Hours</h3>
                <div className="flex items-center gap-3">
                  <Clock size={18} style={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)" }}>Daily · 8:00 AM – 7:00 PM</p>
                </div>
              </div>
              <div>
                <p className="section-label" style={{ color: "rgba(255,255,255,0.6)" }}>Contact</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Get in Touch</h3>
                <div className="flex items-center gap-3">
                  <Phone size={18} style={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)" }}>+95 9 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="py-20 text-center fade-up" style={{ background: "#FDFCFB" }}>
          <p className="section-label">Ready to Visit?</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#3E2723", marginBottom: "16px" }}>
            Come as you are.<br />
            <em style={{ color: "#8B5E3C" }}>Stay as long as you like.</em>
          </h2>
          <p style={{ fontSize: "16px", color: "#6B5544", marginBottom: "36px" }}>
            Explore our menu and order your favourites online.
          </p>
          <a
            href="/menu"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              background: "#8B5E3C",
              color: "white",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: "14px",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow: "0 6px 20px rgba(139,94,60,0.35)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#7A5233"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#8B5E3C"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            View Our Menu
          </a>
        </div>

      </div>
    </>
  );
}