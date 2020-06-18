import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./index.css";

// React Router
import { useHistory } from "react-router-dom";

// Socket
import { createRoom } from "socketio";

export default function Landing() {
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [validated, setValidated] = useState(false);

    const history = useHistory();

    function handleShow(button) {
        if (button === 'join') {
            setShowJoinModal(true);
        } else if (button === 'create') {
            setShowCreateModal(true);
        }
    };

    function handleClose(button) {
        if (button === 'join') {
            setShowJoinModal(false);
        } else if (button === 'create') {
            setShowCreateModal(false);
        }
    }

    function handleLaunchSession(e) {
        const form = e.currentTarget;

        if(form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            createRoom("Test");
            history.push("/whiteboard");
        }

        setValidated(true);
    }

    return (
        <>
            <div id='main-container'>
                <div id='main-text'>
                    <h1>whiteboard</h1>
                </div>
                <div id='main-buttons'>
                    <Button variant='outline-primary' onClick={() => handleShow('join')}>Join a Session</Button>{' '}
                    <Button variant='outline-success' onClick={() => handleShow('create')}>Launch a Session</Button>{' '}
                </div>
            </div>
            <Modal
                show={showJoinModal}
                onHide={() => handleClose('join')}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Join a Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>
            <Modal
                show={showCreateModal}
                onHide={() => handleClose('create')}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Launch a Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleLaunchSession}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control required placeholder="Your Name" />
                            <Form.Text className="text-muted">
                                We don't save any of your data
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control required placeholder="Whiteboard Name" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Launch a session!
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}