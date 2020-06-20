import React from "react";

import Button from "react-bootstrap/Button";

// CSS
import "./index.css";

// React Redux
import { connect } from "react-redux";

// Actions
import { setRoomDetails } from "actions/socket";

// React Router
import { withRouter } from "react-router-dom";

// Socket
import socket from "socketio";
import events from "socketio/events";

// Misc.
import LaunchModal from "./components/launch-modal";
import JoinModal from "./components/join-modal";

class Landing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            joinDialogVisible: false,
            launchDialogVisible: false,
        };

        this.setJoinDialogVisible = (visible) => {
            this.setState((state) => ({
                ...state,
                joinDialogVisible: visible
            }));
        };

        this.setLaunchDialogVisible = (visible) => {
            this.setState((state) => ({
                ...state,
                launchDialogVisible: visible
            }));
        };

        // Bind event handlers
        this.launchSession = this.launchSession.bind(this);
        this.joinSession = this.joinSession.bind(this);
    }

    componentDidMount() {
        // Initialize events
        socket.on(events.JOIN_ROOM, (data) => {
            this.props.setRoomDetails(data.joinCode, data.displayName, data.roomId);
            this.props.history.push("/whiteboard");
        });

        socket.on(events.JOIN_ERROR, (data) => {
            alert(data.error);
        });

        socket.on(events.CREATE_ROOM, (data) => {
            this.props.setRoomDetails(data.joinCode, data.displayName, data.roomId);
            this.props.history.push("/whiteboard");
        });
    }

    launchSession({ userName, roomName }) {
        socket.emit(events.CREATE_ROOM, { displayName: roomName, userName });
    }

    joinSession({ joinCode, userName }) {
        socket.emit(events.JOIN_ROOM, { joinCode, userName });
    }

    render() {
        return (
            <div>
                <div id='main-container'>
                    <div id='main-text'>
                        <h1>whiteboard</h1>
                    </div>
                    <div id='main-buttons'>
                        <Button variant='outline-primary' onClick={() => this.setJoinDialogVisible(true)}>Join a Session</Button>{' '}
                        <Button variant='outline-success' onClick={() => this.setLaunchDialogVisible(true)}>Launch a Session</Button>{' '}
                    </div>
                    <LaunchModal
                    visible={this.state.launchDialogVisible}
                    onHide={() => this.setLaunchDialogVisible(false)}
                    onSubmit={this.launchSession}
                    />
                    <JoinModal
                    visible={this.state.joinDialogVisible}
                    onHide={() => this.setJoinDialogVisible(false)}
                    onSubmit={this.joinSession}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setRoomDetails: (joinCode, displayName, id) => dispatch(setRoomDetails(joinCode, displayName, id))
});

export default connect(null, mapDispatchToProps)(withRouter(Landing));