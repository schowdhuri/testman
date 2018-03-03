import { connect } from "react-redux";

import * as actions from "actions/ExecCycle";
import { redirectToExecCycle } from "actions/Shared";

import TestRun from "./TestRun";

import {
    getTestRun,
    isInProgress
} from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isInProgress: isInProgress(state),
    isLoading: isLoading(state),
    testRun: getTestRun(state)
});

const mapDispatchToProps = dispatch => ({
    onLinkDefects(defects, testRun) {
        dispatch(actions.reqLinkDefects(testRun, defects));
    },
    onCancel() {
        dispatch(actions.resetTRAddEdit());
        dispatch(redirectToExecCycle());
    },
    onChangeStatus(testRun, status) {
        dispatch(actions.reqSaveTestRun({
            ...testRun,
            status
        }));
    },
    onInit(execCycleId, id) {
        dispatch(actions.resetTRAddEdit());
        dispatch(actions.selectExecCycle({
            id: execCycleId
        }));
        dispatch(actions.reqExecCycles());
        dispatch(actions.reqTestRun(id));
    },
    onSaveDefect(defect, testRun) {
        dispatch(actions.reqAddNewDefect(defect, testRun));
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

const TestRunContainer = connect(mapStateToProps, mapDispatchToProps)(TestRun);

export default TestRunContainer;
