import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import styles from './MonitorManagementStyles.module.css';

const MonitorManagement = () => {
    const [monitors, setMonitors] = useState([]);
    const [newMonitor, setNewMonitor] = useState({
        name: '',
        brand: '',
        screenSize: 0,
        resolution: '',
        refreshRate: 0,
        cost: 0,
        imageLink: '',
    });

    const [editingMonitor, setEditingMonitor] = useState(null);

    useEffect(() => {
        fetchMonitors();
    }, []);

    const fetchMonitors = async () => {
        try {
            const response = await axios.get('/api/v1/monitor');
            setMonitors(response.data);
        } catch (error) {
            console.error('Error fetching Monitors:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMonitor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdateMonitor = async () => {
        const url = editingMonitor ? `/api/v1/monitor/${editingMonitor.id}` : '/api/v1/monitor';
        const method = editingMonitor ? 'put' : 'post';

        try {
            await axios[method](url, newMonitor);
            setNewMonitor({ name: '', brand: '', sizeInches: '', resolution: '', refreshRate: '', cost: '', imageLink: '' }); // Reset form
            setEditingMonitor(null); // Reset editing state
            fetchMonitors(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingMonitor ? 'updating' : 'adding'} Monitor:`, error);
        }
    };

    const startEdit = (monitor) => {
        setEditingMonitor(monitor); // Set the Monitor being edited
        setNewMonitor({ ...monitor }); // Populate form with Monitor's current details
    };

    const removeMonitor = async (id) => {
        try {
            await axios.delete(`/api/v1/monitor/${id}`);
            fetchMonitors(); // Refresh list
        } catch (error) {
            console.error('Error removing Monitor:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>Monitor Management</h2>
            <ul>
                {monitors.map((monitor) => (
                    <li key={monitor.id}>
                        <span>{monitor.name} - {monitor.brand}</span>
                        <button onClick={() => startEdit(monitor)}>Edit</button>
                        <button onClick={() => removeMonitor(monitor.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingMonitor ? 'Edit Monitor' : 'Add New Monitor'}</h2>
            <input type="text" name="name" placeholder="Name" value={newMonitor.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newMonitor.brand} onChange={handleInputChange} />
            <input type="number" name="screenSize" placeholder="Size (inches)" value={newMonitor.screenSize} onChange={handleInputChange} />
            <input type="text" name="resolution" placeholder="Resolution" value={newMonitor.resolution} onChange={handleInputChange} />
            <input type="number" name="refreshRate" placeholder="Refresh Rate" value={newMonitor.refreshRate} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newMonitor.cost} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newMonitor.imageLink} onChange={handleInputChange} />
            <div className='styles.button_parts'>
            <button onClick={addOrUpdateMonitor}>{editingMonitor ? 'Update Monitor' : 'Add Monitor'}</button>
            </div>
        </div>
    );
};

export default MonitorManagement;
