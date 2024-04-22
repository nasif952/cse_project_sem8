import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig';
import POWERSUPPLYForm from './POWERSUPPLYForm';

const POWERSUPPLYManagement = () => {
    const [powerSupplies, setPowerSupplies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPowerSupplies();
    }, []);

    const fetchPowerSupplies = () => {
        axios.get('/api/v1/powersupply')
            .then(response => {
                setPowerSupplies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Power Supplies:', error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Power Supplies</h2>
            <ul>
                {powerSupplies.map(ps => (
                    <li key={ps.id}>
                        {ps.name} - {ps.brand}
                    </li>
                ))}
            </ul>
            
            <h3>Add New Power Supply</h3>
            <POWERSUPPLYForm fetchPowerSupplies={fetchPowerSupplies} />
            
            {/* Additional UI for editing or deleting Power Supplies */}
        </div>
    );
};

export default POWERSUPPLYManagement;
