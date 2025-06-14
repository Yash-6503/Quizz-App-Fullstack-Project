import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddUser = () => {
    const [userData, setUserData] = useState({
        userName: '',
        password: '',
        email: '',
        phoneNo: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:8080/admin/addUser', userData);
            setSuccess('User added successfully!');
            alert("User added successfully!");
            navigate('/users');
        } catch (err) {
            console.error('Error adding user:', err);
            setError('User Already exists....');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gray-100 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.h2
                    className="text-2xl font-bold mb-6 text-center text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Add New User
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {['userName', 'password', 'email', 'phoneNo'].map((field, i) => (
                        <motion.div
                            key={field}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <label className="block text-gray-700 font-medium mb-1">
                                {field === 'userName' ? 'Username' :
                                    field === 'phoneNo' ? 'Phone Number' :
                                        field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                                name={field}
                                placeholder={`Enter ${field}`}
                                value={userData[field]}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </motion.div>
                    ))}

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    <motion.button
                        type="submit"
                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2 rounded-md"
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        Add User
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddUser;
