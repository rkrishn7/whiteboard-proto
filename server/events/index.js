/**
 * Events
 */

const Events = require("./constants");

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

e.use(Events.DRAW, function(io, socket, data) {

    const {
        room
    } = data;

    socket.broadcast.to(room).emit(Events.DRAW, data);
});

e.use(Events.CREATE_ROOM, function(io, socket, data) {

    const {
        name
    } = data;

    // Maybe add unique code to each room instance?
    socket.join(name, () => {
        // Generate unique code for each room (TODO)
        const rooms     = io.sockets.adapter.rooms;
        const joinCode  = rooms[name].joinCode = Object.keys(rooms).length;

        socket.emit(Events.CREATE_ROOM, {
            ...data,
            joinCode
        });

        console.log(rooms);
    });
});

e.use(Events.JOIN_ROOM, function(io, socket, data) {

    const {
        joinCode
    } = data;

    const rooms = io.sockets.adapter.rooms;

    const match = Object.keys(rooms).find(room => rooms[room].joinCode == joinCode);

    if(typeof match === "undefined")
        return;
    
    socket.join(match, () => {
        socket.emit(Events.JOIN_ROOM, {
            roomName: match
        });
    });
});