import { connect } from "react-redux";

import * as actions from "actions/TestDesign";
import { redirectToTestDesign } from "actions/Shared";

import AddEditTestCase from "./AddEditTestCase";

import {
    getTestCaseAddEditState
} from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    testCase: getTestCaseAddEditState(state)
});

const mapDispatchToProps = dispatch => ({
    onCancel() {
        dispatch(actions.resetAddEdit());
        dispatch(redirectToTestDesign());
    },
    onChangeComment(value) {
        dispatch(actions.changeTCComment(value));
    },
    onChangeDescription(val) {
        dispatch(actions.changeTCDescription(val));
    },
    onChangeName(val) {
        dispatch(actions.changeTCName(val));
    },
    onDeleteComment(id) {
        dispatch(actions.reqDeleteComment(id));
    },
    onInit(id) {
        dispatch(actions.resetAddEdit());
        dispatch(actions.reqTestCase(id));
    },
    onSave(testPlanID, testCase) {
        dispatch(actions.reqSaveTestCase(testPlanID, testCase));
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

const TestCaseListContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditTestCase);

export default TestCaseListContainer;
