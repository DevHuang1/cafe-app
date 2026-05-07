
export default function Footer() {
  return (
    <footer className="bg-[#8B5E3C] text-white pt-16 pb-12 mt-0">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-white text-4xl font-bold tracking-tight mb-4">
            Café App
          </h2>
          <p className="text-white/90 text-[15px] max-w-xs">
            Serving the finest aesthetic brews since 2026.
          </p>
          
          <div className="mt-8 w-24 h-1 bg-white/30 rounded-full"></div>
        </div>
     
        {/* Quick Links */}
        <div className="md:text-center">
          <h3 className="text-white font-semibold text-lg mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3 text-white/80">
            <li className="hover:text-white hover:translate-x-3 transition-all cursor-pointer">Our Menu</li>
            <li className="hover:text-white hover:translate-x-3 transition-all cursor-pointer">Visit Us</li>
            <li className="hover:text-white hover:translate-x-3 transition-all cursor-pointer">Book a Table</li>
            <li className="hover:text-white hover:translate-x-3 transition-all cursor-pointer">Events</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:text-right">
          <h3 className="text-white font-semibold text-lg mb-6">
            Contact Us
          </h3>
          <div className="space-y-4 text-white/80">
            <p>
              No.79 Myakywantha Street,<br />
              Yangon, Myanmar
            </p>
            
            <p className="italic">Open Daily: 8:00 AM – 7:00 PM</p>

            <div>
              <p className="text-sm opacity-75 mb-1">Phone</p>
              <p className="hover:text-white transition-colors cursor-pointer">
                +95 9 123 4567
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-16 pt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© 2026 Café Management System. All Rights Reserved.</p>
          
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
