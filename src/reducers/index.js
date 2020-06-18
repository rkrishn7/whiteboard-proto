// Redux

import { combineReducers } from "redux";

// Reducers

import whiteboard from "./whiteboard";
import socket from "./socket";


export default combineReducers({
    whiteboard,
    socket
});

