import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    DropdownButton,
    MenuItem,
    Table
} from "react-bootstrap";

import SelectorModal from "./SelectorModalContainer";
import TestRunsToolbar from "./TestRunsToolbar";

import TR_STATES from "constants/TestRunStates";
import TR_COLORS from "constants/TestRunStateColors";

class TestRunList extends React.Component {
    constructor(props) {
        super(props);
        this.bulkDelete = this.bulkDelete.bind(this);

        this.hideSelector = this.hideSelector.bind(this);
        this.importTests = this.importTests.bind(this);
        this.showSelector = this.showSelector.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.toggleSelector = this.toggleSelector.bind(this);
    }
    componentDidMount() {
        if(this.props.execCycle && this.props.execCycleId == this.props.execCycle.id)
            this.props.fetchTestRuns(this.props.execCycle);
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.execCycle != this.props.execCycle ||
            (nextProps.execCycle && this.props.execCycle && nextProps.execCycle.id != this.props.execCycle.id))
        ) {
            this.props.fetchTestRuns(nextProps.execCycle);
        }
    }
    bulkDelete() {
        this.props.onDeleteTestRuns(this.props.selectedTestRuns.map(tr => tr.id));
    }
    handleChangeStatus(testRun, status) {
        this.props.onChangeTestRunStatus(testRun, status);
    }
    hideSelector() {
        this.toggleSelector(false);
    }
    importTests(data) {
        console.log("import: ", data);
    }
    showSelector() {
        this.toggleSelector(true);
    }
    toggleSelect(testRun, ev) {
        this.props.onToggleSelect(this.props.execCycle.id, testRun, ev.target.checked);
    }
    toggleSelectAll(ev) {
        this.props.onToggleSelectAll(this.props.execCycle.id, ev.target.checked);
    }
    toggleSelector(show=false) {
        this.props.onToggleImportDialog(show);
    }
    render() {
        const {
            allowDeleteTestRuns,
            allowEndExec,
            allowStartExec,
            allTestRunsSelected,
            execCycle,
            isInProgress,
            onEndExec,
            onStartExec,
            testRuns,
            showImportDialog
        } = this.props;

        return (<div className="test-runs-list">
            <TestRunsToolbar
                allowDelete={allowDeleteTestRuns}
                allowEnd={allowEndExec}
                allowStart={allowStartExec}
                execCycle={execCycle}
                onAdd={this.showSelector}
                onDelete={this.bulkDelete}
                onEnd={onEndExec}
                onStart={onStartExec} />
            <Table striped condensed hover className="data-grid ">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={allTestRunsSelected}
                                onChange={(ev) => this.toggleSelectAll(ev)} />
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Defects</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {testRuns.map(tr => (<tr key={`tr-${tr.id}`}>
                        <td>
                            <input
                                type="checkbox"
                                checked={tr.selected}
                                onChange={(ev) => this.toggleSelect(tr, ev)} />
                        </td>
                        <td>{`TC-${tr.testCase}`}</td>
                        <td>
                            <Link to={`/execution/${execCycle.id}/test/edit/${tr.id}`}>{tr.name}</Link>
                        </td>
                        <td>
                            {isInProgress
                                ? <DropdownButton
                                    bsStyle={TR_COLORS[tr.status]}
                                    bsSize="xsmall"
                                    title={tr.status}
                                    id={`tr-${tr.id}-status-dd`}
                                >
                                    {TR_STATES.map(s => (<MenuItem
                                        key={s}
                                        onSelect={() => this.handleChangeStatus(tr, s)}
                                    >{s}</MenuItem>))}
                                </DropdownButton>
                                : tr.status}
                        </td>
                        <td>{tr.defects ? tr.defects.length : 0}</td>
                        <td>{tr.comments ? tr.comments.length : 0}</td>
                    </tr>))}
                </tbody>
            </Table>
            <SelectorModal show={showImportDialog} onClose={this.hideSelector} onSave={this.importTests} />
        </div>);
    }
}

export default TestRunList;
