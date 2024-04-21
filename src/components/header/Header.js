import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { isAdminAuthenticated, adminLogin, adminLogout } = useAdminAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/" style={{ color: 'gold' }}>
                    <FontAwesomeIcon icon={faDesktop} />
                    PCHOUSE
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/pcbuilder">
                            PC BUILDER
                        </NavLink>
                        {isAdminAuthenticated && (
                            <>
                                <NavLink className="nav-link" to="/admin">
                                    Admin Panel
                                </NavLink>
                                {/* Add more admin-specific links here */}
                            </>
                        )}
                    </Nav>
                    {!isAuthenticated && !isAdminAuthenticated ? (
                        <>
                            <Button variant="outline-info" className="me-2" as={NavLink} to="/login">
                                User Login
                            </Button>
                            <Button variant="outline-info" className="me-2" as={NavLink} to="/admin/login">
                                Admin Login
                            </Button>
                            <Button variant="outline-info" as={NavLink} to="/register">
                                Register
                            </Button>
                        </>
                    ) : isAuthenticated ? (
                        <Button variant="outline-danger" onClick={logout}>
                            Logout
                        </Button>
                    ) : isAdminAuthenticated ? (
                        <Button variant="outline-danger" onClick={adminLogout}>
                            Admin Logout
                        </Button>
                    ) : null}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;