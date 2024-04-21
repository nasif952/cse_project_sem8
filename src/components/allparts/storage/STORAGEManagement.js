import React, { useState, useEffect } from 'react';
import axios from 'axios';
import STORAGEForm from './STORAGEForm';

const STORAGEManagement = () => {
    const [storageDevices, setStorageDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStorageDevices();
    }, []);

    const fetchStorageDevices = () => {
        axios.get('http://localhost:8080/api/v1/storage')
            .then(response => {
                setStorageDevices(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Storage Devices:', error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Storage Devices</h2>
            <ul>
                {storageDevices.map(device => (
                    <li key={device.id}>
                        {device.name} - {device.brand}
                    </li>
                ))}
            </ul>
            
            <h3>Add New Storage Device</h3>
            <STORAGEForm fetchStorageDevices={fetchStorageDevices} />
            
            {/* Additional UI for editing or deleting Storage Devices */}
        </div>
    );
};

export default STORAGEManagement;
