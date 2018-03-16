import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from 'react-autosize-textarea';
import Markdown from "react-markdown";

import "sass/components/Description.scss";

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
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
        this.setState({ value: this.props.value });
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
        console.log("clicked")
        ev.preventDefault();
        this.setState({ editMode: true });
    }
    handleKeyUp(ev) {
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
    }
    onClickOutside() {
        if(this.state.mouseDownInside)
            return;
        if(this.state.editMode) {
            this.handleSave();
        }
    }
    render() {
        const { value, editMode } = this.state;
        const { placeholder="Edit Description" } = this.props;

        return (<div
                className="editable-description"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
        >
            {editMode
                ? <React.Fragment>
                    <TextareaAutosize
                        ref={ref => this.textField = ref}
                        tabIndex={-1}
                        className={editMode ? "form-control" : "form-control static"}
                        placeholder={placeholder}
                        value={value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp} />
                    <div className="controls">
                        <a href="#" onClick={this.handleSave}>
                            <i className="glyphicon glyphicon-ok text-success" />
                            <span className="text-success">Save</span>
                        </a>
                        <a href="#" onClick={this.handleCancel}>
                            <i className="glyphicon glyphicon-remove text-warning" />
                            <span className="text-warning">Cancel</span>
                        </a>
                    </div>
                </React.Fragment>
                : <div className="markdown-static" onClick={this.handleEdit}>
                    <Markdown source={value}  />
                </div>}
        </div>);
    }
}

export default Description;
