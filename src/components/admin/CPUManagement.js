import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import styles from './MonitorManagementStyles.module.css';

const CPUManagement = () => {
    
    const [cpus, setCPUs] = useState([]);
    const [newCPU, setNewCPU] = useState({
        name: '',
        wattage: 0,
        cost: 0,
        brand: '',
        imageLink: '',
    });

    const [editingCPU, setEditingCPU] = useState(null);

    useEffect(() => {
        fetchCPUs();
    }, []);

    const fetchCPUs = async () => {
        try {
            const response = await axios.get('/api/v1/cpu');
            setCPUs(response.data);
        } catch (error) {
            console.error('Error fetching CPUs:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCPU((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };




    const addOrUpdateCPU = async () => {
        const url = editingCPU ? `/api/v1/cpu/${editingCPU.id}` : '/api/v1/cpu';
        const method = editingCPU ? 'put' : 'post';

        try {
            await axios[method](url, {
                ...newCPU,
                wattage: parseInt(newCPU.wattage, 10),
                cost: parseInt(newCPU.cost, 10),
            });
            setNewCPU({ name: '', wattage: '', cost: '', brand: '', imageLink: '' }); // Reset form
            setEditingCPU(null); // Reset editing state
            fetchCPUs(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingCPU ? 'updating' : 'adding'} CPU:`, error);
        }
    };

    const startEdit = (cpu) => {
        setEditingCPU(cpu); // Set the CPU being edited
        setNewCPU({ ...cpu }); // Populate form with CPU's current details
    };

    const removeCPU = async (id) => {
        try {
            await axios.delete(`/api/v1/cpu/${id}`);
            fetchCPUs(); // Refresh list
        } catch (error) {
            console.error('Error removing CPU:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>CPU Management</h2>
            <ul>
                {cpus.map((cpu) => (
                    <li key={cpu.id}>
                        <span>{cpu.name} - {cpu.brand}</span>
                        <button onClick={() => startEdit(cpu)}>Edit</button>
                        <button onClick={() => removeCPU(cpu.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingCPU ? 'Edit CPU' : 'Add New CPU'}</h2>
            <input type="text" name="name" placeholder="Name" value={newCPU.name} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newCPU.wattage} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newCPU.cost} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newCPU.brand} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newCPU.imageLink} onChange={handleInputChange} />
            <button onClick={addOrUpdateCPU}>{editingCPU ? 'Update CPU' : 'Add CPU'}</button>
        </div>
    );
};

export default CPUManagement;
