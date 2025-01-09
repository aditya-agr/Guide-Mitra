import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-bold">Guide Mitra</h1>
        <nav className="w-full sm:w-auto mt-4 sm:mt-0 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <Link to="/" className="hover:text-blue-400 transition text-base sm:text-lg">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition text-base sm:text-lg">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition text-base sm:text-lg">
            Contact
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-600 text-sm sm:text-base px-4 py-2 rounded hover:bg-red-500 transition w-full sm:w-auto"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-sm sm:text-base px-4 py-2 rounded hover:bg-blue-500 transition w-full sm:w-auto text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-sm sm:text-base px-4 py-2 rounded hover:bg-green-500 transition w-full sm:w-auto text-center"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
