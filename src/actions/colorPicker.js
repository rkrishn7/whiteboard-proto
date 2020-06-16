import {
    SET_WHITEBOARD_COLOR
} from "constants/index.js";

export function setWhiteboardColor(color) {
    return {
        type: SET_WHITEBOARD_COLOR,
        color
    };
}