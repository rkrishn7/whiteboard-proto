const events    = require("../events/");
const logger    = require("../middleware/logger");

class Manager {

    constructor(io) {
        this.io = io; // socketIO server instance
        this.connections = io.sockets;
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        const self = this;

        this.io.on("connection", function (socket) {
            events.map(({ name, handler }) => {

                // Log events
                socket.on(name, logger(name));

                socket.on(name, (function() {
                    console.log(this.connections);
                }).bind(self));
                
                // Register event handlers
                socket.on(name, handler.bind(socket));
            });
        });
    }
}

module.exports = function(io) {
    return new Manager(io);
};