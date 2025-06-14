import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    password: '',
    phoneNo: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...formData,
        phoneNo: parseInt(formData.phoneNo)
      };

      await axios.post('http://localhost:8080/admin/signup', payload);
      alert('Admin signed up successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block font-medium text-gray-700">Admin Name</label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </motion.div>

          {error && (
            <motion.p
              className="text-sm text-red-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full text-md font-medium cursor-pointer bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            whileTap={{ scale: 0.96 }}
          >
            Signup
          </motion.button>
        </form>

        <p className="mt-4 text-md text-center text-gray-600">
          Already an admin?{' '}
          <span
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
