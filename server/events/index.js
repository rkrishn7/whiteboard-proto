/**
 * Events
 */

const Events = require("./constants");

const e = module.exports = [];

e.use = function(name, fn) {
    this.push({
        name,
        handler: fn
    });
};

e.use(Events.DRAW, function(socket, data) {

    const {
        room
    } = data;

    socket.broadcast.to(room).emit(Events.DRAW, data);
});

e.use(Events.CREATE_ROOM, function(socket, data) {

    const {
        name
    } = data;

    // Maybe add unique code to each room instance?
    socket.join(name, () => {
        console.log(this.connections.adapter.rooms);
    });

    socket.emit(Events.CREATE_ROOM, data);
});