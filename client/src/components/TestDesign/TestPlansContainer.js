import { connect } from "react-redux";
import TestPlans from "./TestPlans";

import * as actions from "actions/TestDesign";

import {
    getTestPlans
} from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    testPlans: getTestPlans(state)
});

const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(actions.reqTestPlans());
    },
    onSelect(testPlan) {
        dispatch(actions.selectTestPlan(testPlan));
    }
});

const TestPlansContainer = connect(mapStateToProps, mapDispatchToProps)(TestPlans);

export default TestPlansContainer;
