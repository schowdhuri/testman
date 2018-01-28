import React from "react";
import PropTypes from "prop-types";

import AddEditTestCase from "./AddEditTestCaseContainer";
import TestPlans from "./TestPlansContainer";

import "sass/components/TestDesign.scss";

class TestDesign extends React.Component {
    render() {
        const { mode, testID, testPlanID } = this.props;
        return (<div className="test-design add-edit">
            <AddEditTestCase testPlanID={testPlanID} testID={testID} />
        </div>);
    }
}
TestDesign.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default TestDesign;
