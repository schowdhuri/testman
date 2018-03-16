import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Markdown from "react-markdown";
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
            content,
            user
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
                    <div className="markdown-static">
                        <Markdown source={content} />
                    </div>
                </Well>}
            {editMode
                ? <div className="controls">
                    <a href="#" onClick={this.handleSave}>
                        <i className="glyphicon glyphicon-ok text-success" />
                        <span className="text-success">Save</span>
                    </a>
                    <a href="#" onClick={this.handleCancel}>
                        <i className="glyphicon glyphicon-remove text-warning" />
                        <span className="text-warning">Cancel</span>
                    </a>
                </div>
                : <div className="controls">
                    {user
                        ? <span className="user">
                            <i className="glyphicon glyphicon-user" />
                            {user.name}
                        </span>
                        : null}
                    <span className="modified">
                        <i className="glyphicon glyphicon-time" title="Last updated" />
                        {moment(modified).format("DD MMM, HH:mm")}
                    </span>
                    <a href="#" className="text-info" onClick={this.handleEdit}>
                        <i className="glyphicon glyphicon-pencil text-info" />
                        Edit
                    </a>
                    <a href="#" className="text-danger" onClick={this.handleDelete}>
                        <i className="glyphicon glyphicon-trash text-danger" />
                        Delete
                    </a>
                </div>}
        </div>);
    }
}

export default Comment;

