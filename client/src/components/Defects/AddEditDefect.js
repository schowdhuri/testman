import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    Panel,
    Table
} from "react-bootstrap";

import createTempAttachment from "utils/Shared/createTempAttachment";

import Comment from "components/Shared/Comment";

import DefectForm from "./AddEditDefectForm";
import LinkedTest from "./LinkedTest";
import SelectorModal from "./SelectorModalContainer";

class AddEditDefect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attachments: [],
            showImportDialog: false
        };
        this.handleAddTests = this.handleAddTests.bind(this);
        this.handleAttachFile = this.handleAttachFile.bind(this);
        this.handleAttachFileToComment = this.handleAttachFileToComment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeAssignee = this.handleChangeAssignee.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleDeleteTestCase = this.handleDeleteTestCase.bind(this);
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
        this.hideSelector = this.hideSelector.bind(this);
        this.showSelector = this.showSelector.bind(this);
    }
    componentDidMount() {
        this.props.onInit(this.props.defectID);
    }
    handleAddTests(testCases) {
        this.props.onAddTests(testCases);
        this.hideSelector();
    }
    handleAttachFile(file) {
        if(this.props.isEditMode) {
            this.props.onAttachFile(
                file,
                this.props.defect
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
    handleAttachFileToComment(file, comment) {
        this.props.onAttachFileToComment(file, comment, this.props.defectID);
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeAssignee(user) {
        if(user && !this.props.assignee || user.props != this.props.assignee.id)
            this.props.onChangeAssignee(user);
    }
    handleChangeDescr(value) {
        this.props.onChangeDescription(value);
    }
    handleChangeName(value) {
        this.props.onChangeName(value);
    }
    handleChangeStatus(value) {
        this.props.onChangeStatus(value);
    }
    handleDelete() {
        if(confirm(`Delete this defect?`))
            this.props.onDelete(this.props.defect.id);
    }
    handleDeleteAttachment(attachment) {
        if(this.props.isEditMode) {
            this.props.onDeleteAttachment(attachment);
        } else {
            const index = this.state.attachments.findIndex(a =>
                attachment.id==a.id);
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
    handleDeleteTestCase(testCaseId) {
        this.props.onDeleteTestCase(testCaseId);
    }
    handleSave() {
        this.props.onSave(
            this.props.defect,
            this.state.attachments.map(a => a.file),
            !Boolean(this.props.defect.id)
        );
    }
    handleSaveComment(value, attachments) {
        this.props.onSaveComment(
            {
                content: value,
                attachments
            },
            this.props.defect.id
        );
    }
    handleUpdateComment(comment) {
        this.props.onSaveComment(
            comment,
            this.props.defect.id
        );
    }
    hideSelector() {
        this.setState({
            showImportDialog: false
        });
    }
    showSelector() {
        this.setState({
            showImportDialog: true
        });
    }
    render() {
        const {
            allowAddTestCase=true,
            allowDeleteTestCase=true,
            ActionBar,
            defectID,
            defect,
            isEditMode,
            onDeleteAttachment,
            onDownloadAttachment,
            onSaveAttachment,
            users
        } = this.props;
        const { comments } = defect;
        const testCases = this.props.testCases || defect.testCases;
        const { showImportDialog } = this.state;
        const attachments = isEditMode
            ? defect.description.attachments
            : this.state.attachments;
        return (<div className="add-edit-defect">
            {!ActionBar
                ? <div className="action-bar header-gradient-1">
                    <ButtonToolbar>
                        {!defectID || <Button
                            bsSize="small"
                            bsStyle="danger"
                            onClick={this.handleDelete}
                        >Delete</Button>}
                        <Button
                            bsSize="small"
                            onClick={this.handleCancel}
                        >Close</Button>
                        <Button
                            bsSize="small"
                            bsStyle="success"
                            onClick={this.handleSave}
                        >Save</Button>
                    </ButtonToolbar>
                    {defectID ? <h3>Edit Defect</h3> : <h3>Add Defect</h3>}
                </div>
                : null}
            <div className="container">
                <Panel>
                    <Panel.Body>
                        <DefectForm
                            assignee={defect.assignee}
                            attachments={attachments}
                            defectId={defect.id}
                            description={defect.description.value}
                            isEditMode={isEditMode}
                            name={defect.name}
                            status={defect.status}
                            users={users}
                            onAttachFile={this.handleAttachFile}
                            onChangeAssignee={this.handleChangeAssignee}
                            onChangeName={this.handleChangeName}
                            onChangeDescription={this.handleChangeDescr}
                            onChangeStatus={this.handleChangeStatus}
                            onDeleteAttachment={this.handleDeleteAttachment}
                            onDownloadAttachment={onDownloadAttachment}
                            onSaveAttachment={onSaveAttachment} />
                    </Panel.Body>
                </Panel>
                <Panel className="testcases">
                    <Panel.Heading>
                        {allowAddTestCase
                            ? <Button
                                bsStyle="link"
                                className="btn-add-test"
                                onClick={this.showSelector}
                            >
                                <i className="glyphicon glyphicon-plus text-info" />
                                {" "}
                                <span className="text-info">New</span>
                            </Button>
                            : null}
                        <Panel.Title componentClass="h3">Linked Test Cases</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {testCases && testCases.length
                            ? <Table hover>
                                <tbody>
                                    {testCases.map(tc => <LinkedTest
                                        key={`tc-${tc.id}`}
                                        allowDelete={allowDeleteTestCase}
                                        testCase={tc}
                                        onDelete={this.handleDeleteTestCase} />)}
                                </tbody>
                            </Table>
                            : <p className="empty-message">No linked tests</p>}
                    </Panel.Body>
                </Panel>

                {defect.id
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
                                onRemoveAttachment={onDeleteAttachment}
                                onDownloadAttachment={onDownloadAttachment}
                                onSaveAttachment={onSaveAttachment}
                                onUpdate={this.handleUpdateComment}
                                onDelete={this.handleDeleteComment} />)}
                        </Panel.Body>
                    </Panel>
                    : null}
            </div>
            {ActionBar
                ? <ActionBar
                    onSave={this.handleSave}
                    onCancel={this.handleCancel} />
                : null}
            <SelectorModal
                allowAddFolder={false}
                show={showImportDialog}
                onClose={this.hideSelector}
                onSave={this.handleAddTests} />
        </div>);
    }
}
AddEditDefect.propTypes = {
    ActionBar: PropTypes.func, // React component
    actionbar: PropTypes.bool,
    allowAddTestCase: PropTypes.bool,
    allowDeleteTestCase: PropTypes.bool,
    assignee: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    defect: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    defectID: PropTypes.number,
    isEditMode: PropTypes.bool.isRequired,
    onAddTests: PropTypes.func.isRequired,
    onAttachFileToComment: PropTypes.func.isRequired,
    onAttachFile: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeAssignee: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteAttachment: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    onDeleteTestCase: PropTypes.func.isRequired,
    onDownloadAttachment: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    onSaveAttachment: PropTypes.func.isRequired,
    testCases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }))
};

export default AddEditDefect;
