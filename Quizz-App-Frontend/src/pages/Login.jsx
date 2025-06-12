import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login } = useAuth();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setUser(null);
    setShowModal(false);

    try {
      const res = await axios.post(
        `http://localhost:8080/auth/login`,
        {},
        {
          params: {
            username: formData.username,
            password: formData.password
          }
        }
      );

      if (res.data && res.data.length > 0) {
        setUser(res.data[0]);
        login(res.data[0]);
        setShowModal(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check credentials or try again later.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login to QuizApp</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-700 font-medium text-xl">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="text-lg w-full text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium text-xl">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full text-lg text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full text-xl cursor-pointer bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Login
          </button>
        </form>

        {/* ✅ Signup Option */}
        <div className="mt-6 text-center text-gray-700 text-lg">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-600 font-semibold ml-1 hover:underline">
            Signup here
          </Link>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && user && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md text-center">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">Welcome, {user.name || user.userName || 'User'}!</h2>
            <p className="text-gray-700 text-lg">You're successfully logged in 🎉</p>
            <Link to="/">
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-6 py-2 cursor-pointer text-2xl bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
