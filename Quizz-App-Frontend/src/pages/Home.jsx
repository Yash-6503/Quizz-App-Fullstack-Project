import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SparklesCore from "../components/ui/SparklesCore"; // adjust relative path
import myVideo from '../assets/OnlineExam.mp4'; // adjust path based on location

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-white to-blue-100">
      {/* Sparkling Background */}
      <div className="relative">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="absolute inset-0 w-full h-full z-0"
        />

        <section className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-24 py-20 max-w-7xl mx-auto">
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-indigo-800">
              Empower Your Brain with <span className="text-indigo-600">QuizMaster</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dive into exciting quizzes, learn on the go, and conquer knowledge across every topic. Whether you're preparing for exams or just love trivia, we've got you covered!
            </p>
            <div className="flex space-x-4 pt-4">
              <Link
                to="/quizzes"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
              >
                Start Now
              </Link>
              <Link
                to="/about"
                className="text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium text-lg hover:bg-indigo-50 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 mt-10 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            {/* <video
              src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/media/7ed7c8a3e5fbba50fdd361621e89cba7.gif"
              alt="Quiz Hero"
              className="rounded-xl shadow-2xl border-4 border-white"
            /> 
            */}
            <video
              src={myVideo}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-2xl border-1 border-white w-full h-auto"
            />
          </motion.div>
        </section>
      </div>

      {/* Features Section */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-extrabold text-indigo-700 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Discover What Makes Us Unique
          </motion.h2>
          <p className="text-lg text-gray-600 mb-12">
            With stunning UI, category-rich quizzes, and real-time feedback, you're in for a smart ride!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Live Quizzes',
                desc: 'Compete in real-time, improve your knowledge instantly and track scores.'
              },
              {
                title: 'Skill-Based Rounds',
                desc: 'Topic-based question banks to sharpen your expertise with increasing levels.'
              },
              {
                title: 'User Dashboard',
                desc: 'Track progress, revisit quizzes, and get detailed performance insights.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="from-indigo-200 via-white to-blue-100 text-white text-center py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-indigo-700">Are You Ready to Become a QuizMaster?</h2>
        <p className="text-lg mb-6 text-gray-700">Join now to begin your journey of smart learning and quiz-based fun.</p>
        <Link
          to="/signup"
          className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Sign Up Today
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;
