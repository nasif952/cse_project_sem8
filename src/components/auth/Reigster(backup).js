import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log(response.data);
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
