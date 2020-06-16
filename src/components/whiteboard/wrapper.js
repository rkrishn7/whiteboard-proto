import React from "react";

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 300,
            height: 300
        };

        /**
         * Remove event listener for resize.
         * Task: Figure out how to save data on canvas resize and redisplay it
         */

        //window.addEventListener("resize", this.resize.bind(this));

        this.wrapper = React.createRef();
    }

    resize() {
        this.setState((state) => ({
            ...state,
            width: this.wrapper.current.clientWidth,
            height: this.wrapper.current.clientHeight
        }));
    }

    componentDidMount() {
        this.resize();
    }

    render() {
        const {
            width,
            height,
            children
        } = this.props;

        return (
            <div
            ref={this.wrapper}
            style={{ width: width, height: height }}
            >
                {React.cloneElement(children, { 
                    width: this.state.width,
                    height: this.state.height
                })}
            </div>
        )
    }
};