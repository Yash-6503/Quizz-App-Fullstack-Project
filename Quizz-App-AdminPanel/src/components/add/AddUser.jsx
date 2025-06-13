import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            navigate('/users'); // change if your route is different
        } catch (err) {
            console.error('Error adding user:', err);
            setError('User Already exists....');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                        <input
                            type="number"
                            name="phoneNo"
                            value={userData.phoneNo}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2 rounded-md"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
