import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MonitorManagementStyles.module.css';
const StorageManagement = () => {
    const [storages, setStorages] = useState([]);
    const [newStorage, setNewStorage] = useState({
        name: '',
        brand: '',
        capacity: 0,
        cost: 0,
        wattage: 0,
        imageLink: '',
        type: '', // ssd or hdd
    });

    const [editingStorage, setEditingStorage] = useState(null);

    useEffect(() => {
        fetchStorages();
    }, []);

    const fetchStorages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/storage');
            setStorages(response.data);
        } catch (error) {
            console.error('Error fetching Storages:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStorage((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdateStorage = async () => {
        const url = editingStorage ? `http://localhost:8080/api/v1/storage/${editingStorage.id}` : 'http://localhost:8080/api/v1/storage';
        const method = editingStorage ? 'put' : 'post';

        try {
            await axios[method](url, newStorage);
            setNewStorage({ name: '', brand: '', capacity: '', cost: '', wattage: '', imageLink: '', type: '' }); // Reset form
            setEditingStorage(null); // Reset editing state
            fetchStorages(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingStorage ? 'updating' : 'adding'} Storage:`, error);
        }
    };

    const startEdit = (storage) => {
        setEditingStorage(storage); // Set the Storage being edited
        setNewStorage({ ...storage }); // Populate form with Storage's current details
    };

    const removeStorage = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/storage/${id}`);
            fetchStorages(); // Refresh list
        } catch (error) {
            console.error('Error removing Storage:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>Storage Management</h2>
            <ul>
                {storages.map((storage) => (
                    <li key={storage.id}>
                        <span>{storage.name} - {storage.brand}</span>
                        <button onClick={() => startEdit(storage)}>Edit</button>
                        <button onClick={() => removeStorage(storage.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingStorage ? 'Edit Storage' : 'Add New Storage'}</h2>
            <input type="text" name="name" placeholder="Name" value={newStorage.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newStorage.brand} onChange={handleInputChange} />
            <input type="number" name="capacity" placeholder="Capacity" value={newStorage.capacity} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newStorage.cost} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newStorage.wattage} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newStorage.imageLink} onChange={handleInputChange} />
            <input type="text" name="type" placeholder="Type (ssd or hdd)" value={newStorage.type} onChange={handleInputChange} />
            <button onClick={addOrUpdateStorage}>{editingStorage ? 'Update Storage' : 'Add Storage'}</button>
        </div>
    );
};

export default StorageManagement;
