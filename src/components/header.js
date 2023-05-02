import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

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
              <Dropdown drop='down-centered' align={{md:'end'}}>
                <Dropdown.Toggle variant="transparent">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default Header;


