import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });

      const data = await response.json();

      if (response.ok && data.exists) {
        navigate('/resetpassword', { state: { email, username } });
      } else {
        setError('User not found. Please check your details.');
      }
    } catch (err) {
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl_rWOW5qk0SL2geZYe_VoSWTsHXP-1XnSL0IR4G-1A6WeAsX-XEqypA&s')",
      }}
    >
      <div className="w-full max-w-md mx-auto p-6 sm:p-8">
        <div className="bg-gray-800 bg-opacity-90 rounded-xl shadow-xl p-8 space-y-6 transform transition-all duration-300 hover:scale-105">
          <h1 className="text-2xl font-extrabold text-white text-center tracking-tight">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all duration-200"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-3 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none transition-all duration-200"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}