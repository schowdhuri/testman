import { connect } from "react-redux";

import * as actions from "actions/ExecCycle";
import { redirectToExecCycle } from "actions/Shared";

import TestRun from "./TestRun";

import { getTestRun } from "selectors/ExecCycle";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    testRun: getTestRun(state)
});

const mapDispatchToProps = dispatch => ({
    onCancel() {
        dispatch(actions.resetTRAddEdit());
        dispatch(redirectToExecCycle());
    },
    onChangeComment(value) {
        dispatch(actions.changeTRComment(value));
    },
    onChangeDescription(val) {
        dispatch(actions.changeTRDescription(val));
    },
    onChangeName(val) {
        dispatch(actions.changeTRName(val));
    },
    onDeleteComment(id) {
        dispatch(actions.reqDeleteComment(id));
    },
    onInit(id) {
        dispatch(actions.resetTRAddEdit());
        dispatch(actions.reqTestRun(id));
    },
    onSaveComment(testCaseId, value, id) {
        dispatch(actions.reqSaveTCComment(testCaseId, value, id));
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
