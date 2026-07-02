import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL;

const inputClass =
  'w-full px-4 py-2.5 bg-gray-700/70 text-white rounded-lg border border-transparent placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', autoComplete: 'name' },
  { name: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username', autoComplete: 'username' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Choose a password', autoComplete: 'new-password' },
  { name: 'languagePreference', label: 'Language Preference', type: 'text', placeholder: 'e.g. Hindi', autoComplete: 'off' },
  { name: 'country', label: 'Country', type: 'text', placeholder: 'e.g. India', autoComplete: 'country-name' },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    languagePreference: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError('Registration failed. That username may already be taken.');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <label htmlFor={field.name} className="block text-sm text-gray-300">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            className={inputClass}
            required
          />
        </div>
      ))}

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? 'Creating account…' : 'Register'}
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
