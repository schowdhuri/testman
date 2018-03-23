import Alert from "react-s-alert";
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import {
    Button,
    ButtonToolbar,
    Col,
    FormControl,
    FormGroup,
    Row
} from "react-bootstrap";

import createTempAttachment from "utils/Shared/createTempAttachment";

import Attachment from "components/Shared/Attachment";


class NewComment extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: "",
            attachments: []
        };
        this.handleAttach = this.handleAttach.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleAttach(files) {
        if(files && files.length) {
            const file = files[0];
            if(!file || !file.name || !file.size) {
                Alert.error("Invalid file");
                return;
            }
            this.setState({
                attachments: [
                    ...this.state.attachments,
                    createTempAttachment(file)
                ]
            });
        }
    }
    handleChange(ev) {
        this.setState({ value: ev.target.value });
    }
    handleDeleteAttachment(attachment) {
        const index = this.state.attachments.findIndex(a =>
            a._id==attachment._id);
        this.setState({
            attachments: [
                ...this.state.attachments.slice(0, index),
                ...this.state.attachments.slice(index + 1)
            ]
        });
    }
    handleSave() {
        this.props.onSave(
            this.state.value,
            this.state.attachments.map(a => a.file)
        );
        this.setState({
            value: "",
            attachments: []
        });
    }
    render() {
        const { attachments, value } = this.state;

        return (<Dropzone
            className="dropzone"
            activeClassName="active"
            multiple={false}
            disableClick={true}
            onDrop={this.handleAttach}
        >
            <FormGroup controlId="newComment">
                <FormControl
                    componentClass="textarea"
                    placeholder="Add Comment"
                    value={value}
                    onChange={this.handleChange} />
            </FormGroup>
            <Row>
                <Col md={12} className="attachments">
                    {attachments.map(attachment => <Attachment
                        key={`attachment-${attachment._id}`}
                        attachment={attachment}
                        allowEdit={false}
                        allowDownload={false}
                        onDelete={this.handleDeleteAttachment} />)}
                </Col>
            </Row>
            <ButtonToolbar>
                <Button
                    bsSize="small"
                    bsStyle="success"
                    onClick={this.handleSave}
                    disabled={!value}
                >Save</Button>
            </ButtonToolbar>
        </Dropzone>);
    }
};
NewComment.propTypes = {
    value: PropTypes.string,
    onAttachFile: PropTypes.func,
    onSave: PropTypes.func.isRequired
};

export default NewComment;
