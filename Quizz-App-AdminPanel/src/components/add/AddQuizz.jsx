import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddQuizz = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    numberOfQuestions: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

      await axios.post('http://localhost:8080/admin/addQuizz', payload);

      setMessage('Quiz added successfully!');
      alert('Quiz added successfully!');
      setFormData({
        title: '',
        description: '',
        numberOfQuestions: ''
      });

      // navigate('/quizzes');
    } catch (error) {
      console.error(error);
      setMessage('Failed to add quiz. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-xl w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6 text-indigo-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Add New Quiz
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: 'Quiz Category',
              name: 'title',
              type: 'text',
              placeholder: 'Enter quiz category'
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              placeholder: 'Enter quiz description'
            },
            {
              label: 'Number of Questions',
              name: 'numberOfQuestions',
              type: 'number',
              placeholder: 'e.g. 10'
            }
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <label className="block text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              ) : (
                <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    min={field.name === 'numberOfQuestions' ? 1 : undefined}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Add Quiz
          </motion.button>
        </form>

        {message && (
          <motion.p
            className={`mt-4 text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddQuizz;
