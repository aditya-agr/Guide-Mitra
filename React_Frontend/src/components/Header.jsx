import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-base transition-colors ${
    isActive ? 'text-amber-400 font-semibold' : 'text-gray-300 hover:text-white'
  }`;

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={closeMenu} end>
        Home
      </NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
        Contact
      </NavLink>
    </>
  );

  const authButtons = isAuthenticated ? (
    <button
      onClick={() => {
        logout();
        closeMenu();
      }}
      className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-gray-200 hover:bg-red-600 hover:text-white transition-colors w-full sm:w-auto"
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        onClick={closeMenu}
        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-200 border border-white/20 hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
      >
        Login
      </Link>
      <Link
        to="/register"
        onClick={closeMenu}
        className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors w-full sm:w-auto text-center"
      >
        Register
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🌏</span>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Guide Mitra
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks}
          <div className="flex items-center gap-3">{authButtons}</div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="sm:hidden flex flex-col gap-4 px-4 pb-4 border-t border-white/10 pt-4">
          {navLinks}
          <div className="flex flex-col gap-2">{authButtons}</div>
        </nav>
      )}
    </header>
  );
};

export default Header;
