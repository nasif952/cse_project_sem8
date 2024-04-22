// src/components/allparts/graphicscard/GraphicsCardManagement.js

import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig';

const GraphicsCardManagement = () => {
    const [graphicsCards, setGraphicsCards] = useState([]);

    useEffect(() => {
        // Fetch graphics cards data from the API
        axios.get('/api/v1/graphicscard')
            .then(response => {
                setGraphicsCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching Graphics Cards:', error);
            });
    }, []); // Run once on component mount

    return (
        <div>
            <h2>Graphics Cards</h2>
            <ul>
                {graphicsCards.map(gpu => (
                    <li key={gpu.id}>
                        {gpu.name} - {gpu.brand}
                    </li>
                ))}
            </ul>
            {/* Additional UI for adding, editing, or deleting Graphics Cards */}
        </div>
    );
};

export default GraphicsCardManagement;
