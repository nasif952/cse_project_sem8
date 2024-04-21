import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MonitorManagementStyles.module.css';

const MotherboardManagement = () => {
    const [motherboards, setMotherboards] = useState([]);
    const [newMotherboard, setNewMotherboard] = useState({
        name: '',
        brand: '',
        wattage: 0,
        cost: 0,
        platform: '',
        imageLink: '',
    });
    const [editingMotherboard, setEditingMotherboard] = useState(null);

    useEffect(() => {
        fetchMotherboards();
    }, []);

    const fetchMotherboards = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/motherboard');
            setMotherboards(response.data);
        } catch (error) {
            console.error('Error fetching Motherboards:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMotherboard((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdateMotherboard = async () => {
        const url = editingMotherboard ? `http://localhost:8080/api/v1/motherboard/${editingMotherboard.id}` : 'http://localhost:8080/api/v1/motherboard';
        const method = editingMotherboard ? 'put' : 'post';

        try {
            await axios[method](url, {
                ...newMotherboard,
                wattage: parseInt(newMotherboard.wattage, 10),
                cost: parseInt(newMotherboard.cost, 10),
            });
            setNewMotherboard({ name: '', brand: '', wattage: '', cost: '', platform: '', imageLink: '' });
            setEditingMotherboard(null);
            fetchMotherboards();
        } catch (error) {
            console.error(`Error ${editingMotherboard ? 'updating' : 'adding'} Motherboard:`, error);
        }
    };

    const startEdit = (motherboard) => {
        setEditingMotherboard(motherboard);
        setNewMotherboard({ ...motherboard });
    };

    const removeMotherboard = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/motherboard/${id}`);
            fetchMotherboards();
        } catch (error) {
            console.error('Error removing Motherboard:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>Motherboard Management</h2>
            <ul>
                {motherboards.map((motherboard) => (
                    <li key={motherboard.id}>
                        <span>{motherboard.name} - {motherboard.brand}</span>
                        <button onClick={() => startEdit(motherboard)}>Edit</button>
                        <button onClick={() => removeMotherboard(motherboard.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingMotherboard ? 'Edit Motherboard' : 'Add New Motherboard'}</h2>
            <input type="text" name="name" placeholder="Name" value={newMotherboard.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newMotherboard.brand} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newMotherboard.wattage} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newMotherboard.cost} onChange={handleInputChange} />
            <input type="text" name="platform" placeholder="Platform" value={newMotherboard.platform} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newMotherboard.imageLink} onChange={handleInputChange} />
            <button onClick={addOrUpdateMotherboard}>{editingMotherboard ? 'Update Motherboard' : 'Add Motherboard'}</button>
        </div>
    );
};

export default MotherboardManagement;
