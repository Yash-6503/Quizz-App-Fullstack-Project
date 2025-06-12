import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // adjust path
import Logo from '../../assets/Logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    // console.log(user.userName);

    return (
        <nav className="bg-indigo-600 text-white shadow-md overflow-hidden md:h-20 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-2xl font-bold tracking-wide">
                        <Link to="/">
                            <img src="/Logo.png" alt="Logo" className="hidden md:flex w-50 md:w-60  aspect-square object-cover md:mt-6" />
                            <p className='md:hidden'>QuizMaster</p>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-6 text-xl">
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                        <Link to="/quizzes" className="hover:text-gray-200">Quizzes</Link>
                        <Link to="/about" className="hover:text-gray-200">About</Link>
                        <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                    </div>

                    <div className="hidden md:flex space-x-4 text-xl">
                        {!user ? (
                            <>
                                <Link to="/login" className="bg-white text-indigo-600 px-2 py-1 rounded hover:bg-gray-100 font-medium">Login</Link>
                                <Link to="/signup" className="border border-white px-2 py-1 rounded hover:bg-indigo-700 font-medium">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <span className="font-medium text-sm">Welcome,<br/> {user.name || user.userName}</span>
                                <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white font-medium">Logout</button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-indigo-500 px-4 pb-4 space-y-3 text-2xl">
                    <Link to="/" className="block hover:text-gray-200">Home</Link>
                    <Link to="/quizzes" className="block hover:text-gray-200">Quizzes</Link>
                    <Link to="/about" className="block hover:text-gray-200">About</Link>
                    <Link to="/contact" className="block hover:text-gray-200">Contact</Link>

                    <div className="flex flex-col justify-center items-center space-y-2 pt-3">
                        {!user ? (
                            <>
                                <Link to="/login" className="bg-white text-indigo-600 px-4 py-1 rounded font-medium">Login</Link>
                                <Link to="/signup" className="border border-white px-4 py-1 rounded text-white font-medium">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-white text-lg">Welcome, {user.userName}!!</span>
                                <button onClick={logout} className="bg-red-500 px-4 py-1 rounded text-white font-medium">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
