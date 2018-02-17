import { connect } from "react-redux";
import TestRunList from "./TestRunList";

import * as actions from "actions/ExecCycle";

import {
    allowDeleteTestRun,
    getTestRuns,
    getSelectedExecCycle,
    getSelectedTestRuns,
    areAllTestRunsSelected,
    showImportDialog
} from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    allowDeleteTestRuns: allowDeleteTestRun(state),
    allTestRunsSelected: areAllTestRunsSelected(state),
    isLoading: isLoading(state),
    execCycle: getSelectedExecCycle(state),
    testRuns: getTestRuns(state),
    selectedTestRuns: getSelectedTestRuns(state),
    showImportDialog: showImportDialog(state)
});

const mapDispatchToProps = dispatch => ({
    fetchTestRuns(execCycle) {
        if(execCycle)
            dispatch(actions.reqTestRuns(execCycle.id));
    },
    onDeleteTestRuns(idArr) {
        dispatch(actions.reqDeleteTestRuns(idArr));
    },
    onToggleImportDialog(show) {
        dispatch(actions.toggleImportDialog(show));
    },
    onToggleSelect(execCycleId, testRun, status) {
        dispatch(actions.toggleSelect(execCycleId, testRun, status));
    },
    onToggleSelectAll(execCycleId, status) {
        dispatch(actions.toggleSelectAll(execCycleId, status));
    }
});

const TestRunListContainer = connect(mapStateToProps, mapDispatchToProps)(TestRunList);

export default TestRunListContainer;
