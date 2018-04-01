import React from "react";
import PropTypes from "prop-types";
import {
    Table
} from "react-bootstrap";

import STATES from "common/constants/TestRunStates";

import ColumnFilter from "components/Shared/ColumnFilter/index";

import TestImporter from "./TestImporterContainer";
import TestRunListItem from "./TestRunListItem";
import TestRunsToolbar from "./TestRunsToolbar";

const testRunStatusFilterOptions = STATES.map(s => ({ id: s, name: s }));


class TestRunList extends React.Component {
    constructor(props) {
        super(props);
        this.applyFilters = this.applyFilters.bind(this);
        this.bulkDelete = this.bulkDelete.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleStatusFilter = this.handleStatusFilter.bind(this);
        this.hideSelector = this.hideSelector.bind(this);
        this.importTests = this.importTests.bind(this);
        this.showSelector = this.showSelector.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.toggleSelector = this.toggleSelector.bind(this);
    }
    componentDidMount() {
        if(this.props.execCycle && this.props.execCycle.id)
            this.props.fetchTestRuns(this.props.execCycle);
    }
    componentWillReceiveProps(nextProps) {
        if(
            (nextProps.execCycle && !this.props.execCycle) ||
            (nextProps.execCycle &&
                this.props.execCycle &&
                nextProps.execCycle.id != this.props.execCycle.id
            )
        ) {
            this.props.fetchTestRuns(nextProps.execCycle);
        }
    }
    applyFilters(testRuns) {
        const { statusFilter } = this.props;
        if(statusFilter)
            return testRuns.filter(tr => tr.status == statusFilter.id);
        return testRuns;
    }
    bulkDelete() {
        this.props.onDeleteTestRuns(this.props.selectedTestRuns.map(tr => tr.id));
    }
    handleChangeStatus(testRun, status) {
        this.props.onChangeTestRunStatus(testRun, status);
    }
    handleStatusFilter(value) {
        this.props.onChangeStatusFilter(value);
    }
    hideSelector() {
        this.toggleSelector(false);
    }
    importTests() {
        // console.log("import: ", data);
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
            allowAddTestRuns,
            allowDeleteTestRuns,
            allowEndExec,
            allowStartExec,
            allTestRunsSelected,
            execCycle,
            isInProgress,
            onEndExec,
            onStartExec,
            testRuns,
            showImportDialog,
            statusFilter
        } = this.props;

        return (<div className="test-runs-list">
            <TestRunsToolbar
                allowAdd={allowAddTestRuns}
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
                        <th>
                            Status
                            <ColumnFilter
                                items={testRunStatusFilterOptions}
                                selected={statusFilter}
                                onChange={this.handleStatusFilter} />
                        </th>
                        <th>Defects</th>
                    </tr>
                </thead>
                <tbody>
                    {this.applyFilters(testRuns).map(tr => <TestRunListItem
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
TestRunList.propTypes = {
    allowAddTestRuns: PropTypes.bool,
    allowDeleteTestRuns: PropTypes.bool,
    allowEndExec: PropTypes.bool,
    allowStartExec: PropTypes.bool,
    allTestRunsSelected: PropTypes.bool,
    execCycle: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    execCycleId: PropTypes.number,
    fetchTestRuns: PropTypes.func.isRequired,
    isInProgress: PropTypes.bool,
    onChangeStatusFilter: PropTypes.func.isRequired,
    onChangeTestRunStatus: PropTypes.func.isRequired,
    onDeleteTestRuns: PropTypes.func.isRequired,
    onEndExec: PropTypes.func.isRequired,
    onStartExec: PropTypes.func.isRequired,
    onToggleImportDialog: PropTypes.func.isRequired,
    onToggleSelect: PropTypes.func.isRequired,
    onToggleSelectAll: PropTypes.func.isRequired,
    selectedTestRuns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    showImportDialog: PropTypes.bool,
    statusFilter: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        name: PropTypes.string.isRequired
    }),
    testRuns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }))
};

export default TestRunList;
