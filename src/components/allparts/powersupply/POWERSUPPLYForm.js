import React, { useState } from 'react';
import axios from 'axios';

const POWERSUPPLYForm = ({ fetchPowerSupplies }) => {
    const [newPowerSupplyName, setNewPowerSupplyName] = useState('');
    const [newPowerSupplyBrand, setNewPowerSupplyBrand] = useState('');
    const [newPowerSupplyWattage, setNewPowerSupplyWattage] = useState(0);
    const [newPowerSupplyCapacity, setNewPowerSupplyCapacity] = useState(0);
    const [newPowerSupplyCost, setNewPowerSupplyCost] = useState(0);
    const [newPowerSupplyImageLink, setNewPowerSupplyImageLink] = useState('');

    const addPowerSupply = () => {
        axios.post('http://localhost:8080/api/v1/powersupply', {
            name: newPowerSupplyName,
            brand: newPowerSupplyBrand,
            wattage: newPowerSupplyWattage,
            capacity: newPowerSupplyCapacity,
            cost: newPowerSupplyCost,
            imageLink: newPowerSupplyImageLink
        })
        .then(response => {
            // Clear input fields and fetch updated list of power supplies
            setNewPowerSupplyName('');
            setNewPowerSupplyBrand('');
            setNewPowerSupplyWattage(0);
            setNewPowerSupplyCapacity(0);
            setNewPowerSupplyCost(0);
            setNewPowerSupplyImageLink('');
            fetchPowerSupplies(); // Call parent fetchPowerSupplies function to update the list
        })
        .catch(error => {
            console.error('Error adding Power Supply:', error);
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={newPowerSupplyName}
                onChange={e => setNewPowerSupplyName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Brand"
                value={newPowerSupplyBrand}
                onChange={e => setNewPowerSupplyBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Wattage"
                value={newPowerSupplyWattage}
                onChange={e => setNewPowerSupplyWattage(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Capacity (in watts)"
                value={newPowerSupplyCapacity}
                onChange={e => setNewPowerSupplyCapacity(parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Cost"
                value={newPowerSupplyCost}
                onChange={e => setNewPowerSupplyCost(parseInt(e.target.value))}
            />
            <input
                type="text"
                placeholder="Image Link"
                value={newPowerSupplyImageLink}
                onChange={e => setNewPowerSupplyImageLink(e.target.value)}
            />
            <button onClick={addPowerSupply}>Add Power Supply</button>
        </div>
    );
};

export default POWERSUPPLYForm;
