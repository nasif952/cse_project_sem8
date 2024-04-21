import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MONITORManagement = () => {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/monitor')
            .then(response => {
                setMonitors(response.data);
            })
            .catch(error => {
                console.error('Error fetching Monitors:', error);
            });
    }, []);

    return (
        <div>
            <h2>Monitors</h2>
            <ul>
                {monitors.map(monitor => (
                    <li key={monitor.id}>
                        {monitor.name} - {monitor.brand}
                    </li>
                ))}
            </ul>
            {/* Additional UI for adding, editing, or deleting Monitors */}
        </div>
    );
};

export default MONITORManagement;
