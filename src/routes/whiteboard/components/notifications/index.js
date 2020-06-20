import React, { useState, useEffect, useRef } from "react";

// React Bootstrap
import Toast from "react-bootstrap/Toast";

import socket from "socketio";
import events from "socketio/events";

export default function Notifications() {

    var mounted = useRef(false).current;

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        mounted = true;

        socket.on(events.USER_JOINED_ROOM, (data) => {

            const message = {
                title: "User Joined",
                body: `${data.userName} joined the room`
            };

            setNotifications(notifications.concat([message]));

            setTimeout(() => {
                mounted && setNotifications(notifications.slice(0, notifications.length - 1));
            }, 10000);

        });

        /*
        socket.on(events.USER_LEFT_ROOM, (data) => {

            notifications.push({
                title: "User Joined",
                body: `${data.userName} joined the room`
            });

        });
        */

        return () => {
            mounted = false;
        };
    }, []);



    return (
        <>
            {
                notifications.map(({ title, body }) => (
                    <Notification title={title} body={body} />
                ))
            }
        </>
    );
}

function Notification(props) {
    const {
        title,
        body
    } = props;

    return (
        <Toast
            
            style={{
                width: "200px",
                position: 'absolute',
                top: 5,
                right: 5,
            }}
        >
            <Toast.Header>
                <strong className="mr-auto">{title}</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
        </Toast>
    );
}