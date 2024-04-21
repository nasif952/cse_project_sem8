import React from 'react';
import axios from 'axios';
import styles from './MonitorManagementStyles.module.css';

const BuildList = ({ builds, startEdit, fetchBuilds }) => {
    const handleEdit = (build) => {
        startEdit(build);
    };

    const handleDelete = async (buildid) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/builds/${buildid}`);
            fetchBuilds();
        } catch (error) {
            console.error('Error deleting build:', error);
        }
    };

    return (
        <div className={styles.monitorContainer}>
            <h3>PC Builds List</h3>
            <ul>
                {builds &&
                    builds.map((build) => (
                        <li key={build.buildid}> {/* Use a unique key */}
                            <span>Name : {build.buildname} ||
                             Category: {build.build_category} || <br></br> 
                            Cost : {build.cost} </span>
                            <button onClick={() => handleEdit(build)}>Edit</button>
                            <button onClick={() => handleDelete(build.buildid)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default BuildList;