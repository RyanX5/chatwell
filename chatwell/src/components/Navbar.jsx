import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-200 transition duration-300">
            ChatWell
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <a href="/" className="hover:text-gray-200 transition duration-300">Home</a>
          <a href="/about" className="hover:text-gray-200 transition duration-300">Features</a>
          <a href="/about" className="hover:text-gray-200 transition duration-300">About</a>
          <a href="/contact" className="hover:text-gray-200 transition duration-300">Contact</a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200 transition duration-300"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 mt-2 rounded-md">
          <a href="/" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Home</a>
          <a href="/contact" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Features</a>
          <a href="/about" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">About</a>
          <a href="/contact" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
