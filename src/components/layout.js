import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <Container>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"><strong>Availity System</strong></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <Nav.Link href="/users">User</Nav.Link>
                            <Nav.Link href="/enroll-files">Enroll File</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </Container>
    );
}

export default Layout;
