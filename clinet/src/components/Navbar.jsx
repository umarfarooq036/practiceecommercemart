import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { auth } from "../hook/auth";
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = auth();

  const handleLogout = () => {
    
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Navbar  expand="lg" className="" >
      
        <Navbar.Brand  className='fw-bold'>Products</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-end'>
          <Nav className="ml-auto">
            {user ? (
              <NavDropdown title={`Welcome, ${user.email}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
};

export default AppNavbar;
