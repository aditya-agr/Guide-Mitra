// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">Guide Mitra</h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">Login</Link>
              <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
