import {
    SET_WHITEBOARD_COLOR
} from "constants/whiteboard";

import {
    SET_LINE_WIDTH
} from "constants/whiteboard";

const initialState = {
    color: "#000000",
    lineWidth: 2,
};

export default function whiteboard(state = initialState, action) {
    switch(action.type) {
        case SET_WHITEBOARD_COLOR:
            return {
                ...state,
                color: action.color
            };
        case SET_LINE_WIDTH:
            return {
                ...state,
                lineWidth: action.lineWidth
            }
        default:
            return state;
    }
}