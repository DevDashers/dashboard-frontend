import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Profile from './Profile';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/about">About the Team</Link>
            </Nav>
            <Nav>
              <Profile/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default Header;


