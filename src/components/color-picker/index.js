import React from "react";

// React Redux
import { connect } from "react-redux";

// Actions
import { setWhiteboardColor } from "actions/colorPicker";

// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// Misc
import { GithubPicker } from "react-color";

// CSS
import "./index.css";

// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                {children}
            </div>
        );
    },
);

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.handleColorSelect = this.handleColorSelect.bind(this);
    }

    handleColorSelect(color, event) {
        this.props.setWhiteboardColor(color.hex);
    }

    render() {
        return (
            <Dropdown className="dropdown">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <div className="colorDialog" style={{ backgroundColor: this.props.color }} />
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu} className="customMenu" alignRight>
                    <GithubPicker triangle="top-right" onChangeComplete={this.handleColorSelect} />
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => ({
    color: state.whiteboard.color
});

const mapDispatchToProps = (dispatch) => ({
    setWhiteboardColor: (color) => dispatch(setWhiteboardColor(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);