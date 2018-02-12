import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
    FormControl,
    FormGroup,
    Well
} from "react-bootstrap";

import "sass/components/Comment.scss";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content || "",
            editMode: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleCancel(ev) {
        ev.preventDefault();
        this.setState({
            content: this.props.content,
            editMode: false
        });
    }
    handleChange(ev) {
        this.setState({ content: ev.target.value });
    }
    handleDelete(ev) {
        ev.preventDefault();
        if(confirm("Delete this comment?"))
            this.props.onDelete(this.props.id);
    }
    handleEdit(ev) {
        ev.preventDefault();
        this.setState({ editMode: true });
    }
    handleSave(ev) {
        ev.preventDefault();
        this.setState({ editMode: false });
        this.props.onUpdate(this.state.content, this.props.id);
    }
    render() {
        const {
            created,
            modified,
            content
        } = this.props;
        const { editMode } = this.state;
        return (<div className="comment">
            {editMode
                ? <FormGroup controlId="editComment">
                    <FormControl
                        placeholder="Edit Comment"
                        value={this.state.content}
                        onChange={this.handleChange}
                        componentClass="textarea" />
                </FormGroup>
                : <Well bsSize="large">
                    {content}
                </Well>}
            {editMode
                ? <div className="controls">
                    <a href="#" onClick={this.handleSave}>Save</a> |
                    <a href="#" onClick={this.handleCancel}>Cancel</a>
                </div>
                : <div className="controls">
                    <span className="modified">Last updated: {moment(modified).format("DD MMM, HH:mm")}</span> |
                    <a href="#" onClick={this.handleEdit}>Edit</a> |
                    <a href="#" onClick={this.handleDelete}>Delete</a>
                </div>}
        </div>);
    }
}

export default Comment;
