const app   = require("express")();
const http  = require("http");

const server    = http.createServer(app);
const io        = require("socket.io")(server); // bind io instance to http server

// Middleware

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

// socketIO
io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("draw", (data) => {
        console.log(data);

        socket.broadcast.emit("drawData", data);
    });
});



server.listen(8888, () => {
    console.log("Server listening on port 8888");
});