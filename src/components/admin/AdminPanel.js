import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminPanel.css'; 




const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>

            <nav>

                <NavLink className="nav-link" to="/admin/cpu">
                    CPU
                </NavLink>
                <NavLink className="nav-link" to="/admin/graphicscard">
                    GPU
                </NavLink>
                <NavLink className="nav-link" to="/admin/monitor">
                    Monitor
                </NavLink>
                <NavLink className="nav-link" to="/admin/motherboard">
                    Motherboard
                </NavLink>
                <NavLink className="nav-link" to="/admin/powersupply">
                    PSU
                </NavLink>
                <NavLink className="nav-link" to="/admin/storage">
                    Storage
                </NavLink>
                <NavLink className="nav-link" to="/admin/RAM">
                    RAM
                </NavLink>
                <NavLink className="nav-link" to="/admin/builds">
                    Builds Edit
                </NavLink>

            </nav>

        </div>
    );
};

export default AdminPanel;