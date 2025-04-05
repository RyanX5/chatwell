import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition duration-300">
            ChatWell
          </Link>
        </div>
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/features" className="hover:text-gray-200 transition duration-300">Features</Link>
          <Link to="/about" className="hover:text-gray-200 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-gray-200 transition duration-300">Contact</Link>
        </div>
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
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 mt-2 rounded-md">
          <Link to="/" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Home</Link>
          <Link to="/features" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Features</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">About</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-white hover:bg-blue-800 transition duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;