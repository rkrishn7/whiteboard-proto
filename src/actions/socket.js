import * as Constants from "constants/socket";

export function setRoomDetails(joinCode, displayName, id) {
    return {
        type: Constants.SET_ROOM_DETAILS,
        joinCode,
        displayName,
        id
    };
}