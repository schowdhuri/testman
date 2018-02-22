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

class TestRun extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.props.onInit(this.props.testRunId);
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleDelete() {

    }
    render() {
        const { mode, testRunId, testRun } = this.props;
        const { defects=[], comments=[], testCase } = testRun;

        return (<div className="edit-tr">
            <div className="action-bar header-gradient-1">
                <ButtonToolbar>
                    <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    <Button bsSize="small" onClick={this.handleCancel}>Close</Button>
                </ButtonToolbar>
                <h3>{testRun.name || ""}</h3>
            </div>
            <div className="container">
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Details</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {testCase && testCase.description && testCase.description.value
                            ? <div>{testCase.description.value}</div>
                            : null}
                        <div>
                            Last run: {testRun.modified}
                        </div>
                    </Panel.Body>
                </Panel>
                
                <Panel bsStyle="danger">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Defects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        defects...
                    </Panel.Body>
                </Panel>
            </div>
        </div>);
    }
}
TestRun.propTypes = {
    mode: PropTypes.string,
    testRunId: PropTypes.number
};

export default TestRun;
