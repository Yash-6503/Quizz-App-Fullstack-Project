import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // adjust path if needed

const Quizz = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Redirect to login if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Fetch quiz questions
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/quizz/get/${id}`)
                .then(response => {
                    setQuestions(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to load quiz questions.');
                    setLoading(false);
                });
        }
    }, [id, user]);

    // Answer selection
    const handleSelect = (questionId, selectedAnswer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedAnswer
        }));
    };

    // Submit quiz and show result
    const handleSubmit = async () => {
        if (Object.keys(answers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const responseList = questions.map(q => ({
            id: q.id,
            response: answers[q.id]
        }));

        try {
            const res = await axios.post(
                `http://localhost:8080/quizz/submit/${id}`,
                responseList,
                { headers: { "Content-Type": "application/json" } }
            );
            setScore(res.data);
            setSubmitted(true);
            setShowModal(true);
        } catch (err) {
            console.error("Submission error:", err);
            alert("Failed to submit quiz.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 relative">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Quiz #{id}</h1>

            {loading && <p className="text-center text-gray-500">Loading questions...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && questions.length > 0 && (
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={question.id} className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                {index + 1}. {question.questionTitle}
                            </h2>

                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 text-base">
                                {[question.option1, question.option2, question.option3, question.option4].map((opt, idx) => {
                                    const optionLabel = String.fromCharCode(65 + idx);
                                    const selected = answers[question.id] === opt;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelect(question.id, opt)}
                                            className={`px-4 py-2 border rounded text-left transition
                      ${selected
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"}`}
                                        >
                                            {optionLabel}. {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {!submitted && (
                        <div className="text-center mt-8">
                            <button
                                onClick={handleSubmit}
                                className="text-2xl px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                            >
                                Submit Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ✅ Result Modal with userName */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-90 text-center">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Quiz Result</h2>
                        <p className="text-lg text-gray-800 mb-6">
                            {user?.userName} - You have scored <span className="font-bold">{score}</span> out of {questions.length} marks.
                        </p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setSubmitted(false);
                            }}
                            className="text-xl px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizz;
