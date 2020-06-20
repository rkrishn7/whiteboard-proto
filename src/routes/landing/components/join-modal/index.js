import React, { useState } from 'react';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function JoinModal(props) {
    
    const {
        visible,
        onHide,
        onSubmit
    } = props;

    const [joinCode, setJoinCode]   = useState(null);
    const [userName, setUserName]   = useState(null);
    const [validated, setValidated] = useState(false);

    function handleSubmit(e) {
        const form = e.currentTarget;

        e.preventDefault();

        if(form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            onSubmit({ joinCode, userName });
        }

        setValidated(true);
    }

    return (
        <Modal
        show={visible}
        onHide={onHide}
        keyboard={false}
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Join a Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                        required 
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                        required 
                        placeholder="Invite Code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Join session!
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

