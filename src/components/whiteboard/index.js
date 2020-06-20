import React from "react";

// React Redux
import { connect } from "react-redux";

// Misc
import Wrapper from "./wrapper";
import { debug } from "utils";

// SocketIO
import socket from "socketio";
import events from "socketio/events";

// CSS
import "./whiteboard.css";

class Whiteboard extends React.Component {

    constructor(props) {
        super(props);

        this.whiteboard = React.createRef();

        this.drawing = false;
        this.imageData = null;

        this.coordinates = {
            x: null,
            y: null,
        };

        // Bind handlers
        this.beginDrawing   = this.beginDrawing.bind(this);
        this.endDrawing     = this.endDrawing.bind(this);  
        this.draw           = this.draw.bind(this);
    }

    componentDidMount() {
        socket.on(events.DRAW, (data) => {

            const self = this.whiteboard.current;

            if(!self)
                return;

            const context = self.getContext("2d");

            context.beginPath();

            // Set props
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = "green";

            context.moveTo(data.coordinates.x1, data.coordinates.y1);
            context.lineTo(data.coordinates.x2, data.coordinates.y2);
            context.stroke();
            
        });

        socket.on(events.USER_JOINED_ROOM, (data) => {
            alert(`${data.userName} joined the room`);
        });

        socket.on(events.USER_LEFT_ROOM, (data) => {
            alert(`${data.userName} left the room`);
        });
    }

    render() {
        const {
            width,
            height
        } = this.props;

        return (
            <Wrapper
            width={width}
            height={height}>
                <canvas
                className="whiteboard"
                ref={this.whiteboard}
                onMouseDown={this.beginDrawing}
                onMouseUp={this.endDrawing}
                onMouseMove={this.draw}>
                </canvas>
            </Wrapper>
        );
    }
}

Whiteboard.prototype.updateCoordinates = function(event) {
    this.coordinates.x = event.nativeEvent.offsetX;
    this.coordinates.y = event.nativeEvent.offsetY;

    debug(`(${this.coordinates.x}, ${this.coordinates.y})`);
};

Whiteboard.prototype.beginDrawing = function(event) {
    this.updateCoordinates(event);
    this.drawing = true;
};

Whiteboard.prototype.endDrawing = function() {
    this.drawing = false;
};

Whiteboard.prototype.draw = function(event) {
    if(!this.drawing)
        return;
        
    const self = this.whiteboard.current;

    if(!self)
        return;

    const context = self.getContext("2d");

    context.beginPath();

    // Set props
    context.lineWidth = this.props.lineWidth;
    context.lineCap = "round";
    context.strokeStyle = this.props.color;

    const coordinates = {};
    coordinates["x1"] = this.coordinates.x;
    coordinates["y1"] = this.coordinates.y;

    context.moveTo(this.coordinates.x, this.coordinates.y);
    this.updateCoordinates(event);
    coordinates["x2"] = this.coordinates.x;
    coordinates["y2"] = this.coordinates.y;
    context.lineTo(this.coordinates.x, this.coordinates.y);
    context.stroke();

    console.log(this.props.roomId);

    if(this.props.roomId) {
        socket.emit(events.DRAW, {
            coordinates,
            roomId: this.props.roomId
        });
    }
};

const mapStateToProps = (state) => ({
    color: state.whiteboard.color,
    lineWidth: state.whiteboard.lineWidth,
    roomId: state.socket.room.id
});

export default connect(mapStateToProps)(Whiteboard);