import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 Hook to navigate

  // Fetch quizzes on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/quizz/getQuizzes')
      .then((response) => {
        setQuizzes(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch quizzes.');
        setLoading(false);
      });
  }, []);

  const handleStartQuiz = (quizId) => {
    navigate(`/quizz/${quizId}`); // 👈 Navigate to quiz details page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Available Quizzes</h1>

      {loading && <p className="text-center text-gray-500">Loading quizzes...</p>}
      {error &&
        <p className="text-center text-red-500 font-medium">
          <div className="img flex justify-center items-center">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--office-computer-digital-work-business-pack-illustrations-7265556.png" className='h-80' alt="" />
          </div>
          {error}
        </p>
      }

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-2xl">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-gray-100 text-center rounded-2xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100">
            <h2 className="text-xl font-semibold text-indigo-600">{quiz.questionTitle}</h2>
            <p className="text-gray-700 mt-2">Category: {quiz.questionTitle} Basics</p>
            <p className="text-sm text-gray-500 mt-1">Created On: {quiz.date || "N/A"}</p>
            <button
              onClick={() => handleStartQuiz(quiz.id)}
              className="mt-4 px-4 py-2 text-xl bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
