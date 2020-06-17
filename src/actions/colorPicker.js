import {
    SET_WHITEBOARD_COLOR
} from "constants/whiteboard";

export function setWhiteboardColor(color) {
    return {
        type: SET_WHITEBOARD_COLOR,
        color
    };
}