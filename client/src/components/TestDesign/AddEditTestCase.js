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

import Comment from "components/Shared/Comment";
import Description from "components/Shared/Description";
import Title from "components/Shared/Title";

import LinkedDefect from "./LinkedDefect";

class AddEditTestCase extends React.Component {
    constructor(props) {
        super(props);
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
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeComment(ev) {
        this.props.onChangeComment(ev.target.value);
    }
    handleDelete() {

    }
    handleDeleteComment(commentId) {
        this.props.onDeleteComment(commentId);
    }
    handleSave() {
        this.props.onSave(this.props.testPlanID, this.props.testCase);
    }
    handleSaveComment() {
        this.props.onSaveComment(this.props.testCase.id, this.props.testCase.newComment);
    }
    handleUpdateComment(value, id) {
        this.props.onSaveComment(this.props.testCase.id, value, id);
    }
    render() {
        const {
            mode,
            onChangeDescription,
            onChangeName,
            testID,
            testCase
        } = this.props;
        const { newComment, defects=[], comments=[] } = testCase;

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
                    <Panel.Body>
                        <Title
                            value={testCase.name}
                            placeholder="Name"
                            onUpdate={onChangeName} />
                        <Description
                            value={testCase.description.value}
                            placeholder="Describe this test"
                            onUpdate={onChangeDescription} />
                    </Panel.Body>
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
AddEditTestCase.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default AddEditTestCase;
