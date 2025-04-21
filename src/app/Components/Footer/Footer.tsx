"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Shop Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Z7 Performance</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/neck-braces"
                  className="hover:text-blue-400 transition"
                >
                  Neck Braces & Supports
                </Link>
              </li>
              <li>
                <Link
                  href="/products/gloves"
                  className="hover:text-blue-400 transition"
                >
                  Performance Gloves
                </Link>
              </li>
              <li>
                <Link
                  href="/products/arm-sleeves"
                  className="hover:text-blue-400 transition"
                >
                  Compression Arm Sleeves
                </Link>
              </li>
              <li>
                <Link
                  href="/products/recovery-gear"
                  className="hover:text-blue-400 transition"
                >
                  Recovery Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products/bundles"
                  className="hover:text-blue-400 transition"
                >
                  Performance Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                <span>123 Performance Way, Boston, MA 02115</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span>(800) 555-Z7PF</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>support@z7performance.com</span>
              </li>
              <li className="flex items-center">
                <FaShieldAlt className="mr-2" />
                <span>30-Day Money Back Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Z7 Performance
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition">
                  Training Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/athletes"
                  className="hover:text-blue-400 transition"
                >
                  Pro Athletes
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-blue-400 transition"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="hover:text-blue-400 transition"
                >
                  Warranty Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Join the Z7 Community
            </h3>
            <p className="mb-4 text-gray-300">
              Get exclusive offers, training tips, and early access to new
              products.
            </p>
            <form className="flex mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition"
              >
                Subscribe
              </button>
            </form>

            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-400 transition"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-blue-400 transition"
            >
              Z7<span className="text-blue-400">PERFORMANCE</span>
            </Link>
          </div>
          <div className="text-sm text-gray-400 mb-4 md:mb-0 text-center">
            <p>
              © {currentYear} Z7 Performance Technologies. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
