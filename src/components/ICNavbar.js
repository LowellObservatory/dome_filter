import React from 'react';
import {
    Container,
    Navbar
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ICNavbar.css';

import logo from "../assets/images/lowelllogo_horizontal_black_web.png";

function ICNavbar() {

    return (
        <Navbar className="color-nav" fixed="top" expand="sm">
            <Navbar.Brand href="#home">
                <img
                    src={logo}
                    width="115"
                    height="40"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Container className="justify-content-center">
                <Navbar.Text><strong><font size="+2"> J1M Dome & Filter Control </font></strong></Navbar.Text>
            </Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        </Navbar>
    )
}

export default ICNavbar;