import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-white/10 text-gray-400 py-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="text-gray-300 font-medium">Guide Mitra</span>. All rights reserved.
        </p>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/about" className="hover:text-amber-400 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-amber-400 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
