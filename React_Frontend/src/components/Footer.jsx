import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm sm:text-base text-center">
          &copy; {new Date().getFullYear()} Guide Mitra. All rights reserved.
        </p>
        <p className="mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base text-center">
          <a href="https://www.privacypolicy.com" className="hover:text-blue-400 transition">
            Privacy Policy
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="https://www.termsandconditions.com" className="hover:text-blue-400 transition">
            Terms & Conditions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
