// src/components/LoginForm.js
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Send login request to backend (e.g., using fetch or axios)
    try {
      // Example API call to backend (replace with actual backend URL and logic)
      const response = await fetch('https://guide-mitra.onrender.com:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username":username, "password":password }),
      });

      if (!response.ok) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Handle successful login (redirect or update UI)
        login();
        console.log('Login successful');
        navigate("/");
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your username"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
