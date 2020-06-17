import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './index.css';

export default function Landing() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  return( 
    <>
      <div id='main-container'>
        <div id='main-text'>
          <h1>WhiteBoard</h1>
        </div>
        <div id='main-buttons'>
          <Button variant='outline-primary' onClick={ () => handleShow('join') }>Join a Session</Button>{' '}
          <Button variant='outline-success' onClick={ () => handleShow('create') }>Create a Session</Button>{' '}
        </div>
      </div>
      <Modal
        show={showJoinModal}
        onHide={ () => handleClose('join') }
        keyboard={ false }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Join a WhiteBoard!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
      <Modal
        show={showCreateModal}
        onHide={ () => handleClose('create') }
        keyboard={ false }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a WhiteBoard!</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  )
}