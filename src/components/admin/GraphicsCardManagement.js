import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MonitorManagementStyles.module.css';

const GraphicsCardManagement = () => {
    
    const [graphicsCards, setGraphicsCards] = useState([]);
    const [newGraphicsCard, setNewGraphicsCard] = useState({
        name: '',
        brand: '',
        gb: 0,
        wattage: 0,
        cost: 0,
        imageLink: '',
    });

    const [editingGraphicsCard, setEditingGraphicsCard] = useState(null);

    useEffect(() => {
        fetchGraphicsCards();
    }, []);

    const fetchGraphicsCards = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/graphicscard');
            setGraphicsCards(response.data);
        } catch (error) {
            console.error('Error fetching Graphics Cards:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGraphicsCard((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addOrUpdateGraphicsCard = async () => {
        const url = editingGraphicsCard ? `http://localhost:8080/api/v1/graphicscard/${editingGraphicsCard.id}` : 'http://localhost:8080/api/v1/graphicscard';
        const method = editingGraphicsCard ? 'put' : 'post';

        try {
            await axios[method](url, {
                ...newGraphicsCard,
                gb: parseInt(newGraphicsCard.gb, 10),
                wattage: parseInt(newGraphicsCard.wattage, 10),
                cost: parseInt(newGraphicsCard.cost, 10),
            });
            setNewGraphicsCard({ name: '', brand: '', gb: '', wattage: '', cost: '', imageLink: '' }); // Reset form
            setEditingGraphicsCard(null); // Reset editing state
            fetchGraphicsCards(); // Refresh list
        } catch (error) {
            console.error(`Error ${editingGraphicsCard ? 'updating' : 'adding'} Graphics Card:`, error);
        }
    };

    const startEdit = (graphicsCard) => {
        setEditingGraphicsCard(graphicsCard); // Set the Graphics Card being edited
        setNewGraphicsCard({ ...graphicsCard }); // Populate form with Graphics Card's current details
    };

    const removeGraphicsCard = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/graphicscard/${id}`);
            fetchGraphicsCards(); // Refresh list
        } catch (error) {
            console.error('Error removing Graphics Card:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>Graphics Card Management</h2>
            <ul>
                {graphicsCards.map((graphicsCard) => (
                    <li key={graphicsCard.id}>
                        <span>{graphicsCard.name} - {graphicsCard.brand}</span>
                        <button onClick={() => startEdit(graphicsCard)}>Edit</button>
                        <button onClick={() => removeGraphicsCard(graphicsCard.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>{editingGraphicsCard ? 'Edit Graphics Card' : 'Add New Graphics Card'}</h2>
            <input type="text" name="name" placeholder="Name" value={newGraphicsCard.name} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={newGraphicsCard.brand} onChange={handleInputChange} />
            <input type="number" name="gb" placeholder="GB" value={newGraphicsCard.gb} onChange={handleInputChange} />
            <input type="number" name="wattage" placeholder="Wattage" value={newGraphicsCard.wattage} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={newGraphicsCard.cost} onChange={handleInputChange} />
            <input type="text" name="imageLink" placeholder="Image Link" value={newGraphicsCard.imageLink} onChange={handleInputChange} />
            <button onClick={addOrUpdateGraphicsCard}>{editingGraphicsCard ? 'Update Graphics Card' : 'Add Graphics Card'}</button>
        </div>
    );
};

export default GraphicsCardManagement;
