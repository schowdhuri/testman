import { connect } from "react-redux";
import TestRunList from "./TestRunList";

import * as actions from "actions/ExecCycle";

import {
    allowDeleteTestRun,
    allowEndExec,
    allowStartExec,
    getTestRuns,
    getSelectedExecCycle,
    getSelectedTestRuns,
    isInProgress,
    areAllTestRunsSelected,
    showImportDialog
} from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    allowDeleteTestRuns: allowDeleteTestRun(state),
    allowEndExec: allowEndExec(state),
    allowStartExec: allowStartExec(state),
    allTestRunsSelected: areAllTestRunsSelected(state),
    isInProgress: isInProgress(state),
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
    onChangeTestRunStatus(testRun, status) {
        dispatch(actions.reqSaveTestRun({
            ...testRun,
            status
        }));
    },
    onDeleteTestRuns(idArr) {
        dispatch(actions.reqDeleteTestRuns(idArr));
    },
    onEndExec(execCycle) {
        dispatch(actions.reqEndExecCycle(execCycle));
    },
    onStartExec(execCycle) {
        dispatch(actions.reqStartExecCycle(execCycle));
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
