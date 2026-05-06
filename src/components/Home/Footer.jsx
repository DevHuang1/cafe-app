export default function Footer() {
  return (
    <footer className="bg-bg-sidebar text-text-light p-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-primary-light text-2xl font-bold mb-4">Café App</h2>
          <p className="text-secondary">
            Serving the finest aesthetic brews since 2026. Join us for a minimalist coffee experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-secondary">
            <li className="hover:text-accent cursor-pointer">Our Menu</li>
            <li className="hover:text-accent cursor-pointer">Visit Us</li>
            <li className="hover:text-accent cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-secondary">123 Aesthetic St, Mandalay</p>
          <p className="text-secondary italic">Open Daily: 8:00 AM - 10:00 PM</p>
        </div>
      </div>
      
      <div className="border-t border-border mt-10 pt-6 text-center text-secondary text-sm">
        <p>© 2026 Café Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}
