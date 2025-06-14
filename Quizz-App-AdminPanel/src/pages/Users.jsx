import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/allUsers');
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:8080/admin/delete/user/${id}`);
      alert('User deleted successfully');
      fetchUsers(); // Refresh
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-user/${id}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
          <Link
            to="/user/add"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Add User
          </Link>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
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
            {users.map((user) => (
              <motion.div
                key={user.userId}
                className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {user.userName}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Phone:</strong> {user.phoneNo}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdate(user.userId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.userId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
                </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Users;
