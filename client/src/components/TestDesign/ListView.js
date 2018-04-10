import React from "react";
import PropTypes from "prop-types";

import TestPlans from "./TestPlansContainer";
import TestCaseList from "./TestCaseListContainer";


class ListView extends React.Component {
    render() {
        const { testPlanId } = this.props;
        return (<div className="test-design list">
            <TestPlans testPlanId={testPlanId} />
            <div className="test-cases">
                <TestCaseList testPlanId={testPlanId} />
            </div>
        </div>);
    }
}
ListView.propTypes = {
    testPlanId: PropTypes.number
};

export default ListView;
