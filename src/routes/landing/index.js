import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./index.css";

// React Redux
import { connect } from "react-redux";

// Actions
import { setRoomDetails } from "actions/socket";

// React Router
import { useHistory } from "react-router-dom";

// Socket
import socket from "socketio";
import events from "socketio/events";

function Landing(props) {
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [validated, setValidated] = useState(false);

    const [userJoinCode, setUserJoinCode] = useState(null);

    const history = useHistory();

    useEffect(() => {

        socket.on(events.JOIN_ROOM, function (data) {
            console.log("Joined room");
            props.setRoomDetails(data.joinCode, data.displayName, data.roomId);
            history.push("/whiteboard");
        });
    
        socket.on(events.JOIN_ERROR, function (data) {
            console.log(data.error);
        });
    
        socket.on(events.CREATE_ROOM, function (data) {
            console.log("Created room");
            console.log(data);
            props.setRoomDetails(data.joinCode, data.displayName, data.roomId);
            history.push("/whiteboard");
        });

    }, []);

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

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            e.stopPropagation();
            socket.emit(events.CREATE_ROOM, { displayName: "Test" });
        }

        setValidated(true);
    }

    function handleJoinSession(e) {
        e.preventDefault();

        socket.emit(events.JOIN_ROOM, { joinCode: userJoinCode });
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
                    <Form onSubmit={handleJoinSession}>
                        <Form.Control 
                        required 
                        placeholder="Invite Code"
                        value={userJoinCode}
                        onChange={(e) => setUserJoinCode(e.target.value)} />
                        <Form.Text className="text-muted">
                            The room's invite code
                        </Form.Text>
                        <Button variant="primary" type="submit">
                                Join a session!
                        </Button>
                    </Form>
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

const mapDispatchToProps = (dispatch) => ({
    setRoomDetails: (joinCode, displayName, id) => dispatch(setRoomDetails(joinCode, displayName, id))
});

export default connect(null, mapDispatchToProps)(Landing);