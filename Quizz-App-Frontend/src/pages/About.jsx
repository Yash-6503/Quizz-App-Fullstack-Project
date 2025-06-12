import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12 px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">About QuizMaster</h1>
        <p className="text-gray-700 text-lg">
          QuizMaster is an interactive platform designed to test your knowledge, sharpen your skills, and make learning fun.
          Whether you're a student, a professional, or just curious – we’ve got something for everyone!
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb size={40} className="mx-auto text-indigo-600 mb-4" />
          <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Innovative Quizzes</h3>
          <p className="text-gray-600 text-xl">
            Challenge yourself with dynamic quizzes on various topics. From beginner to expert levels, there's always something new to explore.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <Users size={40} className="mx-auto text-indigo-600 mb-4" />
          <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Community Driven</h3>
          <p className="text-gray-600 text-xl">
            Learn and compete with fellow quiz enthusiasts. See how you rank on the leaderboard and share your achievements!
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <ShieldCheck size={40} className="mx-auto text-indigo-600 mb-4" />
          <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Secure & Reliable</h3>
          <p className="text-gray-600 text-xl">
            Your data and progress are securely handled with modern technologies. Enjoy a smooth and safe quiz experience.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-xl text-gray-700">Created with ❤️ by passionate developers who believe learning can be fun!</p>
      </motion.div>
    </div>
  );
};

export default About;
