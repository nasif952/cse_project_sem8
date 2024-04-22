import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import styles from './MonitorManagementStyles.module.css';
const PowerSupplyManagement = () => {
    const [powerSupplies, setPowerSupplies] = useState([]);
    const [newPowerSupply, setNewPowerSupply] = useState({
        name: '',
        brand: '',
        wattage: 0,
        capacity: 0,
        cost: 0,
        imageLink: '',
    });

    const [editingPowerSupply, setEditingPowerSupply] = useState(null);

    useEffect(() => {
        fetchPowerSupplies();
    }, []);

    const fetchPowerSupplies = async () => {
        try {
            const response = await axios.get('/api/v1/powersupply');
            setPowerSupplies(response.data);
        } catch (error) {
            console.error('Error fetching Power Supplies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPowerSupply((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdatePowerSupply = async () => {
        const url = editingPowerSupply ? `/api/v1/powersupply/${editingPowerSupply.id}` : '/api/v1/powersupply';
        const method = editingPowerSupply ? 'put' : 'post';

        try {
            await axios[method](url, newPowerSupply);
            setNewPowerSupply({ name: '', brand: '', wattage: '', capacity: '', cost: '', imageLink: '' }); // Reset form
            setEditingPowerSupply(null); // Reset editing state
            fetchPowerSupplies(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingPowerSupply ? 'updating' : 'adding'} Power Supply:`, error);
        }
    };

    const startEdit = (powerSupply) => {
        setEditingPowerSupply(powerSupply); // Set the Power Supply being edited
        setNewPowerSupply({ ...powerSupply }); // Populate form with Power Supply's current details
    };

    const removePowerSupply = async (id) => {
        try {
            await axios.delete(`/api/v1/powersupply/${id}`);
            fetchPowerSupplies(); // Refresh list
        } catch (error) {
            console.error('Error removing Power Supply:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>Power Supply Management</h2>
            <ul>
                {powerSupplies.map((powerSupply) => (
                    <li key={powerSupply.id}>
                        <span>{powerSupply.name} - {powerSupply.brand}</span>
                        <button onClick={() => startEdit(powerSupply)}>Edit</button>
                        <button onClick={() => removePowerSupply(powerSupply.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingPowerSupply ? 'Edit Power Supply' : 'Add New Power Supply'}</h2>
            <input type="text" name="name" placeholder="Name" value={newPowerSupply.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newPowerSupply.brand} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newPowerSupply.wattage} onChange={handleInputChange} />
            <input type="number" name="capacity" placeholder="Capacity" value={newPowerSupply.capacity} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newPowerSupply.cost} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newPowerSupply.imageLink} onChange={handleInputChange} />
            <button onClick={addOrUpdatePowerSupply}>{editingPowerSupply ? 'Update Power Supply' : 'Add Power Supply'}</button>
        </div>
    );
};

export default PowerSupplyManagement;
