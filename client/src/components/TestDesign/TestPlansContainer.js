import { connect } from "react-redux";
import TestPlans from "./TestPlans";

import * as actions from "actions/TestDesign";

import { redirectToTestDesign } from "actions/Shared";

import { getSelectedTestPlan, getTestPlans } from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";


const mapStateToProps = state => ({
    selected: getSelectedTestPlan(state),
    isLoading: isLoading(state),
    testPlans: getTestPlans(state)
});

const mapDispatchToProps = dispatch => ({
    reqTestPlans() {
        dispatch(actions.reqTestPlans());
    },
    onSave(testPlan) {
        dispatch(actions.reqSaveTestPlan(testPlan));
    },
    onSelect(testPlanId, redirect) {
        dispatch(actions.selectTestPlan({ id: testPlanId }, redirect));
        if(redirect)
            dispatch(redirectToTestDesign(testPlanId));
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
});

const TestPlansContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestPlans);

export default TestPlansContainer;
