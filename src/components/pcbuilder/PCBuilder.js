import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PCBuilder.css';
import { jsPDF } from 'jspdf';

//
import { useAuth } from '../../contexts/AuthContext';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const PCBuilder = () => {

    const { isAuthenticated } = useAuth();
    const { isAdminAuthenticated } = useAdminAuth();
    const [components, setComponents] = useState({
        CPUs: [],
        RAMs: [],
        GPUs: [],
        Motherboards: [],
        Storages: [],
        PowerSupplies: [],
        Monitors: []
    });

    const [selectedComponents, setSelectedComponents] = useState({
        CPUs: null,
        RAMs: null,
        GPUs: null,
        Motherboards: null,
        Storages: null,
        PowerSupplies: null,
        Monitors: null
    });

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const endpoints = [
                    '/api/v1/powersupply',
                    '/api/v1/cpu',
                    '/api/v1/graphicscard',
                    '/api/v1/monitor',
                    '/api/v1/motherboard',
                    '/api/v1/ram',
                    '/api/v1/storage'
                ];

                const promises = endpoints.map(endpoint => axios.get(`http://localhost:8080${endpoint}`));
                const responses = await Promise.all(promises);

                const data = responses.map(response => response.data);

                setComponents({
                    CPUs: data[1],
                    RAMs: data[5],
                    GPUs: data[2],
                    Motherboards: data[4],
                    Storages: data[6],
                    PowerSupplies: data[0],
                    Monitors: data[3]
                });
            } catch (error) {
                console.error('Error fetching components:', error);
            }
        };

        fetchComponents();
    }, []);

    const handleComponentSelect = (type, name) => {
        const selected = components[type].find(component => component.name === name);

        setSelectedComponents(prevState => ({
            ...prevState,
            [type]: selected
        }));
    };

    const calculateTotalWattage = () => {
        let totalWattage = 0;
        Object.values(selectedComponents).forEach(component => {
            if (component) {
                totalWattage += parseInt(component.wattage);
            }
        });
        return totalWattage;
    };

    const calculateTotalCost = () => {
        let totalCost = 0;
        Object.values(selectedComponents).forEach(component => {
            if (component) {
                totalCost += parseFloat(component.cost);
            }
        });
        return totalCost.toFixed(2);
    };

    const handleDownloadPDF = () => {
        // Check if user is authenticated
        if (!isAuthenticated && !isAdminAuthenticated) {
            alert('You need to be logged in to download the PDF.');
            return; // Prevent further execution if not authenticated
        }

        const doc = new jsPDF();

        doc.text('Selected Components', 20, 10);

        let yOffset = 20;
        Object.entries(selectedComponents).forEach(([type, component]) => {
            if (component) {
                doc.text(`${type}: ${component.name} - Cost: $${component.cost}`, 20, yOffset);
                yOffset += 10;
            }
        });

        const totalWattage = calculateTotalWattage();
        const totalCost = calculateTotalCost();

        doc.text(`Total Wattage: ${totalWattage} Watts`, 20, yOffset + 10);
        doc.text(`Total Cost: $${totalCost}`, 20, yOffset + 20);

        doc.save('pc_build_details.pdf');
    };

    return (
        <div className="pcbcontainer">
            <h1>Build Your PC</h1>

            {Object.entries(components).map(([type, componentList]) => (
                <div key={type} className={`${type.toLowerCase()}-section`}>
                    <h3>{type}</h3>
                    <select onChange={(e) => handleComponentSelect(type, e.target.value)}>
                        <option value="">Select {type}</option>
                        {componentList.map(component => (
                            <option key={component.id} value={component.name}>{component.name}</option>
                        ))}
                    </select>
                    {selectedComponents[type] && (
                        <div>
                            <p>Wattage: {selectedComponents[type].wattage}</p>
                            <p>Cost: {selectedComponents[type].cost}</p>
                        </div>
                    )}
                </div>
            ))}

            <div className="totals-section">
                <h3>Totals</h3>
                <p>Total Wattage: {calculateTotalWattage()} Watts</p>
                <p>Total Cost: ${calculateTotalCost()}</p>
                <button onClick={handleDownloadPDF}>Download as PDF</button>
            </div>
        </div>
    );
};

export default PCBuilder;
