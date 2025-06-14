import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Quizz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/quizz/${id}`);
                setQuiz(res.data);
            } catch (error) {
                console.error("Failed to fetch quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10 text-lg font-medium">Loading quiz...</div>;
    }

    if (!quiz) {
        return <div className="text-center text-red-600 font-semibold py-10">Quiz not found!</div>;
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto my-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-gray-100 rounded-lg shadow-md p-6 border-l-4 border-indigo-500 mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">{quiz.title}</h1>
                <p className="text-gray-700 text-md">{quiz.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                    Total Questions: <span className="font-semibold">{quiz.numberOfQuestions}</span>
                </p>
            </motion.div>

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
                {quiz.questions.map((q, index) => (
                    <motion.div
                        key={q.question_id}
                        className="bg-gray-50 p-5 rounded-md shadow hover:shadow-lg border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-indigo-500 font-semibold">#{index + 1}</span>
                            <span className="text-sm text-gray-600">{q.difficultyLevel}</span>
                        </div>
                        <h2 className="text-lg font-medium text-gray-800 mb-2">{q.questionTitle}</h2>
                        <ul className="list-disc pl-5 text-gray-700 mb-2 space-y-1">
                            <li>A. {q.option1}</li>
                            <li>B. {q.option2}</li>
                            <li>C. {q.option3}</li>
                            <li>D. {q.option4}</li>
                        </ul>
                        <p className="text-base text-green-600 font-semibold">
                            Correct Answer: <span className="text-gray-800">{q.rightAnswer}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Category: {q.category}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Quizz;
