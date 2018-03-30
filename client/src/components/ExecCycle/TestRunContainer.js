import { connect } from "react-redux";

import * as actions from "actions/ExecCycle";
import { redirectToExecCycle } from "actions/Shared";

import TestRun from "./TestRun";

import {
    allowDeleteTestRun,
    getTestRun,
    isInProgress
} from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    allowDelete: allowDeleteTestRun(state),
    isInProgress: isInProgress(state),
    isLoading: isLoading(state),
    testRun: getTestRun(state)
});

const mapDispatchToProps = dispatch => ({
    onLinkDefects(defects, testRun) {
        dispatch(actions.reqLinkDefects(testRun, defects));
    },
    onCancel(execCycleId) {
        dispatch(actions.resetTRAddEdit());
        dispatch(redirectToExecCycle(execCycleId));
    },
    onChangeStatus(testRun, status) {
        dispatch(actions.reqSaveTestRun({
            ...testRun,
            status
        }));
    },
    onDelete(testRun) {
        dispatch(actions.reqDeleteTestRuns([ testRun.id ]));
    },
    onInit(execCycleId, id) {
        dispatch(actions.resetTRAddEdit());
        dispatch(actions.selectExecCycle({
            id: execCycleId
        }));
        dispatch(actions.reqExecCycles());
        dispatch(actions.reqTestRun(id));
    },
    onSaveDefect(defect, files, testRun) {
        dispatch(actions.reqAddNewDefect(defect, files, testRun));
    },
    onUnlinkDefect(testRun, defect) {
        dispatch(actions.reqUnlinkDefect(testRun, defect));
    }
});

const mergeProps = (ownProps, stateProps, dispatchProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
};

const TestRunContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestRun);

export default TestRunContainer;
