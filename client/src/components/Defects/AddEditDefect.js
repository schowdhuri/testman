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
import TestSelector from "components/TestSelector";

class AddEditDefect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showImportDialog: false
        };
        this.handleAddTest = this.handleAddTest.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
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
    handleAddTest(val) {
        console.log("selected test: ", val);
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeComment(ev) {
        this.props.onChangeComment(ev.target.value);
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
    handleSave() {
        this.props.onSave(this.props.defect);
    }
    handleSaveComment() {
        this.props.onSaveComment(this.props.defect.id, this.props.defect.newComment);
    }
    handleUpdateComment(value, id) {
        this.props.onSaveComment(this.props.defect.id, value, id);
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
        const { defectID, defect, selectedTestCases } = this.props;
        const { newComment, testCases, comments } = defect;
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
                            defectId={defect.id}
                            name={defect.name}
                            description={defect.description.value}
                            status={defect.status}
                            onChangeName={this.handleChangeName}
                            onChangeDescription={this.handleChangeDescr}
                            onChangeStatus={this.handleChangeStatus} />
                    </Panel.Body>
                </Panel>
                <Panel className="testcases">
                    <Panel.Heading>
                        <Button bsStyle="link" className="btn-add-test" onClick={this.showSelector}>
                            <i className="glyphicon glyphicon-plus" />
                            {" "}
                            New
                        </Button>
                        <Panel.Title componentClass="h3">Linked Test Cases</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table hover>
                            <tbody>
                                {defect.testCases.map(tc =>
                                    <LinkedTest
                                        key={`tc-${tc.id}`}
                                        testCase={tc} />)}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>

                {defect.id
                    ? <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Comments</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <FormGroup controlId="newComment">
                                <FormControl
                                    placeholder="Add Comment"
                                    value={newComment}
                                    onChange={this.handleChangeComment}
                                    componentClass="textarea" />
                            </FormGroup>
                            <ButtonToolbar>
                                <Button
                                    bsSize="small"
                                    bsStyle="success"
                                    onClick={this.handleSaveComment}
                                    disabled={!newComment}
                                >Save</Button>
                            </ButtonToolbar>
                            <hr />
                            {comments.map(comment => <Comment
                                key={comment.id}
                                {...comment}
                                onUpdate={this.handleUpdateComment}
                                onDelete={this.handleDeleteComment} />)}
                        </Panel.Body>
                    </Panel>
                    : null}
            </div>

        </div>);
    }
}
AddEditDefect.propTypes = {
    defectID: PropTypes.number
};

export default AddEditDefect;

/*
SelectorModal
                allowAdd={!selectedTestCases.length}
                allowAddFolder={false}
                show={showImportDialog}
                onClose={this.hideSelector}
                onSave={this.handleAddTest} />
                */
