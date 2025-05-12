// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User } from "lucide-react";
import AuthModel from "../Components/AuthModel";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">(
    "login"
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const openAuthModal = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="w-full px-6 py-0.5 bg-gradient-to-r from-white via-gray-100 to-blue-100 text-gray-900 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="bg-white p-2 hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/assets/Logo.jpg"
              alt="NECK BRACE Logo"
              width={80}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Search Bar - Hidden on small screens */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white rounded-lg px-3 py-3 shadow-sm ring-1 ring-gray-200 focus-within:ring-blue-400"
          >
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm w-100 md:w-170"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <Search size={18} className="text-gray-600" />
            </button>
          </form>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6 text-gray-900 font-medium text-sm">
              <li className="hover:text-yellow-600">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-yellow-600">
                <Link href="/blog">About us</Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openAuthModal("login")}
                className="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-yellow-600"
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => openAuthModal("register")}
                className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-gray-900 px-4 py-2 rounded text-sm font-medium"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 px-4 py-2 space-y-3 bg-white shadow rounded text-sm">
            {/* Mobile Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <Search size={18} className="text-gray-600" />
              </button>
            </form>

            <Link href="/" onClick={toggleMenu} className="block text-gray-700">
              Home
            </Link>
            <Link
              href="/products"
              onClick={toggleMenu}
              className="block text-gray-700"
            >
              Products
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="block text-gray-700"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="block text-gray-700"
            >
              Contact
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-2 space-y-2 border-t border-gray-200">
              <button
                onClick={() => {
                  openAuthModal("login");
                  toggleMenu();
                }}
                className="w-full text-left text-gray-700 hover:text-blue-600"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openAuthModal("register");
                  toggleMenu();
                }}
                className="w-full text-left text-blue-600 hover:text-blue-800"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModel
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
