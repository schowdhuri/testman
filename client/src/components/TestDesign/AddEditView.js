import React from "react";
import PropTypes from "prop-types";

import AddEditTestCase from "./AddEditTestCaseContainer";


class AddEditView extends React.Component {
    render() {
        const { testID, testPlanID } = this.props;
        return (<div className="test-design add-edit">
            <AddEditTestCase testPlanID={testPlanID} testID={testID} />
        </div>);
    }
}
AddEditView.propTypes = {
    testID: PropTypes.number,
    testPlanID: PropTypes.number
};

export default AddEditView;
