import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/admin/allQuestions');
      setQuestions(res.data);
      extractUniqueCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load questions');
      setLoading(false);
    }
  };

  const extractUniqueCategories = (questionsData) => {
    const unique = [...new Set(questionsData.map((q) => q.category))];
    setCategories(unique);
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '') {
      fetchAllQuestions();
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/admin/category/${category}`);
      setQuestions(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching by category:', err);
      setError('Failed to filter questions by category');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    try {
      await axios.delete(`http://localhost:8080/admin/delete/question/${id}`);
      alert('Question deleted successfully');

      if (selectedCategory) {
        const res = await axios.get(`http://localhost:8080/admin/category/${selectedCategory}`);
        setQuestions(res.data);
      } else {
        fetchAllQuestions();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete question');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-question/${id}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          All Questions
        </motion.h2>

        <motion.div
          className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/question/add"
            className="bg-green-600 hover:bg-green-700 cursor-pointer px-4 py-2 font-medium rounded text-white text-md w-full md:w-auto text-center transition"
          >
            Add Question
          </Link>

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border text-md border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-600">No questions found.</p>
        ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
            {questions.map((q) => (
              <motion.div
                key={q.question_id || q.id}
                className="border border-gray-300 p-4 rounded-md shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="mb-2 text-lg font-medium text-gray-800">{q.questionTitle}</div>
                <ul className="list-disc pl-6 text-gray-700 mb-2">
                  <li>Option 1: {q.option1}</li>
                  <li>Option 2: {q.option2}</li>
                  <li>Option 3: {q.option3}</li>
                  <li>Option 4: {q.option4}</li>
                </ul>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Answer:</strong> {q.rightAnswer} |{' '}
                  <strong>Category:</strong> {q.category} |{' '}
                  <strong>Difficulty:</strong> {q.difficultyLevel}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdate(q.question_id || q.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(q.question_id || q.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
                </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Questions;
