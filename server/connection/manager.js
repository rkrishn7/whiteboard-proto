const events    = require("../events/");
const logger    = require("../middleware/logger");

class Manager {

    constructor(io) {
        this.io = io; // socketIO server instance
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
                
                // Register event handlers
                socket.on(name, (data) => {
                    handler(self.io, socket, data);
                });
            });
        });
    }
}

module.exports = function(io) {
    return new Manager(io);
};