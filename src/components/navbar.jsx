import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import { Container, Nav } from "react-bootstrap";
import { LoginView } from "./login-view/login-view";


export class NavView extends Component {

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">YourFavoriteReels</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/users">Profile</Nav.Link>
              <Nav.Link onClick={() => { this.onLoggedOut() }} href='/'>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

