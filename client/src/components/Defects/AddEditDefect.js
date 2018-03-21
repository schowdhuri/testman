import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    FormControl,
    FormGroup,
    Panel,
    Table
} from "react-bootstrap";

import Comment from "components/Shared/Comment";

import DefectForm from "./AddEditDefectForm";
import LinkedTest from "./LinkedTest";
import SelectorModal from "./SelectorModalContainer";

class AddEditDefect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showImportDialog: false
        };
        this.handleAddTests = this.handleAddTests.bind(this);
        this.handleAttachFile = this.handleAttachFile.bind(this);
        this.handleAttachFileToComment = this.handleAttachFileToComment.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeAssignee = this.handleChangeAssignee.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        if(this.props.defectID) {
            this.props.onInit(this.props.defectID);
        }
    }
    handleAddTests(testCases) {
        this.props.onAddTests(testCases);
        this.hideSelector();
    }
    handleAttachFileToComment(file, comment) {
        this.props.onAttachFileToComment(file, comment, this.props.defectID);
    }
    handleAttachFile(file) {
        this.props.onAttachFile(file, this.props.defect);
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
    handleDeleteComment(commentId) {
        this.props.onDeleteComment(commentId);
    }
    handleDeleteTestCase(testCaseId) {
        this.props.onDeleteTestCase(testCaseId);
    }
    handleSave() {
        this.props.onSave(this.props.defect);
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
            defectID,
            defect,
            onDeleteAttachment,
            onDownloadAttachment,
            onSaveAttachment,
            selectedTestCases,
            users
        } = this.props;
        const { testCases, comments } = defect;
        const { showImportDialog } = this.state;
        return (<div className="add-edit-defect">
            <div className="action-bar header-gradient-1">
                <ButtonToolbar>
                    {!defectID || <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Delete</Button>}
                    <Button bsSize="small" onClick={this.handleCancel}>Close</Button>
                    <Button bsSize="small" bsStyle="success" onClick={this.handleSave}>Save</Button>
                </ButtonToolbar>
                {defectID ? <h3>Edit Defect</h3> : <h3>Add Defect</h3>}
            </div>
            <div className="container">
                <Panel>
                    <Panel.Body>
                        <DefectForm
                            assignee={defect.assignee}
                            defectId={defect.id}
                            name={defect.name}
                            description={defect.description.value}
                            attachments={defect.description.attachments}
                            status={defect.status}
                            users={users}
                            onAttachFile={this.handleAttachFile}
                            onChangeAssignee={this.handleChangeAssignee}
                            onChangeName={this.handleChangeName}
                            onChangeDescription={this.handleChangeDescr}
                            onChangeStatus={this.handleChangeStatus}
                            onDeleteAttachment={onDeleteAttachment}
                            onDownloadAttachment={onDownloadAttachment}
                            onSaveAttachment={onSaveAttachment} />
                    </Panel.Body>
                </Panel>
                <Panel className="testcases">
                    <Panel.Heading>
                        <Button bsStyle="link" className="btn-add-test" onClick={this.showSelector}>
                            <i className="glyphicon glyphicon-plus text-info" />
                            {" "}
                            <span className="text-info">New</span>
                        </Button>
                        <Panel.Title componentClass="h3">Linked Test Cases</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {defect.testCases.length
                            ? <Table hover>
                                <tbody>
                                    {defect.testCases.map(tc =>
                                        <LinkedTest
                                            key={`tc-${tc.id}`}
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
            <SelectorModal
                allowAddFolder={false}
                show={showImportDialog}
                onClose={this.hideSelector}
                onSave={this.handleAddTests} />
        </div>);
    }
}
AddEditDefect.propTypes = {
    defectID: PropTypes.number
};

export default AddEditDefect;
