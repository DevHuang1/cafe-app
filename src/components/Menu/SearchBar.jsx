'use client';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) onSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <style>{`
        .search-input {
          width: 100%;
          padding: 14px 48px 14px 48px;
          background: white;
          border: 1.5px solid #D4B9A5;
          border-radius: 14px;
          color: #1F0F07;
          font-size: 15px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .search-input::placeholder { color: #b59484; }
        .search-input:hover { border-color: #8B5E3C; }
        .search-input:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 4px rgba(139,94,60,0.1);
        }

        .search-btn {
          padding: 14px 32px;
          background: #8B5E3C;
          color: white;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.04em;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .search-btn:hover {
          background: #7A5233;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139,94,60,0.3);
        }
        .search-btn:active {
          transform: translateY(0) scale(0.97);
          box-shadow: none;
        }

        .clear-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: #e8ddd5;
          border: none;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #8B5E3C;
          transition: background 0.2s, transform 0.15s;
        }
        .clear-btn:hover { background: #d4c4b8; transform: translateY(-50%) scale(1.1); }
        .clear-btn:active { transform: translateY(-50%) scale(0.92); }
      `}</style>

      <div
        className="w-full z-40 transition-all duration-300"
        style={{
          position: 'sticky',
          top: '87px',
          marginTop: '12px',
          backgroundColor: scrolled ? 'rgba(237,224,212,0.97)' : '#EDE0D4',
          borderBottom: '1px solid #D4B9A5',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(139,94,60,0.12)' : 'none',
          padding: scrolled ? '10px 0' : '20px 0',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-3 items-center">

            {/* Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b59484] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-btn" onClick={handleClear} type="button">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Button */}
            <button onClick={handleSearch} className="search-btn" type="button">
              Search
            </button>

          </div>
        </div>
      </div>
    </>
  );
}