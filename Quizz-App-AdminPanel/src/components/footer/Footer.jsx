import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">

                {/* Left Section */}
                <div className="text-2xl font-bold text-indigo-400">
                    <Link to="/dashboard">QuizMaster Admin</Link>
                </div>

                {/* Center Section (Optional links) */}
                <div className="mb-4 mt-4 md:mb-0 md:mt-0">
                    <p>&copy; {new Date().getFullYear()} Quizz Admin Panel. All rights reserved.</p>
                </div>


                {/* Right Section (Optional Developer Credit) */}
                <div>
                    <p>Developed by <span className="text-indigo-400 font-medium">Dev. Yash Walke</span></p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
