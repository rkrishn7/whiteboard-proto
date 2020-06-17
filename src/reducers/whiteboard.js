import {
    SET_WHITEBOARD_COLOR
} from "constants/whiteboard";

const initialState = {
    color: "#000000",
    lineWidth: 5,
};

export default function whiteboard(state = initialState, action) {
    switch(action.type) {
        case SET_WHITEBOARD_COLOR:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
    }
}