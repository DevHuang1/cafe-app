"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          display: inline-block;
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 4px 0;
          position: relative;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: white;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .footer-link:hover {
          color: white;
          transform: translateX(6px);
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:active { transform: translateX(6px) scale(0.97); }

        .footer-legal-link {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
        }
        .footer-legal-link:hover {
          color: white;
          background: rgba(255,255,255,0.12);
        }
        .footer-legal-link:active {
          background: rgba(255,255,255,0.2);
        }

        .footer-phone {
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s, letter-spacing 0.2s;
          display: inline-block;
        }
        .footer-phone:hover {
          color: white;
          letter-spacing: 0.04em;
        }
      `}</style>

      <footer className="bg-[#8B5E3C] text-white pt-16 pb-12 mt-0">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-white text-4xl font-bold tracking-tight mb-4">
              Café App
            </h2>
            <p className="text-white/85 text-[15px] leading-relaxed max-w-xs">
              Serving the finest aesthetic brews since 2026. Come for the coffee, stay for the moments.
            </p>
            <div className="mt-8 w-24 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h3 className="text-white font-bold text-xl mb-6 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li><Link href="/menu" className="footer-link">Our Menu</Link></li>
              <li><Link href="/about" className="footer-link">Visit Us</Link></li>
              <li><Link href="/booking" className="footer-link">Book a Table</Link></li>
              <li><Link href="/events" className="footer-link">Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h3 className="text-white font-bold text-xl mb-6 tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-4 text-white/80 text-[15px] leading-relaxed">
              <p>
                No.79 Myakywantha Street,<br />
                Yangon, Myanmar
              </p>
              <p className="italic text-white/70">Open Daily: 8:00 AM – 7:00 PM</p>
              <div>
                <p className="text-sm text-white/50 mb-1 uppercase tracking-widest">Phone</p>
                <span className="footer-phone">+95 9 123 4567</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[14px] text-white/65">
              © 2026 Café Management System. All Rights Reserved.
            </p>
            <div className="flex gap-2">
              <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
              <span className="text-white/30 self-center">·</span>
              <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}