import React, { useState } from 'react';
import axios from '../../../api/axiosConfig';

const MotherboardForm = ({ fetchMotherboards }) => {
    const [newMotherboardName, setNewMotherboardName] = useState('');
    const [newMotherboardBrand, setNewMotherboardBrand] = useState('');
    const [newMotherboardWattage, setNewMotherboardWattage] = useState(0);
    const [newMotherboardCost, setNewMotherboardCost] = useState(0);
    const [newMotherboardPlatform, setNewMotherboardPlatform] = useState('');
    const [newMotherboardImageLink, setNewMotherboardImageLink] = useState('');

    const addMotherboard = () => {
        axios.post('/api/v1/motherboard', {
            name: newMotherboardName,
            brand: newMotherboardBrand,
            wattage: newMotherboardWattage,
            cost: newMotherboardCost,
            platform: newMotherboardPlatform,
            imageLink: newMotherboardImageLink
        })
        .then(response => {
            // Clear input fields and fetch updated list of motherboards
            setNewMotherboardName('');
            setNewMotherboardBrand('');
            setNewMotherboardWattage(0);
            setNewMotherboardCost(0);
            setNewMotherboardPlatform('');
            setNewMotherboardImageLink('');
            fetchMotherboards(); // Call parent fetchMotherboards function to update the list
        })
        .catch(error => {
            console.error('Error adding Motherboard:', error);
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={newMotherboardName}
                onChange={e => setNewMotherboardName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Brand"
                value={newMotherboardBrand}
                onChange={e => setNewMotherboardBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Wattage"
                value={newMotherboardWattage}
                onChange={e => setNewMotherboardWattage(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Cost"
                value={newMotherboardCost}
                onChange={e => setNewMotherboardCost(parseInt(e.target.value))}
            />
            <input
                type="text"
                placeholder="Platform"
                value={newMotherboardPlatform}
                onChange={e => setNewMotherboardPlatform(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image Link"
                value={newMotherboardImageLink}
                onChange={e => setNewMotherboardImageLink(e.target.value)}
            />
            <button onClick={addMotherboard}>Add Motherboard</button>
        </div>
    );
};

export default MotherboardForm;
