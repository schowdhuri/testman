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
    onChangeDescription(val) {
        dispatch(actions.changeTCDescription(val));
    },
    onChangeName(val) {
        dispatch(actions.changeTCName(val));
    },
    onInit(id) {
        dispatch(actions.resetAddEdit());
        dispatch(actions.reqTestCase(id));
    },
    onSave(testPlanID, testCase) {
        dispatch(actions.reqSaveTestCase(testPlanID, testCase));
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
