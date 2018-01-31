import { connect } from "react-redux";
import TCSelector from "./Selector";

import * as actions from "actions/TestDesign";

import {
    getUnselectedItems,
    getSelectedItems
} from "selectors/TestDesign";

import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    // testPlan: getSelectedTestPlan(state),
    // testCases: getTestCases(state),
    unselectedItems,
    selectedItems
});

const mapDispatchToProps = dispatch => ({
    fetchTestCases(testPlan) {
        dispatch(actions.reqTestCases(testPlan.id));
    },
    fetchTestPlans() {
        dispatch(actions.reqTestCases(testPlan.id));
    }
});

const TCSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(TCSelector);

export default TCSelectorContainer;
