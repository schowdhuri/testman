import { connect } from "react-redux";
import TestPlans from "./TestPlans";

import * as actions from "actions/TestDesign";

import { getTestPlans } from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";


const mapStateToProps = state => ({
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
    onSelect(testPlanId) {
        dispatch(actions.selectTestPlan(testPlanId));
    }
});

const TestPlansContainer = connect(mapStateToProps, mapDispatchToProps)(TestPlans);

export default TestPlansContainer;
