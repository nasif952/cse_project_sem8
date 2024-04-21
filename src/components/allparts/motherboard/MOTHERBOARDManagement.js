import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MotherboardForm from './MotherboardForm'; // Import the MotherboardForm component

const MOTHERBOARDManagement = () => {
    const [motherboards, setMotherboards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMotherboards();
    }, []);

    const fetchMotherboards = () => {
        axios.get('http://localhost:8080/api/v1/motherboard')
            .then(response => {
                setMotherboards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Motherboards:', error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Motherboards</h2>
            <ul>
                {motherboards.map(motherboard => (
                    <li key={motherboard.id}>
                        {motherboard.name} - {motherboard.brand}
                    </li>
                ))}
            </ul>
            
            <h3>Add New Motherboard</h3>
            <MotherboardForm fetchMotherboards={fetchMotherboards} />
            
            {/* Additional UI for editing or deleting Motherboards */}
        </div>
    );
};

export default MOTHERBOARDManagement;
