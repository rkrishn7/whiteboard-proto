const app   = require("express")();
const http  = require("http");

const server    = http.createServer(app);
const io        = require("socket.io")(server); // bind socketio server instance to http server instance

// Handles events, etc.
const manager   = require("./connection/manager")(io);

// Middleware

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

manager.init();

/*
io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("draw", (data) => {
        console.log(data);

        socket.broadcast.to(data.room).emit("drawData", data);
    });

    
    socket.on("create", (data) => {
        socket.join(data.name);

        console.log(data.name);

        socket.emit("room_created", data);
    });

    console.log(io.sockets.sockets);
});

*/

server.listen(8888, () => {
    console.log("Server listening on port 8888");
});