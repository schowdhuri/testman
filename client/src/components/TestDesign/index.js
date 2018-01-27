import React from "react";
import PropTypes from "prop-types";

import AddEditTestCase from "./AddEditTestCaseContainer";
import TestPlans from "./TestPlansContainer";
import TestCaseList from "./TestCaseListContainer";

import "sass/components/TestDesign.scss";

class TestDesign extends React.Component {
    render() {
        const { mode, testID, testPlanID } = this.props;
        return (<div className="test-design">
            <TestPlans />
            <div className="test-cases">
                {mode=="add" || mode=="edit"
                    ? <AddEditTestCase testPlanID={testPlanID} testID={testID} />
                    : <TestCaseList />}
            </div>
        </div>);
    }
}
TestDesign.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default TestDesign;
