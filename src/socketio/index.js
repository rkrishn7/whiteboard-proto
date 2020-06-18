import io from "socket.io-client";

const socket = io("http://localhost:8888");

/**
 * Event Handlers
 */

socket.on("CREATE_ROOM", (data) => {
    console.log("Room created: " + data.name);
});

/**
 * Methods
 */

export function createRoom(name) {
    socket.emit("CREATE_ROOM", { name });
}

export default socket;