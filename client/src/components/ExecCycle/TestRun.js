import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Button,
    ButtonToolbar,
    DropdownButton,
    MenuItem,
    Panel,
    Table
} from "react-bootstrap";
import Markdown from "react-markdown";

import TR_STATES from "common/constants/TestRunStates";
import TR_COLORS from "constants/TestRunStateColors";

import dateFormat from "common/utils/dateFormat";

import LinkedDefect from "components/TestDesign/LinkedDefect";
import DefectSelector from "components/Shared/DefectSelector";

import DefectModal from "./AddDefectModal";

class TestRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDefectModal: false,
            showSelectDefectModal: false
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLinkDefects = this.handleLinkDefects.bind(this);
        this.handleSaveDefect = this.handleSaveDefect.bind(this);
        this.handleUnlinkDefect = this.handleUnlinkDefect.bind(this);
        this.hideDefectModal = this.hideDefectModal.bind(this);
        this.hideSelectDefectModal = this.hideSelectDefectModal.bind(this);
        this.showDefectModal = this.showDefectModal.bind(this);
        this.showSelectDefectModal = this.showSelectDefectModal.bind(this);
    }
    componentDidMount() {
        this.props.onInit(this.props.execCycleId, this.props.testRunId);
    }
    handleCancel() {
        this.props.onCancel(this.props.execCycleId);
    }
    handleChangeStatus(newStatus) {
        this.props.onChangeStatus(this.props.testRun, newStatus);
    }
    handleDelete() {
        if(confirm("Delete this test?"))
            this.props.onDelete(this.props.testRun);
    }
    handleLinkDefects(defects) {
        this.props.onLinkDefects(defects, this.props.testRun);
        this.hideSelectDefectModal();
    }
    handleSaveDefect(defect, files) {
        this.props.onSaveDefect(defect, files, this.props.testRun);
        this.hideDefectModal();
    }
    handleUnlinkDefect(defect) {
        this.props.onUnlinkDefect(this.props.testRun, defect);
    }
    hideDefectModal() {
        this.setState({
            showDefectModal: false
        });
    }
    hideSelectDefectModal() {
        this.setState({
            showSelectDefectModal: false
        });
    }
    showDefectModal() {
        this.setState({
            showDefectModal: true
        });
    }
    showSelectDefectModal() {
        this.setState({
            showSelectDefectModal: true
        });
    }
    render() {
        const {
            allowDelete,
            isInProgress,
            testRun
        } = this.props;
        const { defects, testCase } = testRun;
        const { showDefectModal, showSelectDefectModal } = this.state;

        return (<div className="edit-tr">
            <div className="action-bar header-gradient-1">
                <ButtonToolbar>
                    {testRun.state == TR_STATES[2]
                        ? <Button bsSize="small" bsStyle="warning">
                            <i className="glyphicon glyphicon-plus" />
                            {" "}
                            Defect
                        </Button>
                        : null}
                    {allowDelete
                        ? <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
                        : null}
                    <Button bsSize="small" onClick={this.handleCancel}>Close</Button>
                </ButtonToolbar>
                <h3>{testRun.name || ""}</h3>
            </div>
            <div className="container">
                <Panel>
                    <Panel.Heading>
                        <div className="header-buttons">
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
                            {isInProgress
                                ? <DropdownButton
                                    bsStyle={TR_COLORS[testRun.status]}
                                    bsSize="small"
                                    className="status-dd"
                                    title={testRun.status}
                                    id={`status-dd-${testRun.id}`}
                                >
                                    {TR_STATES.map(s => (<MenuItem
                                        key={s}
                                        onSelect={() => this.handleChangeStatus(s)}
                                    >{s}</MenuItem>))}
                                </DropdownButton>
                                : <Button
                                    bsSize="small"
                                    bsStyle={TR_COLORS[testRun.status]}
                                    disabled
                                >{testRun.status}</Button>}
                        </div>
                        Execution Details
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="markdown-static" onClick={this.handleEdit}>
                            <Markdown source={testCase.description}  />
                        </div>
                        {testCase && testCase.description && testCase.description.value
                            ? <p className="description">{testCase.description.value}</p>
                            : null}
                        {testRun.runDate
                            ? <p className="run-date">Last run: {dateFormat(testRun.runDate)}</p>
                            : null}
                    </Panel.Body>
                </Panel>

                <Panel className="defects">
                    <Panel.Heading>
                        <div className="header-buttons">
                            <Button bsStyle="link" bsSize="small" className="btn-link-defect" onClick={this.showSelectDefectModal}>
                                <i className="glyphicon glyphicon-link text-danger" />
                                {" "}
                                <span className="text-danger">Link</span>
                            </Button>
                            <Button bsStyle="link" bsSize="small" className="btn-add-defect" onClick={this.showDefectModal}>
                                <i className="glyphicon glyphicon-plus text-danger" />
                                {" "}
                                <span className="text-danger">New</span>
                            </Button>
                        </div>
                        <Panel.Title componentClass="h3">Defects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {defects.length
                            ? <Table hover>
                                <tbody>
                                    {defects.map(defect =>
                                        <LinkedDefect
                                            allowDelete={true}
                                            onDelete={this.handleUnlinkDefect}
                                            key={`defect-${defect.id}`}
                                            defect={defect} />)}
                                </tbody>
                            </Table>
                            : <p className="empty-message">No defects tagged</p>}

                    </Panel.Body>
                </Panel>
            </div>
            <DefectModal
                show={showDefectModal}
                testCase={testRun.testCase}
                onSave={this.handleSaveDefect}
                onClose={this.hideDefectModal} />
            <DefectSelector
                show={showSelectDefectModal}
                onSave={this.handleLinkDefects}
                onClose={this.hideSelectDefectModal} />
        </div>);
    }
}
TestRun.propTypes = {
    allowDelete: PropTypes.bool.isRequired,
    isInProgress: PropTypes.bool,
    testRunId: PropTypes.number,
    execCycleId: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onInit: PropTypes.func.isRequired,
    onLinkDefects: PropTypes.func.isRequired,
    onSaveDefect: PropTypes.func.isRequired,
    onUnlinkDefect: PropTypes.func.isRequired,
    testRun: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
};

export default TestRun;
