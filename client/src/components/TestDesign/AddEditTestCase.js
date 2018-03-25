import Alert from "react-s-alert";
import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    Panel,
    Table
} from "react-bootstrap";
import Dropzone from "react-dropzone";

import createTempAttachment from "utils/Shared/createTempAttachment";

import Attachment from "components/Shared/Attachment";
import Comment from "components/Shared/Comment";
import Description from "components/Shared/Description";
import Title from "components/Shared/Title";

import LinkedDefect from "./LinkedDefect";

class AddEditTestCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attachments: []
        };
        this.handleAttach = this.handleAttach.bind(this);
        this.handleAttachFileToComment = this.handleAttachFileToComment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
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
            if(this.props.isEditMode) {
                this.props.onAttachFile(
                    file,
                    this.props.testCase,
                    this.props.testPlanID
                );
            } else {
                this.setState({
                    attachments: [
                        ...this.state.attachments,
                        createTempAttachment(file)
                    ]
                });
            }
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
    handleCancel() {
        this.props.onCancel();
    }
    handleDelete() {
        if(confirm("Delete this test case?")) {
            this.props.onDelete(
                this.props.testCase.id,
                this.props.testPlanID
            );
        }
    }
    handleDeleteAttachment(attachment) {
        if(this.props.editMode) {
            this.props.onDeleteAttachment(attachment);
        } else {
            const index = this.state.attachments.findIndex(a => attachment.id==a.id);
            this.setState({
                attachments: [
                    ...this.state.attachments.slice(0, index),
                    ...this.state.attachments.slice(index + 1)
                ]
            });
        }
    }
    handleDeleteComment(commentId) {
        this.props.onDeleteComment(commentId);
    }
    handleSave() {
        this.props.onSave(
            this.props.testPlanID,
            this.props.testCase,
            this.state.attachments.map(a => a.file),
            !this.props.editMode
        );
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
            isEditMode,
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
            comments=[]
        } = testCase;

        const attachments = isEditMode
            ? description.attachments
            : this.state.attachments;

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
                                {attachments.map(attachment => <Attachment
                                    key={`attachment-${attachment.name}`}
                                    attachment={attachment}
                                    allowEdit={isEditMode}
                                    allowDownload={isEditMode}
                                    onDelete={this.handleDeleteAttachment}
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
    defect: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    isEditMode: PropTypes.bool.isRequired,
    onAttachFile: PropTypes.func.isRequired,
    onAttachFileToComment: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onDeleteAttachment: PropTypes.func.isRequired,
    onDownloadAttachment: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveAttachment: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    testID: PropTypes.number,
    testCase: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    testPlanID: PropTypes.number
};

export default AddEditTestCase;
