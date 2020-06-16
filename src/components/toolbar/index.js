import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import ColorPicker from "components/color-picker";

import "./index.css";


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="justify-content-between toolbar" expand="lg">
                <Navbar.Brand href="/" className="brand">whiteboard.io</Navbar.Brand>
                <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <ColorPicker />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}