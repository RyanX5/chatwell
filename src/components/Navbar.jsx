import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-200">
            ChatWell
          </a>
        </div>

        {/* Navbar Links */}
        <div className="flex space-x-6">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/about" className="hover:text-gray-200">About</a>
          <a href="/contact" className="hover:text-gray-200">Contact</a>
        </div>

        {/* Mobile menu toggle (optional for later) */}
        <div className="lg:hidden">
          <button className="text-white">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
