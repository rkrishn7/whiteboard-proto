import React from "react";
import "./whiteboard.css";

import Wrapper from "./wrapper";

const debug = (message) => process.env.NODE_ENV === "development" && console.log(message);

export default class Whiteboard extends React.Component {

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

    componentDidUpdate() {
        console.log("update");
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
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "green";

    context.moveTo(this.coordinates.x, this.coordinates.y);
    this.updateCoordinates(event);
    context.lineTo(this.coordinates.x, this.coordinates.y);
    context.stroke();

    this.imageData = context.getImageData(0, 0, 600, 600);
};