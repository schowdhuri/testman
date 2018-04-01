import React from "react";
import PropTypes from "prop-types";

import AddEditTestCase from "./AddEditTestCaseContainer";


class AddEditView extends React.Component {
    render() {
        const { testId, testPlanId } = this.props;
        return (<div className="test-design add-edit">
            <AddEditTestCase testPlanId={testPlanId} testId={testId} />
        </div>);
    }
}
AddEditView.propTypes = {
    testId: PropTypes.number,
    testPlanId: PropTypes.number
};

export default AddEditView;
