import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, quizzesRes, questionsRes] = await Promise.all([
        axios.get('http://localhost:8080/admin/totalUsers'),
        axios.get('http://localhost:8080/admin/totalQuizzes'),
        axios.get('http://localhost:8080/admin/totalQuestions'),
      ]);

      setTotalUsers(usersRes.data);
      setTotalQuizzes(quizzesRes.data);
      setTotalQuestions(questionsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Admin Dashboard
      </motion.h1>

      {loading ? (
        <div className="text-center text-xl font-semibold">Loading data...</div>
      ) : (
        <>
            <motion.div
              className="flex justify-center items-center pb-5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <img
                src="https://img.freepik.com/premium-psd/dashboard-3d-vector-icon-illustration-asset_509353-91.jpg"
                alt="dashboard"
                className="h-60 rounded-full"
              />
            </motion.div>

            <motion.div
              className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
            {/* Total Users Card */}
            <Link to="/users">
                <motion.div
                  className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-indigo-500 hover:shadow-2xl hover:scale-105 transition duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                <p className="text-4xl font-bold text-indigo-600 mt-2">{totalUsers}</p>
                </motion.div>
            </Link>

            {/* Total Quizzes Card */}
            <Link to="/quizzes">
                <motion.div
                  className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-green-500 hover:shadow-2xl hover:scale-105 transition duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                <h2 className="text-xl font-semibold text-gray-700">Total Quizzes</h2>
                <p className="text-4xl font-bold text-green-600 mt-2">{totalQuizzes}</p>
                </motion.div>
            </Link>

            {/* Total Questions Card */}
            <Link to="/questions">
                <motion.div
                  className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-yellow-500 hover:shadow-2xl hover:scale-105 transition duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                <h2 className="text-xl font-semibold text-gray-700">Total Questions</h2>
                <p className="text-4xl font-bold text-yellow-600 mt-2">{totalQuestions}</p>
                </motion.div>
            </Link>
            </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
