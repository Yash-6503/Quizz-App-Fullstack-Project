import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" bg-indigo-700 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand Info */}
                <div className='text-center md:text-left'>
                    <h2 className="text-3xl font-bold mb-4">QuizMaster</h2>
                    {/* <img src="/Logo.png" alt="Logo" className="h-0 w-auto" /> */}
                    <p className="text-sm text-indigo-100 px-10 md:px-0">
                        QuizMaster is your go-to platform for testing your knowledge and competing with others.
                        Dive into a world of interactive learning!
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-indigo-100 text-xl">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/quizzes" className="hover:underline">Quizzes</Link></li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div className='text-center'>
                    <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href="#" className="hover:text-indigo-300"><Facebook /></a>
                        <a href="#" className="hover:text-indigo-300"><Twitter /></a>
                        <a href="#" className="hover:text-indigo-300"><Instagram /></a>
                        <a href="#" className="hover:text-indigo-300"><Linkedin /></a>
                    </div>
                    <p className="text-indigo-100 text-sm">Email: support@quizmaster.com</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-indigo-500 pt-4 text-center text-sm text-indigo-100">
                &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
