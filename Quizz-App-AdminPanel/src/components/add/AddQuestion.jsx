import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddQuestion = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        questionTitle: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        rightAnswer: '',
        difficultyLevel: '',
        category: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const {
            questionTitle, option1, option2, option3, option4,
            rightAnswer, difficultyLevel, category
        } = formData;

        if (
            !questionTitle || !option1 || !option2 || !option3 || !option4 ||
            !rightAnswer || !difficultyLevel || !category
        ) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/admin/addQuestion', formData);
            alert('Question added successfully!');
            navigate('/questions');
        } catch (err) {
            console.error(err);
            setError('Failed to add question.');
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="text-2xl font-bold text-center text-gray-800 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Add New Question
                </motion.h2>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Question Title', name: 'questionTitle', placeholder: 'Enter question title' },
                        { label: 'Option 1', name: 'option1', placeholder: 'Enter option 1' },
                        { label: 'Option 2', name: 'option2', placeholder: 'Enter option 2' },
                        { label: 'Option 3', name: 'option3', placeholder: 'Enter option 3' },
                        { label: 'Option 4', name: 'option4', placeholder: 'Enter option 4' },
                        { label: 'Right Answer', name: 'rightAnswer', placeholder: 'Enter correct answer' },
                        { label: 'Category', name: 'category', placeholder: 'e.g., Java, Python, etc.' }
                    ].map((field, i) => (
                        <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <label className="block mb-1 font-medium">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder={field.placeholder}
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <label className="block mb-1 font-medium">Difficulty Level</label>
                        <select
                            name="difficultyLevel"
                            value={formData.difficultyLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                    >
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            Add Question
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddQuestion;
