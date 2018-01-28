import { connect } from "react-redux";
import TestPlans from "./TestPlans";

import * as actions from "actions/TestDesign";
import { redirectToTestPlan } from "actions/Shared";

import {
    getSelectedTestPlanId,
    getTestPlans
} from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    selected: getSelectedTestPlanId(state),
    testPlans: getTestPlans(state)
});

const mapDispatchToProps = dispatch => ({
    onInit(testPlanId) {
        // if(testPlanId)
        //     dispatch(redirectToTestPlan(testPlanId));
        dispatch(actions.reqTestPlans());
    },
    onSave(testPlan) {
        dispatch(actions.reqSaveTestPlan(testPlan));
    },
    onSelect(testPlanId) {
        dispatch(actions.selectTestPlan(testPlanId));
    },
    redirectTo(testPlanId) {
        dispatch(redirectToTestPlan(testPlanId));
    }
});

const TestPlansContainer = connect(mapStateToProps, mapDispatchToProps)(TestPlans);

export default TestPlansContainer;
