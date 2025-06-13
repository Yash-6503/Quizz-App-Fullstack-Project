import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Menu, X } from 'lucide-react';

const AdminNavbar = () => {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-indigo-400">
                    {admin ? (
                        <Link to="/dashboard">QuizMaster Admin</Link>
                    ) : (
                        <span>QuizMaster Admin</span>
                    )}
                </div>

                {/* Hamburger icon */}
                <div className="md:hidden">
                    {admin && (
                        <button onClick={toggleMenu}>
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>

                {/* Nav links for md+ screens */}
                {admin && (
                    <div className="hidden md:flex space-x-6 items-center text-lg">
                        <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
                        <Link to="/quizzes" className="hover:text-indigo-300">Quizzes</Link>
                        <Link to="/questions" className="hover:text-indigo-300">Questions</Link>
                        <Link to="/users" className="hover:text-indigo-300">Users</Link>
                    </div>
                )}

                {/* Auth controls */}
                <div className="hidden md:flex items-center space-x-4">
                    {admin ? (
                        <>
                            <span className="text-sm text-gray-300">Welcome, {admin.adminName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white text-md font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 font-medium text-md rounded text-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-green-600 hover:bg-green-700 px-4 py-1 font-medium rounded text-white text-md"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {admin && menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-4 bg-gray-800 text-center">
                    <Link to="/dashboard" onClick={toggleMenu} className="block text-white hover:text-indigo-300">Dashboard</Link>
                    <Link to="/quizzes" onClick={toggleMenu} className="block text-white hover:text-indigo-300">Quizzes</Link>
                    <Link to="/questions" onClick={toggleMenu} className="block text-white hover:text-indigo-300">Questions</Link>
                    <Link to="/users" onClick={toggleMenu} className="block text-white hover:text-indigo-300">Users</Link>
                    <p className="text-sm text-gray-300">Welcome, {admin.adminName}</p>
                    <button
                        onClick={() => {
                            handleLogout();
                            toggleMenu();
                        }}
                        className="bg-red-500 hover:bg-red-600 w-full py-2 rounded text-white text-md font-medium mt-2"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
