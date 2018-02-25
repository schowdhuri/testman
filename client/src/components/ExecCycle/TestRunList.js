import React from "react";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import TestImporter from "./TestImporterContainer";
import TestRunListItem from "./TestRunListItem";
import TestRunsToolbar from "./TestRunsToolbar";

class TestRunList extends React.Component {
    constructor(props) {
        super(props);
        this.bulkDelete = this.bulkDelete.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
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
    toggleSelect(testRun, status) {
        this.props.onToggleSelect(this.props.execCycle.id, testRun, status);
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
                    {testRuns.map(tr => <TestRunListItem
                        key={`tr-${tr.id}`}
                        testRun={tr}
                        execCycleId={execCycle.id}
                        allowChangeStatus={isInProgress}
                        onChangeStatus={this.handleChangeStatus}
                        onToggle={this.toggleSelect} />)}
                </tbody>
            </Table>
            <TestImporter
                show={showImportDialog}
                onClose={this.hideSelector}
                onSave={this.importTests} />
        </div>);
    }
}

export default TestRunList;
