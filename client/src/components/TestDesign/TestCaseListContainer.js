import { connect } from "react-redux";
import TestCaseList from "./TestCaseList";

import * as actions from "actions/TestDesign";

import {
    getTestCases
} from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    testCases: getTestCases(state)
});

const mapDispatchToProps = dispatch => ({
    fetchTestCases() {
        dispatch(actions.reqTestCases());
    }
});

const TestCaseListContainer = connect(mapStateToProps, mapDispatchToProps)(TestCaseList);

export default TestCaseListContainer;
