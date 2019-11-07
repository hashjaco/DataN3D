import React, { Component } from "react";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "@reach/router";
import Routes from "./routes";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Navbar
          fill="true"
          defaultActiveKey="/home"
          expand="lg"
          variant="dark"
          bg="dark"
        >
          <Navbar.Brand>Alpha Data</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="About Us" id="nav-dropdown">
                <NavDropdown.Item eventKey="/team">
                  <Link to="/team">Team</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/team/jackie">
                  <Link to="/team/jackie">Jackie</Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/team/marlon">
                  <Link to="/team/marlon">Marlon</Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/team/hashim">
                  <Link to="/team/hashim">Hashim</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </>
    );
  }
}

const styles = {
  app: {
    flex: 1,
    marginTop: 0
  }
};
