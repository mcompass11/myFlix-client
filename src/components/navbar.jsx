import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import { Container, Nav } from "react-bootstrap";
import { LoginView } from "./login-view/login-view";
import { Link, NavLink } from "react-router-dom";


export function NavView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">YourFavoriteReels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link href='/profile'>Profile</Nav.Link>
            )}
            <Nav.Link onClick={() => onLoggedOut()} href='/'>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

