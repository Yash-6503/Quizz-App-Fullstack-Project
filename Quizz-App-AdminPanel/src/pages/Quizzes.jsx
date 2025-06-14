import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/allQuizzes');
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load quizzes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/admin/delete/quizz/${id}`);
      setQuizzes(prev => prev.filter(quiz => quiz.quizz_id !== id));
      alert('Quiz deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete quiz');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/quizz/updateQuiz/${id}`);
  };

  const handleView = (id) => {
    navigate(`/quizz/${id}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Quizzes</h2>
          <Link
            to="/quizz/add"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Add Quiz
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading quizzes...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : quizzes.length === 0 ? (
          <p className="text-center text-gray-600">No quizzes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {quizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.quizz_id}
                      className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{quiz.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Description:</strong> {quiz.description}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Max Marks:</strong> {quiz.numberOfQuestions}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Number of Questions:</strong> {quiz.numberOfQuestions}
                </p>
                <div className="flex space-x-3 mt-4">
                  <button
                          onClick={() => handleView(quiz.quizz_id)}
                          className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-4 py-1 rounded-md text-sm flex items-center justify-center"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                          onClick={() => handleUpdate(quiz.quizz_id)}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>
                  <button
                          onClick={() => handleDelete(quiz.quizz_id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
                    </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Quizzes;
