import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "@reach/router";
import React, { Component } from "react";

export default class Navigation extends Component {
  render() {
    return(
      <Navbar
        fill="true"
        defaultActiveKey="/home"
        expand="lg"
        variant="dark"
        bg="dark"
      >
        <Navbar.Brand style={{ fontFamily: '"Old Standard TT", serif'}}>Alpha Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Team" id="nav-dropdown">
              <NavDropdown.Item eventKey="/team">
                <Link to="/team">Team</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="/team/jackie">
                <Link className="teamLink" to="/team/jackie">Jackie</Link>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="/team/marlon">
                <Link className="teamLink" to="/team/marlon">Marlon</Link>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="/team/hashim">
                <Link className="teamLink" to="/team/hashim">Hashim</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

  }
}