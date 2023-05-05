import '../index.css';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Profile from './Profile';
import { Link } from 'react-router-dom'


class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar variant='dark' collapseOnSelect expand="md">
          <Navbar.Brand href="/"><span id="headerTitle">DevDashersDashboard</span></Navbar.Brand>
          <Navbar.Toggle className='text-secondary' aria-controls="responsive-navbar-nav" />
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


