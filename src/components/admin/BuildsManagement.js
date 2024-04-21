import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuildList from './BuildList';
import BuildForm from './BuildForm';
import styles from './MonitorManagementStyles.module.css';

const BuildsManagement = () => {
    const [builds, setBuilds] = useState([]);
    const [editingBuild, setEditingBuild] = useState(null);

    useEffect(() => {
        fetchBuilds();
    }, []);

    const fetchBuilds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/builds');
            setBuilds(response.data);
        } catch (error) {
            console.error('Error fetching builds:', error);
        }
    };

    const startEdit = (build) => {
        setEditingBuild(build);
    };

    return (
        <div className={styles.monitorContainer}>
            <h2>PC Builds Management</h2>
            <BuildList builds={builds} startEdit={startEdit} fetchBuilds={fetchBuilds} />
            <BuildForm editingBuild={editingBuild} setEditingBuild={setEditingBuild} fetchBuilds={fetchBuilds} />
        </div>
    );
};

export default BuildsManagement;
