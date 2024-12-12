// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Guide Mitra. All rights reserved.</p>
        <p className="mt-2">
          <a href="https://www.privacypolicy.com" className="hover:text-blue-400 transition">Privacy Policy</a> |{' '}
          <a href="https://www.termsandconditions.com" className="hover:text-blue-400 transition">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
