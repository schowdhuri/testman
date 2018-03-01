import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
    Table
} from "react-bootstrap";

import TR_STATES from "common/constants/TestRunStates";
import TR_COLORS from "constants/TestRunStateColors";

import dateFormat from "common/utils/dateFormat";

import DefectModal from "./AddDefectModal";
import LinkedDefect from "components/TestDesign/LinkedDefect";

class TestRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDefectModal: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSaveDefect = this.handleSaveDefect.bind(this);
        this.hideDefectModal = this.hideDefectModal.bind(this);
        this.showDefectModal = this.showDefectModal.bind(this);

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
    handleSaveDefect(defect) {
        this.props.onSaveDefect({
            ...defect,
            testCases: [ this.props.testRun.testCase.id ]
        });
    }
    hideDefectModal() {
        this.setState({
            showDefectModal: false
        });
    }
    showDefectModal() {
        this.setState({
            showDefectModal: true
        });
    }
    render() {
        const {
            isInProgress,
            mode,
            onDeleteDefect,
            testRunId,
            testRun
        } = this.props;
        const { testCase } = testRun;
        const { defects=[] } = testCase;
        const { showDefectModal } = this.state;

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
                        ? <Button bsSize="small" bsStyle="warning">
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
                <Panel>
                    <Panel.Heading>
                        {testCase && testCase.testPlan
                            ? <Link to={`/design/testplan/${testCase.testPlan.id}/testcase/edit/${testCase.id}`}
                                target="_blank"
                                className="test-link"
                            >
                                <span className="text-info">TC-{testCase.id}</span>
                                {" "}
                                <i className="glyphicon glyphicon-share text-info" />
                            </Link>
                            : null}
                        Execution Details
                    </Panel.Heading>
                    <Panel.Body>
                        {testCase && testCase.description && testCase.description.value
                            ? <p className="description">{testCase.description.value}</p>
                            : null}
                        {testRun.runDate
                            ? <p className="run-date">{dateFormat(testRun.runDate)}</p>
                            : null}
                    </Panel.Body>
                </Panel>

                <Panel className="defects">
                    <Panel.Heading>
                        <Button bsStyle="link" className="btn-add-defect" onClick={this.showDefectModal}>
                            <i className="glyphicon glyphicon-plus text-danger" />
                            {" "}
                            <span className="text-danger">New</span>
                        </Button>
                        <Panel.Title componentClass="h3">Defects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table hover>
                            <tbody>
                                {defects.map(defect =>
                                    <LinkedDefect
                                        allowDelete={true}
                                        onDelete={onDeleteDefect}
                                        key={`defect-${defect.id}`}
                                        defect={defect} />)}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
            <DefectModal show={showDefectModal} onSave={this.handleSaveDefect} onClose={this.hideDefectModal} />
        </div>);
    }
}
TestRun.propTypes = {
    mode: PropTypes.string,
    testRunId: PropTypes.number
};

export default TestRun;
