import React from 'react';

// Pen Sizes
import penSizes from '../../constants/penSizes';

// Actions
import { setLineWidth } from "actions/lineSizePicker";

// React Redux
import { connect } from "react-redux";

// React Bootstrap
import Dropdown from 'react-bootstrap/Dropdown';

// CSS
import './index.css';

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

class PenSizeToggler extends React.Component {
    constructor(props) {
        super(props);

        this.handlePenSizeSelect = this.handlePenSizeSelect.bind(this);
    }

    handlePenSizeSelect(size) {
        this.props.setLineWidth(size);
    }

    PenSizes(props) {
        return(
            props.sizes.map((penSize) => (
                <Dropdown.Item key={penSize} className='dropdown-item' onSelect={ (penSize) => this.handlePenSizeSelect(penSize) }>
                    <div className='item-pen' style={{ width: penSize + "px", height: penSize + "px" }} />
                    <div>{penSize}</div>
                </Dropdown.Item>
            ))
        );
    }

    render() {
        return (
            <Dropdown className='dropdown'>
                <Dropdown.Toggle as={CustomToggle}>
                    <div className='penDialog'>
                        <div className='penSize' style={{ height: this.props.lineWidth + "px", width: this.props.lineWidth + "px" }} />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu} alignRight>
                    <this.PenSizes sizes={penSizes} />
                    <Dropdown.Item key="prop">
                        {this.props.lineWidth}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => ({
    lineWidth: state.whiteboard.lineWidth
});

const mapDispatchToProps = (dispatch) => ({
    setLineWidth: (lineWidth) => dispatch(setLineWidth(lineWidth))
});

export default connect(mapStateToProps, mapDispatchToProps)(PenSizeToggler);