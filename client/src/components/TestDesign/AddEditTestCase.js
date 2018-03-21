import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormControl,
    FormGroup,
    Panel,
    Table,
    Well
} from "react-bootstrap";
import Dropzone from "react-dropzone";

import Attachment from "components/Shared/Attachment";
import Comment from "components/Shared/Comment";
import Description from "components/Shared/Description";
import Title from "components/Shared/Title";

import LinkedDefect from "./LinkedDefect";

class AddEditTestCase extends React.Component {
    constructor(props) {
        super(props);
        this.handleAttach = this.handleAttach.bind(this);
        this.handleAttachFileToComment = this.handleAttachFileToComment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
    }
    componentDidMount() {
        this.props.onInit(this.props.testID);
    }
    handleAttach(files) {
        if(files && files.length) {
            const file = files[0];
            if(!file || !file.name || !file.size) {
                Alert.error("Invalid file");
                return;
            }
            this.props.onAttachFile(file, this.props.testCase, this.props.testPlanID);
        }
    }
    handleAttachFileToComment(file, comment) {
        this.props.onAttachFileToComment(
            file,
            comment,
            this.props.testCase.id,
            this.props.testPlanID
        );
    }
    handleAttachFile(file) {
        this.props.onAttachFile(file, this.props.defect);
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeComment(ev) {
        this.props.onChangeComment(ev.target.value);
    }
    handleDelete() {
        if(confirm("Delete this test case?")) {
            this.props.onDelete(
                this.props.testCase.id,
                this.props.testPlanID
            );
        }
    }
    handleDeleteComment(commentId) {
        this.props.onDeleteComment(commentId);
    }
    handleSave() {
        this.props.onSave(this.props.testPlanID, this.props.testCase);
    }
    handleSaveComment(value, attachments) {
        this.props.onSaveComment(
            {
                content: value,
                attachments
            },
            this.props.testCase.id
        );
    }
    handleUpdateComment(comment) {
        this.props.onSaveComment(
            comment,
            this.props.testCase.id
        );
    }
    render() {
        const {
            mode,
            onChangeDescription,
            onChangeName,
            onDeleteAttachment,
            onDownloadAttachment,
            onSaveAttachment,
            testID,
            testCase
        } = this.props;

        const {
            description,
            defects=[],
            comments=[]
        } = testCase;

        return (<div className="add-edit-tc">
            <div className="action-bar header-gradient-1">
                <ButtonToolbar>
                    {!testID || <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Delete</Button>}
                    <Button bsSize="small" onClick={this.handleCancel}>Close</Button>
                    <Button bsSize="small" bsStyle="success" onClick={this.handleSave}>Save</Button>
                </ButtonToolbar>
                {testID ? <h3>Edit Test Case</h3> : <h3>Add Test Case</h3>}
            </div>
            <div className="container">
                <Panel>
                    <Dropzone
                        className="dropzone"
                        activeClassName="active"
                        multiple={false}
                        disableClick={true}
                        onDrop={this.handleAttach}
                    >
                        <Panel.Body>
                            <Title
                                value={testCase.name}
                                placeholder="Name"
                                onUpdate={onChangeName} />
                            <Description
                                value={testCase.description.value}
                                placeholder="Describe this test"
                                onUpdate={onChangeDescription} />

                            <div className="attachments">
                                {description.attachments.map(attachment => <Attachment
                                    key={`attachment-${attachment.name}`}
                                    attachment={attachment}
                                    onDelete={onDeleteAttachment}
                                    onDownload={onDownloadAttachment}
                                    onSave={onSaveAttachment} />)}
                            </div>
                        </Panel.Body>
                    </Dropzone>
                </Panel>

                {testCase.id
                    ? <Panel className="defects">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Linked Defects</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {testCase.defects
                                ? <Table hover>
                                    <tbody>
                                        {testCase.defects.map(defect =>
                                            <LinkedDefect
                                                key={`def-${defect.id}`}
                                                defect={defect} />)}
                                    </tbody>
                                </Table>
                                : "No linked defects"}
                        </Panel.Body>
                    </Panel>
                    : null}

                {testCase.id
                    ? <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Comments</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Comment.New onSave={this.handleSaveComment} />
                            <hr />
                            {comments.map(comment => <Comment
                                key={comment.id}
                                data={comment}
                                onAddAttachment={this.handleAttachFileToComment}
                                onDelete={this.handleDeleteComment}
                                onDownloadAttachment={onDownloadAttachment}
                                onRemoveAttachment={onDeleteAttachment}
                                onSaveAttachment={onSaveAttachment}
                                onUpdate={this.handleUpdateComment} />)}
                        </Panel.Body>
                    </Panel>
                    : null}
            </div>
        </div>);
    }
}
AddEditTestCase.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default AddEditTestCase;
