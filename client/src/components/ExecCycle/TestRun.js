import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    MenuItem,
    Panel,
    Row,
    Well
} from "react-bootstrap";

import TR_STATES from "common/constants/TestRunStates";
import dateFormat from "common/utils/dateFormat";

import TR_COLORS from "constants/TestRunStateColors";


class TestRun extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.props.onInit(this.props.execCycleId, this.props.testRunId);
    }
    handleCancel() {
        this.props.onCancel();
    }
    handleChangeStatus(newStatus) {
        this.props.onChangeStatus(this.props.testRun, newStatus);
    }
    handleDelete() {

    }
    render() {
        const { isInProgress, mode, testRunId, testRun } = this.props;
        const { defects=[], comments=[], testCase } = testRun;

        return (<div className="edit-tr">
            <div className="action-bar header-gradient-1">
                <ButtonToolbar>
                    {isInProgress
                        ? <DropdownButton
                            bsStyle={TR_COLORS[testRun.status]}
                            bsSize="small"
                            title={testRun.status}
                            id="status-dd"
                        >
                            {TR_STATES.map(s => (<MenuItem
                                key={s}
                                onSelect={() => this.handleChangeStatus(s)}
                            >{s}</MenuItem>))}
                        </DropdownButton>
                        : <Button bsSize="small" bsStyle="warning" disabled>{testRun.status}</Button>}
                    {testRun.state == TR_STATES[2]
                        ? <Button bsSize="small" bsStyle="warning" onClick={this.handleAddDefect}>handleAddDefect
                            <i className="glyphicon glyphicon-plus" />
                            {" "}
                            Defect
                        </Button>
                        : null}
                    <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                    <Button bsSize="small" onClick={this.handleCancel}>Close</Button>
                </ButtonToolbar>
                <h3>{testRun.name || ""}</h3>
            </div>
            <div className="container">
                <Panel bsStyle="warning">
                    <Panel.Heading>Info</Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col md={6}>Status</Col>
                            <Col md={6}>
                                
                            </Col>
                        </Row>
                        {testCase && testCase.description && testCase.description.value
                            ? <Row>
                                <Col md={12}>{testCase.description.value}</Col>
                            </Row>
                            : null}
                        {testRun.runDate
                            ? <Row>
                                <Col md={6}>Last run: {dateFormat(testRun.runDate)}</Col>
                            </Row>
                            : null}
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
