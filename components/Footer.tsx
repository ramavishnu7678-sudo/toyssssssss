import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold font-display mb-4 flex items-center">
              <span className="text-3xl mr-2">🧸</span>
              WonderToys
            </h3>
            <p className="text-white/80">
              Bringing joy and fun to kids everywhere with safe, high-quality toys for all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-white/80 hover:text-accent-300 transition">
                  Shop All Toys
                </Link>
              </li>
              <li>
                <Link href="/products?category=Educational" className="text-white/80 hover:text-accent-300 transition">
                  Educational Toys
                </Link>
              </li>
              <li>
                <Link href="/products?category=Soft+Toys" className="text-white/80 hover:text-accent-300 transition">
                  Soft Toys
                </Link>
              </li>
              <li>
                <Link href="/products?category=Action+Figures" className="text-white/80 hover:text-accent-300 transition">
                  Action Figures
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent-300 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/80 hover:text-accent-300 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-accent-300 transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-accent-500 transition"
              >
                <FiFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-accent-500 transition"
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-accent-500 transition"
              >
                <FiInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-accent-500 transition"
              >
                <FiMail />
              </a>
            </div>
            <p className="mt-4 text-white/80 text-sm">
              Subscribe to our newsletter for exclusive deals!
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 WonderToys. All rights reserved. Made with ❤️ for kids!</p>
        </div>
      </div>
    </footer>
  )
}

