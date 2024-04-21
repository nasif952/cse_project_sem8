import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBuildForm = () => {
    const { buildId } = useParams();
    const [buildData, setBuildData] = useState({
        // Initialize with empty values or fetch from API
    });

    useEffect(() => {
        const fetchBuildDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/builds/mypcs/${buildId}`);
                setBuildData(response.data);
            } catch (error) {
                console.error('Error fetching build details:', error);
            }
        };

        fetchBuildDetails();
    }, [buildId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuildData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/v1/admin/builds/${buildId}`, buildData);
            alert('Build updated successfully');
            console.log(response.data);
        } catch (error) {
            alert('Failed to update build');
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Edit Build</h2>
            <form onSubmit={handleSubmit}>
                {/* Render input fields with current build data */}
                {/* Example: */}
                <input
                    type="text"
                    name="Buildname"
                    placeholder="Build Name"
                    value={buildData.Buildname}
                    onChange={handleChange}
                    required
                />
                {/* Add more input fields for other build properties */}
                <button type="submit">Update Build</button>
            </form>
        </div>
    );
};

export default EditBuildForm;
