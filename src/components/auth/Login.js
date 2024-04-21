import React, { useState } from 'react';
import axios from '../../api/axiosConfig'; // Adjust the import path based on your project structure
import { useAuth } from  '../../contexts/AuthContext.js';

import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css'; // Import CSS module

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
            const response = await axios.post('/api/v1/users/login', credentials);
            alert('Login successful');
            console.log(response.data);
            login(); // Update the authentication state
            navigate('/'); // Redirect to the homepage
            // Redirect or perform additional actions upon successful login
        } catch (error) {
            alert('Login failed');
            console.error(error.response.data);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>User Login</h2>
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

export default Login;
