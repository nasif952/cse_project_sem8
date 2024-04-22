import React, { useState } from 'react';
import axios from '../../../api/axiosConfig';

const STORAGEForm = ({ fetchStorageDevices }) => {
    const [newStorageName, setNewStorageName] = useState('');
    const [newStorageBrand, setNewStorageBrand] = useState('');
    const [newStorageCapacity, setNewStorageCapacity] = useState(0);
    const [newStorageCost, setNewStorageCost] = useState(0);
    const [newStorageWattage, setNewStorageWattage] = useState(0);
    const [newStorageImageLink, setNewStorageImageLink] = useState('');
    const [newStorageType, setNewStorageType] = useState('');

    const addStorageDevice = () => {
        axios.post('/api/v1/storage', {
            name: newStorageName,
            brand: newStorageBrand,
            capacity: newStorageCapacity,
            cost: newStorageCost,
            wattage: newStorageWattage,
            imageLink: newStorageImageLink,
            type: newStorageType
        })
        .then(response => {
            // Clear input fields and fetch updated list of storage devices
            setNewStorageName('');
            setNewStorageBrand('');
            setNewStorageCapacity(0);
            setNewStorageCost(0);
            setNewStorageWattage(0);
            setNewStorageImageLink('');
            setNewStorageType('');
            fetchStorageDevices(); // Call parent fetchStorageDevices function to update the list
        })
        .catch(error => {
            console.error('Error adding Storage Device:', error);
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={newStorageName}
                onChange={e => setNewStorageName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Brand"
                value={newStorageBrand}
                onChange={e => setNewStorageBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Capacity (in GB )"
                value={newStorageCapacity}
                onChange={e => setNewStorageCapacity(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Cost"
                value={newStorageCost}
                onChange={e => setNewStorageCost(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Wattage"
                value={newStorageWattage}
                onChange={e => setNewStorageWattage(parseInt(e.target.value))}
            />
            <input
                type="text"
                placeholder="Image Link"
                value={newStorageImageLink}
                onChange={e => setNewStorageImageLink(e.target.value)}
            />
            <input
                type="text"
                placeholder="Type (e.g., ssd or hdd)"
                value={newStorageType}
                onChange={e => setNewStorageType(e.target.value)}
            />
            <button onClick={addStorageDevice}>Add Storage Device</button>
        </div>
    );
};

export default STORAGEForm;
