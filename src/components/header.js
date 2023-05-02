import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Profile from './Profile';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="./about.js">About the Team</Nav.Link>

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


