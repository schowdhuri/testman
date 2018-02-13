import { connect } from "react-redux";
import TestRunList from "./TestRunList";

import * as actions from "actions/ExecCycle";

import {
    getTestRuns,
    getSelectedExecCycle,
    showImportDialog
} from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    execCycle: getSelectedExecCycle(state),
    testRuns: getTestRuns(state),
    showImportDialog: showImportDialog(state)
});

const mapDispatchToProps = dispatch => ({
    fetchTestRuns(execCycle) {
        if(execCycle)
            dispatch(actions.reqTestRuns(execCycle.id));
    },
    onToggleImportDialog(show) {
        dispatch(actions.toggleImportDialog(show));
    }
});

const TestRunListContainer = connect(mapStateToProps, mapDispatchToProps)(TestRunList);

export default TestRunListContainer;
