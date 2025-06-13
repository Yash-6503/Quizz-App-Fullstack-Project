import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

        // Optional: Simple validation
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
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Question</h2>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Question Title</label>
                        <input
                            type="text"
                            name="questionTitle"
                            value={formData.questionTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter question title"
                        />
                    </div>

                    {['option1', 'option2', 'option3', 'option4'].map((opt, i) => (
                        <div key={opt}>
                            <label className="block mb-1 font-medium">Option {i + 1}</label>
                            <input
                                type="text"
                                name={opt}
                                value={formData[opt]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder={`Enter option ${i + 1}`}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block mb-1 font-medium">Right Answer</label>
                        <input
                            type="text"
                            name="rightAnswer"
                            value={formData.rightAnswer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter correct answer"
                        />
                    </div>

                    <div>
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
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g., Java, Python, any Category.."
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-md"
                        >
                            Add Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;
