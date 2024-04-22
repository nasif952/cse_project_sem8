import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import styles from './MonitorManagementStyles.module.css';

const RamManagement = () => {
    const [rams, setRams] = useState([]);
    const [newRam, setNewRam] = useState({
        name: '',
        brand: '',
        mhz: 0,
        memory: 0,
        cost: 0,
        imageLink: '',
        wattage: 0,
    });

    const [editingRam, setEditingRam] = useState(null);

    useEffect(() => {
        fetchRams();
    }, []);

    const fetchRams = async () => {
        try {
            const response = await axios.get('/api/v1/ram');
            setRams(response.data);
        } catch (error) {
            console.error('Error fetching RAMs:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRam((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdateRam = async () => {
        const url = editingRam ? `/api/v1/ram/${editingRam.id}` : '/api/v1/ram';
        const method = editingRam ? 'put' : 'post';

        try {
            await axios[method](url, newRam);
            setNewRam({ name: '', brand: '', mhz: '', memory: '', cost: '', imageLink: '', wattage: '' }); // Reset form
            setEditingRam(null); // Reset editing state
            fetchRams(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingRam ? 'updating' : 'adding'} RAM:`, error);
        }
    };

    const startEdit = (ram) => {
        setEditingRam(ram); // Set the RAM being edited
        setNewRam({ ...ram }); // Populate form with RAM's current details
    };

    const removeRam = async (id) => {
        try {
            await axios.delete(`/api/v1/ram/${id}`);
            fetchRams(); // Refresh list
        } catch (error) {
            console.error('Error removing RAM:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>RAM Management</h2>
            <ul>
                {rams.map((ram) => (
                    <li key={ram.id}>
                        <span>{ram.name} - {ram.brand}</span>
                        <button onClick={() => startEdit(ram)}>Edit</button>
                        <button onClick={() => removeRam(ram.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingRam ? 'Edit RAM' : 'Add New RAM'}</h2>
            <input type="text" name="name" placeholder="Name" value={newRam.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newRam.brand} onChange={handleInputChange} />
            <input type="number" name="mhz" placeholder="MHz" value={newRam.mhz} onChange={handleInputChange} />
            <input type="number" name="memory" placeholder="Memory" value={newRam.memory} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newRam.cost} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newRam.imageLink} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newRam.wattage} onChange={handleInputChange} />
            <button onClick={addOrUpdateRam}>{editingRam ? 'Update RAM' : 'Add RAM'}</button>
        </div>
    );
};

export default RamManagement;
