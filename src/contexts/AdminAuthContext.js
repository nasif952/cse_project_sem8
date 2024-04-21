import React, { createContext, useContext, useState } from 'react';

// For admin authentication
const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const adminLogin = () => setIsAdminAuthenticated(true);
    const adminLogout = () => setIsAdminAuthenticated(false);

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};