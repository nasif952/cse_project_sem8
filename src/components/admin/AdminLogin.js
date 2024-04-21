import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import styles from '../auth/Login.module.css'

const AdminLogin = () => {

    const { adminLogin } = useAdminAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/admins/login', credentials);
            alert('Admin login successful');
            console.log(response.data);
            adminLogin();
            // Redirect or perform additional actions upon successful login
            // history.push('/admin');
        } catch (error) {
            alert('Admin login failed');
            console.error(error.response.data);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;