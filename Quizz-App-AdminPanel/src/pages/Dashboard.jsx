import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

      {loading ? (
        <div className="text-center text-xl font-semibold">Loading data...</div>
      ) : (
        <>
          <div className='flex justify-center items-center pb-5'>
              <img src="https://img.freepik.com/premium-psd/dashboard-3d-vector-icon-illustration-asset_509353-91.jpg" alt="dashboard" className='h-60 rounded-full' />
          </div>  
          <div className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Total Users Card */}
            <Link to="/users">
                <div className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-indigo-500 hover:shadow-2xl hover:scale-105 transition duration-300">
                <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                <p className="text-4xl font-bold text-indigo-600 mt-2">{totalUsers}</p>
              </div>
            </Link>

            {/* Total Quizzes Card */}
            <Link to="/quizzes">
                <div className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-green-500 hover:shadow-2xl hover:scale-105 transition duration-300">

                <h2 className="text-xl font-semibold text-gray-700">Total Quizzes</h2>
                <p className="text-4xl font-bold text-green-600 mt-2">{totalQuizzes}</p>
              </div>
            </Link>

            {/* Total Questions Card */}
            <Link to="/questions">
                <div className="bg-gray-100 shadow-xl shadow-gray-400 rounded-lg p-6 border-l-4 border-yellow-500 hover:shadow-2xl hover:scale-105 transition duration-300">

                <h2 className="text-xl font-semibold text-gray-700">Total Questions</h2>
                <p className="text-4xl font-bold text-yellow-600 mt-2">{totalQuestions}</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
