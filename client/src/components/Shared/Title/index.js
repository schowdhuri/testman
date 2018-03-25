import React from "react";
import PropTypes from "prop-types";

import "sass/components/Title.scss";

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            editMode: false,
            mouseDownInside: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value != this.props.value)
            this.setState({ value: nextProps.value });
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside);
    }
    handleCancel(ev) {
        ev.preventDefault();
        this.setState({
            value: this.props.value,
            editMode: false
        });
    }
    handleChange(ev) {
        this.setState({ value: ev.target.value });
        if(typeof(this.props.onChange)=="function")
            this.props.onChange(ev.target.value);
    }
    handleEdit(ev) {
        ev.preventDefault();
        this.setState({ editMode: true });
    }
    handleKeyUp(ev) {
        if(ev.keyCode == 13) { // ENTER
            this.handleSave(ev);
        }
        if(ev.keyCode == 27) { // ESC
            this.handleCancel(ev);
        }
    }
    handleMouseDown() {
        this.setState({ mouseDownInside: true });
    }
    handleMouseUp() {
        this.setState({ mouseDownInside: false });
    }
    handleSave(ev) {
        if(ev)
            ev.preventDefault();
        this.setState({ editMode: false });
        this.props.onUpdate(this.state.value);
        this.textField.blur();
    }
    onClickOutside() {
        if(this.state.mouseDownInside)
            return;
        if(this.state.editMode) {
            this.handleSave();
        }
    }
    render() {
        const { editMode, value } = this.state;
        const { placeholder="Edit Title" } = this.props;
        return (<div
                className="editable-title"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
        >
            <input
                type="text"
                ref={ref => this.textField = ref}
                tabIndex={-1}
                className={editMode ? "form-control" : "form-control static"}
                placeholder={placeholder}
                value={value}
                onFocus={this.handleEdit}
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp} />
        </div>);
    }
}
Title.propTypes = {
    onChange: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

export default Title;
