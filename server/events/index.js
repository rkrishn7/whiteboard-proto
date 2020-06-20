/**
 * Node Core
 */

const crypto    = require("crypto");
const process   = require("process");


/**
 * Event Constants
 */

const Events    = require("./constants");

/**
 * Misc
 */

const Hashids   = require("hashids/cjs");

const hashids   = new Hashids("LOAD FROM .env", 4);

/**
 * Each event handler is invoked with three arguments
 * server (socketio server instance)
 * socket (socket connection)
 * data (data associated with the event)
 */

const e = module.exports = [];

e.use = function(name, fn) {
    this.push({
        name,
        handler: fn
    });
};


/**
 * Reserved events
 */

e.use("disconnecting", function(io, socket, data) {
    const rooms     = io.sockets.adapter.rooms;
    const roomIds   = Object.keys(socket.rooms);

    roomIds.forEach((roomId) => {
        // The unique rooms that sockets automatically join won't have
        // a 'users' property, so explicity check for this.
        if(typeof rooms[roomId].users === "undefined")
            return;

        const userName = rooms[roomId].users[socket.id].name;
        socket.to(roomId).emit(Events.USER_LEFT_ROOM, { userName });
    });
});

/**
 * Defined events
 */

e.use(Events.DRAW, function(io, socket, data) {

    const {
        roomId
    } = data;

    socket.to(roomId).emit(Events.DRAW, data);
});

e.use(Events.CREATE_ROOM, function(io, socket, data) {

    const {
        displayName,
        userName
    } = data;

    /**
     * We need to ensure every room name we store is unique, even though they may have
     * overlapping "real" names.
     * 
     * We'll create a hash with 20 random bytes, the current timestamp, and the user provided
     * room name to ensure uniqueness.
     */

    const timestamp = (new Date()).valueOf().toString();
    const random    = crypto.randomBytes(20).toString("hex");

    const encoded   = crypto.createHash("sha1").update(timestamp + random + displayName).digest("hex");

    socket.join(encoded, () => {
        // Generate unique join code for each room
        const rooms     = io.sockets.adapter.rooms;
        const joinCode  = rooms[encoded].joinCode = hashids.encode(Object.keys(rooms).length);
        
        // Set display name of room
        rooms[encoded].displayName = displayName;

        // Set up additional object to map socket ids to user names
        rooms[encoded].users = {};
        rooms[encoded].users[socket.id] = { name: userName };

        socket.emit(Events.CREATE_ROOM, {
            displayName,
            joinCode,
            roomId: encoded
        });

        console.log(rooms);
    });
});

e.use(Events.JOIN_ROOM, function(io, socket, data) {

    const {
        joinCode,
        userName
    } = data;

    const rooms = io.sockets.adapter.rooms;

    var roomId;

    const match = Object.keys(rooms).find(room => {

        if(rooms[room].joinCode == joinCode) {
            roomId = room;
            return true;
        }

        return false;
        
    });

    if(typeof match === "undefined") {
        return socket.emit(Events.JOIN_ERROR, {
            error: "Invalid Join Code"
        });
    }
    
    socket.join(match, () => {

        // Store user info
        rooms[match].users[socket.id] = { name: userName };

        socket.emit(Events.JOIN_ROOM, {
            displayName: match.displayName,
            joinCode,
            roomId
        });

        socket.to(roomId).emit(Events.USER_JOINED_ROOM, { userName });
    });
});