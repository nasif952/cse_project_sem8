// src/components/allparts/cpu/CPUManagement.js

import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig';

const CPUManagement = () => {
    const [cpus, setCPUs] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/cpu')
            .then(response => {
                setCPUs(response.data);
            })
            .catch(error => {
                console.error('Error fetching CPUs:', error);
            });
    }, []);

    return (
        <div>
            <h2>CPUs</h2>
            <ul>
                {cpus.map(cpu => (
                    <li key={cpu.id}>
                        {cpu.name} - {cpu.brand}
                    </li>
                ))}
            </ul>
            {/* Additional UI for adding, editing, or deleting CPUs */}
        </div>
    );
};

export default CPUManagement;
