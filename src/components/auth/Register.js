import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import styles from './Login.module.css'; // Import CSS module

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/users/register', user);
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
            <h2>User Registration</h2>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;


////// important change the await axios.post  link when deploying new ngrok 