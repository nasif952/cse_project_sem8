import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MonitorManagementStyles.module.css';
import api from '../../api/axiosConfig';
const BuildForm = ({ editingBuild, setEditingBuild, fetchBuilds }) => {
    const [build, setBuild] = useState({
        buildid: '',
        buildCategory: '',
        cpu: '',
        ram: '',
        gpu: '',
        monitor: '',
        storage: '',
        psu: '',
        info: '',
        poster: '',
        buildName: '',
        details: [],
        backdrops: [],
        reviewIds: [],
        buildLinks: ''
    });

    useEffect(() => {
        if (editingBuild) {
            setBuild(editingBuild);
        } else {
            setBuild({
                buildid: '',
                buildCategory: '',
                cpu: '',
                ram: '',
                gpu: '',
                monitor: '',
                storage: '',
                psu: '',
                info: '',
                poster: '',
                buildName: '',
                details: [],
                backdrops: [],
                reviewIds: [],
                buildLinks: ''
            });
        }
    }, [editingBuild]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuild((prevBuild) => ({
            ...prevBuild,
            [name]: value || '', // Handle undefined/null values
        }));
    };

    // const handleArrayInputChange = (index, name, value) => {
    //     const updatedArray = [...build[name]]; // Create a copy of the array
    //     updatedArray[index] = value !== null ? value : ''; // Set value to empty string if null
    //     setBuild((prevBuild) => ({
    //         ...prevBuild,
    //         [name]: updatedArray,
    //     }));
    // };

    const handleArrayInputChange = (index, name, value) => {
        const updatedArray = build[name] ? [...build[name]] : []; // Create a new array if it doesn't exist
        updatedArray[index] = value !== null ? value : ''; // Set value to empty string if null
        setBuild((prevBuild) => ({
            ...prevBuild,
            [name]: updatedArray,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBuild) {
                await api.put(`/api/v1/builds/${editingBuild.buildid}`, build);
            } else {
                await api.post('/api/v1/builds', build);
            }
            fetchBuilds();
            setEditingBuild(null);
        } catch (error) {
            console.error('Error submitting build:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h3>{editingBuild ? 'Edit Build' : 'Add New Build'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="buildid"
                    value={build.buildid}
                    onChange={handleInputChange}
                    placeholder="Build ID"
                />
                {/* <input
                    type="text"
                    name="buildCategory"
                    value={build.buildCategory}
                    onChange={handleInputChange}
                    placeholder="Category"
                /> */}
                <input
                    type="text"
                    name="cost"
                    value={build.cost}
                    onChange={handleInputChange}
                    placeholder="Cost"
                />
                <input
                    type="text"
                    name="build_category"
                    value={build.build_category}
                    onChange={handleInputChange}
                    placeholder="Build Category"
                />
                <input
                    type="text"
                    name="cpu"
                    value={build.cpu}
                    onChange={handleInputChange}
                    placeholder="CPU"
                />
                <input
                    type="text"
                    name="ram"
                    value={build.ram}
                    onChange={handleInputChange}
                    placeholder="RAM"
                />
                <input
                    type="text"
                    name="gpu"
                    value={build.gpu}
                    onChange={handleInputChange}
                    placeholder="GPU"
                />
                <input
                    type="text"
                    name="monitor"
                    value={build.monitor}
                    onChange={handleInputChange}
                    placeholder="Monitor"
                />
                <input
                    type="text"
                    name="storage"
                    value={build.storage}
                    onChange={handleInputChange}
                    placeholder="Storage"
                />
                <input
                    type="text"
                    name="psu"
                    value={build.psu}
                    onChange={handleInputChange}
                    placeholder="PSU"
                />
                <input
                    type="text"
                    name="info"
                    value={build.info}
                    onChange={handleInputChange}
                    placeholder="Info"
                />
                <input
                    type="text"
                    name="poster"
                    value={build.poster}
                    onChange={handleInputChange}
                    placeholder="Poster"
                />
                <input
                    type="text"
                    name="buildname"
                    value={build.buildname}
                    onChange={handleInputChange}
                    placeholder="Build Name"
                />
                <input
                    type="text"
                    name="buildlinks"
                    value={build.buildlinks}
                    onChange={handleInputChange}
                    placeholder="Build Links"
                />


                {/* Add other input fields for build details */}
                
                {editingBuild ? (
                build.details.map((details, index) => (
                    <input
                        key={index}
                        type="text"
                        value={details}
                        onChange={(e) => handleArrayInputChange(index, 'details', e.target.value)}
                        placeholder={`Detail ${index + 1}`}
                    />
                ))
            ) : (
                <input
                    type="text"
                    value=""
                    onChange={(e) => handleArrayInputChange(0, 'details', e.target.value)}
                    placeholder="Add Detail"
                />
            )}

            {/* Add input fields for backdrops array */}
            {editingBuild ? (
                build.backdrops.map((backdrops, index) => (
                    <input
                        key={index}
                        type="text"
                        value={backdrops}
                        onChange={(e) => handleArrayInputChange(index, 'backdrops', e.target.value)}
                        placeholder={`Backdrop ${index + 1}`}
                    />
                ))
            ) : (
                <input
                    type="text"
                    value=""
                    onChange={(e) => handleArrayInputChange(0, 'backdrops', e.target.value)}
                    placeholder="Add Backdrop"
                />
            )}




            
                <button type="submit">{editingBuild ? 'Update' : 'Add'}</button>
                <button onClick={() => setEditingBuild(null)}>Cancel</button>
            </form>
        </div>
    );
};

export default BuildForm;