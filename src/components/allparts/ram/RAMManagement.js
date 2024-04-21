// src/components/allparts/ram/RAMManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RAMManagement = () => {
    const [rams, setRams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/ram')
            .then(response => {
                setRams(response.data);
            })
            .catch(error => {
                console.error('Error fetching Rams:', error);
            });
    }, []);

    return (
        <div>
            <h2>RAMs</h2>
            <ul>
                {rams.map(ram => (
                    <li key={ram.id}>
                        {ram.name} - {ram.brand}
                    </li>
                ))}
            </ul>
            {/* Additional UI for adding, editing, or deleting CPUs */}
        </div>
    );
};

export default RAMManagement;
