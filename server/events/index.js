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

e.use(Events.DRAW, function(data) {

    const {
        room
    } = data;

    const socket = this;

    socket.broadcast.to(room).emit(Events.DRAW, data);
});

e.use(Events.CREATE_ROOM, function(data) {

    const {
        name
    } = data;

    const socket = this;

    socket.join(name, () => {
        console.log(Object.keys(socket.rooms));
    });

    socket.emit(Events.CREATE_ROOM, data);
});
