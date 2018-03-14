import { connect } from "react-redux";
import TestCaseList from "./TestCaseList";

import * as actions from "actions/TestDesign";

import {
    getTestCases,
    getSelectedTestPlan
} from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    testPlan: getSelectedTestPlan(state),
    testCases: getTestCases(state)
});

const mapDispatchToProps = dispatch => ({
    fetchTestCases(testPlan) {
        if(testPlan)
            dispatch(actions.reqTestCases(testPlan.id));
    },
    onUploadTests(testPlanId, file) {
        dispatch(actions.reqUploadTests(testPlanId, file));
    }
});

const TestCaseListContainer = connect(mapStateToProps, mapDispatchToProps)(TestCaseList);

export default TestCaseListContainer;
