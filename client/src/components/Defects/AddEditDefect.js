import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    Panel,
    Row,
    Well
} from "react-bootstrap";

import Comment from "components/Shared/Comment";

class AddEditDefect extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
    }
    componentDidMount() {
        if(this.props.defectID) {
            this.props.onInit(this.props.defectID);
        }
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeComment(ev) {
        this.props.onChangeComment(ev.target.value);
    }
    handleChangeDescr(ev) {
        this.props.onChangeDescription(ev.target.value);
    }
    handleChangeName(ev) {
        this.props.onChangeName(ev.target.value);
    }
    handleDelete() {

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
    render() {
        const { defectID, defect } = this.props;
        const { newComment, testCases, comments } = defect;

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
                <Row>
                    <Col md={12}>
                        <Panel>
                            <Panel.Body>
                                <FormGroup controlId="name">
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        value={defect.name}
                                        onChange={this.handleChangeName}
                                        type="text" />
                                </FormGroup>
                                <FormGroup controlId="description">
                                    <ControlLabel>Description</ControlLabel>
                                    <FormControl
                                        value={defect.description.value}
                                        onChange={this.handleChangeDescr}
                                        componentClass="textarea" />
                                </FormGroup>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
                {defect.testCases && defect.testCases.length
                    ? <Row>
                        <Col md={12}>
                            <Panel bsStyle="danger">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Test Cases</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    test cases...
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                    : null}

                {defect.id
                    ? <Row>
                        <Col md={12}>
                            <Panel bsStyle="info">
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
                        </Col>
                    </Row>
                    : null}
            </div>
        </div>);
    }
}
AddEditDefect.propTypes = {
    defectID: PropTypes.number
};

export default AddEditDefect;
