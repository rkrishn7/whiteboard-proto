import React, { useState } from 'react';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LaunchModal(props) {

    const {
        visible,
        onHide,
        onSubmit
    } = props;

    const [userName, setUserName]   = useState(null);
    const [roomName, setRoomName]   = useState(null);
    const [validated, setValidated] = useState(false);

    function handleSubmit(e) {
        const form = e.currentTarget;

        // Always prevent default behavior on form submit
        // i.e. prevent page refresh because we're using
        // client side navigation
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            onSubmit({ userName, roomName });
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
                <Modal.Title>Launch a Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                        required 
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We don't save any of your data
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        required 
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Launch a session!
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}