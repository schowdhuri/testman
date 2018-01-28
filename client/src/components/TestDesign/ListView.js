import React from "react";
import PropTypes from "prop-types";

import TestPlans from "./TestPlansContainer";
import TestCaseList from "./TestCaseListContainer";

import "sass/components/TestDesign.scss";

class ListView extends React.Component {
    render() {
        const { mode, testID, testPlanID } = this.props;
        return (<div className="test-design list">
            <TestPlans />
            <div className="test-cases">
                <TestCaseList testPlanID={testPlanID} />
            </div>
        </div>);
    }
}
ListView.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default ListView;
