import React from "react";
import PropTypes from "prop-types";

import TestPlans from "./TestPlansContainer";
import TestCaseList from "./TestCaseListContainer";

import "sass/components/TestDesign.scss";

class ListView extends React.Component {
    render() {
        const { testPlanID } = this.props;
        return (<div className="test-design list">
            <TestPlans />
            <div className="test-cases">
                <TestCaseList testPlanID={testPlanID} />
            </div>
        </div>);
    }
}
ListView.propTypes = {
    testPlanID: PropTypes.number
};

export default ListView;
