// RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    languagePreference: '',
    country: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.username || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    console.log(formData);
    // Send login request to backend (e.g., using fetch or axios)
    try {
      // Example API call to backend (replace with actual backend URL and logic)
      const response = await fetch('http://guide-mitra.onrender.com:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Handle successful login (redirect or update UI)
        console.log('Registration successful');
        navigate("/");
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-white block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="text-white block mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="text-white block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="text-white block mb-1">Language Preference</label>
        <input
          type="text"
          name="languagePreference"
          value={formData.languagePreference}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="text-white block mb-1">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
