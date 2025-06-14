import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdminAuth } from '../context/AdminAuthContext'; // adjust path
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:8080/admin/login?email=${adminData.email}&password=${adminData.password}`
      );

      const admin = response.data;

      alert("Welcome Admin " + admin.adminName);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600  flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full bg-white shadow-lg rounded-lg p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-center text-indigo-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Admin Login
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-md font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="admin@quizz.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-md font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="********"
            />
          </motion.div>

          {error && (
            <motion.p
              className="text-red-600 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full text-md font-medium  bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 cursor-pointer"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-md text-center text-gray-600">
          Not an admin?{' '}
          <span
            className="text-indigo-600  font-medium hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Signup here
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
