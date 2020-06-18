import * as Constants from "constants/socket";

const initialState = {
    room: {
        joinCode: null,
        displayName: null,
        id: null,
    }
};

export default function socket(state = initialState, action) {
    switch(action.type) {
        case Constants.SET_ROOM_DETAILS:
            return {
                ...state,
                room: {
                    ...state.room,
                    joinCode: action.joinCode,
                    displayName: action.displayName,
                    id: action.id
                }
            };
        default:
            return state;
    }
}