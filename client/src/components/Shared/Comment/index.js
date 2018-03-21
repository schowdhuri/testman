import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Markdown from "react-markdown";
import Dropzone from "react-dropzone";

import {
    FormControl,
    FormGroup,
    Well
} from "react-bootstrap";

import createTempAttachment from "utils/Shared/createTempAttachment";

import Attachment from "components/Shared/Attachment";
import NewComment from "./NewComment";

import "sass/components/Comment.scss";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.data.content || "",
            editMode: false
        };
        this.handleAddAttachment = this.handleAddAttachment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRemoveAttachment = this.handleRemoveAttachment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleAddAttachment(files) {
        if(files && files.length) {
            const file = files[0];
            if(!file || !file.name || !file.size) {
                Alert.error("Invalid file");
                return;
            }
            this.props.onAddAttachment(file, this.props.data);
        }
    }
    handleRemoveAttachment(attachment) {
        this.props.onRemoveAttachment(attachment);
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
            this.props.onDelete(this.props.data.id);
    }
    handleEdit(ev) {
        ev.preventDefault();
        this.setState({ editMode: true });
    }
    handleSave(ev) {
        ev.preventDefault();
        this.setState({ editMode: false });
        this.props.onUpdate({
            ...this.props.data,
            content: this.state.content
        });
    }
    render() {
        const { data, onDownloadAttachment, onSaveAttachment } = this.props;
        const {
            attachments,
            created,
            modified,
            content,
            user
        } = data;
        const { editMode } = this.state;

        const elAttachments = (<div className="attachments">
                {attachments.map(attachment => <Attachment
                    key={`attachment-${attachment.id}`}
                    attachment={attachment}
                    onDownload={onDownloadAttachment}
                    onSave={onSaveAttachment}
                    onDelete={this.handleRemoveAttachment} />)}
        </div>);
        return (<div className="comment">
            <Dropzone
                className="dropzone"
                activeClassName="active"
                multiple={false}
                disableClick={true}
                disabled={!editMode}
                onDrop={this.handleAddAttachment}
            >
                <React.Fragment>
                {editMode
                    ? <React.Fragment>
                        <FormGroup controlId="editComment">
                            <FormControl
                                placeholder="Edit Comment"
                                value={this.state.content}
                                onChange={this.handleChange}
                                componentClass="textarea" />
                        </FormGroup>
                        {elAttachments}
                    </React.Fragment>
                    : <Well bsSize="large">
                        <div className="markdown-static">
                            <Markdown source={content} />
                        </div>
                        {elAttachments}
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
                </React.Fragment>
            </Dropzone>
        </div>);
    }
}
Comment.propTypes = {
    data: PropTypes.shape({
        attachments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            path: PropTypes.string
        })),
        content: PropTypes.string.isRequired,
        created: PropTypes.string,
        modified: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    onAddAttachment: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRemoveAttachment: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}


Comment.New = NewComment;

export default Comment;

