'use client';

const categories = ['All', 'Coffee', 'Tea', 'Dessert', 'Breakfast', 'Sandwich', 'Cake'];

export default function CategoryFilter({ activeCategory, setActiveCategory, mobile = false }) {
  return (
    <>
      <style>{`
        .cat-btn-desktop {
          width: 100%;
          padding: 12px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          border: 1.5px solid #C4A882;
          text-align: left;
          cursor: pointer;
          background: white;
          color: #3E2003;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .cat-btn-desktop:hover {
          background: #F5EDE0;
          border-color: #8B5E3C;
          color: #8B5E3C;
          transform: translateX(5px);
          box-shadow: 2px 2px 8px rgba(139,94,60,0.12);
        }
        .cat-btn-desktop:active { transform: translateX(5px) scale(0.97); }
        .cat-btn-desktop.active {
          background: #8B5E3C;
          color: white;
          border-color: #8B5E3C;
          box-shadow: 0 4px 16px rgba(139,94,60,0.35);
          transform: translateX(5px);
        }
        .cat-btn-desktop.active:hover { background: #7A5233; border-color: #7A5233; }

        .cat-btn-mobile {
          padding: 9px 18px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          border: 1.5px solid #C4A882;
          white-space: nowrap;
          cursor: pointer;
          background: white;
          color: #3E2003;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .cat-btn-mobile:hover { background: #F5EDE0; border-color: #8B5E3C; color: #8B5E3C; }
        .cat-btn-mobile:active { transform: scale(0.94); }
        .cat-btn-mobile.active {
          background: #8B5E3C;
          color: white;
          border-color: #8B5E3C;
          box-shadow: 0 3px 12px rgba(139,94,60,0.35);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes floatCup {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.6; transform: translateY(-8px) scaleX(1.1); }
          100% { opacity: 0; transform: translateY(-16px) scaleX(0.8); }
        }
        .float-cup { animation: floatCup 3s ease-in-out infinite; }
        .steam-1 { animation: steamRise 2s ease-in-out infinite; }
        .steam-2 { animation: steamRise 2s ease-in-out infinite 0.4s; }
        .steam-3 { animation: steamRise 2s ease-in-out infinite 0.8s; }
      `}</style>

      {/* ── MOBILE horizontal pill bar ── */}
      {mobile && (
        <div style={{
          background: 'white',
          borderTop: '2px solid #C4A882',
          borderBottom: '2px solid #C4A882',
          boxShadow: '0 4px 12px rgba(139,94,60,0.1)',
        }}>
          <div className="px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cat-btn-mobile ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP vertical sidebar ── */}
      {!mobile && (
        <div
          className="sticky flex flex-col px-4 py-6"
          style={{
            top: '132px',
            alignSelf: 'flex-start',
            borderRight: '2px solid #C4A882',
          }}
        >
          {/* Category buttons */}
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cat-btn-desktop ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Decorative animated section below categories */}
          <div className="mt-8 flex flex-col items-center gap-2 py-4"
            style={{ borderTop: '1px dashed #C4A882' }}>

            {/* Animated coffee cup */}
            <div className="relative flex flex-col items-center">
              {/* Steam lines */}
              <div className="flex gap-2 mb-1 h-5 items-end">
                <div className="steam-1 w-0.5 h-3 rounded-full" style={{ background: '#C4A882' }} />
                <div className="steam-2 w-0.5 h-4 rounded-full" style={{ background: '#C4A882' }} />
                <div className="steam-3 w-0.5 h-3 rounded-full" style={{ background: '#C4A882' }} />
              </div>
              <span className="float-cup text-3xl">☕</span>
            </div>

            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#C4A882' }}>
              Est. 2026
            </p>

            <p className="text-center text-[11px] leading-relaxed"
              style={{ color: '#C4A882', maxWidth: '120px' }}>
              Brewed with love daily
            </p>

            {/* Decorative dots */}
            <div className="flex gap-1.5 mt-2">
              {[0, 0.3, 0.6].map((delay, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#C4A882',
                    animation: `floatCup 2s ease-in-out infinite ${delay}s`,
                  }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}