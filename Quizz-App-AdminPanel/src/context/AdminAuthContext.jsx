import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AdminAuthContext = createContext();

// Custom hook to access context easily
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    // Load admin from localStorage on initial load
    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem('adminAuth'));
        if (storedAdmin) {
            setAdmin(storedAdmin);
        }
    }, []);

    // Login function
    const login = (adminData) => {
        localStorage.setItem('adminAuth', JSON.stringify(adminData));
        setAdmin(adminData);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('adminAuth');
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
