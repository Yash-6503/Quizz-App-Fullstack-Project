import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuizz = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    numberOfQuestions: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        numberOfQuestions: parseInt(formData.numberOfQuestions)
      };

      const response = await axios.post(
        'http://localhost:8080/admin/addQuizz',
        payload
      );

      setMessage('Quiz added successfully!');
      setFormData({
        title: '',
        description: '',
        numberOfQuestions: ''
      });

      alert(message);

      // navigate(`/quizzes`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add quiz. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Add New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Quiz Category</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter quiz category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter quiz description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Number of Questions</label>
          <input
            type="number"
            name="numberOfQuestions"
            value={formData.numberOfQuestions}
            onChange={handleChange}
            placeholder="e.g. 10"
            required
            min={1}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Add Quiz
        </button>
      </form>

      {/* {message && (
        alert("Quizz added successfully....")
      )} */}
    </div>
  );
};

export default AddQuizz;
