import React from "react";
import PropTypes from "prop-types";

import ListView from "./ListView";
import AddEditView from "./AddEditView";

import "./TestDesign.scss";

class TestDesign extends React.Component {
    render() {
        const { mode, testId, testPlanId } = this.props;
        return mode=="list"
            ? <ListView testPlanId={testPlanId} />
            : <AddEditView testPlanId={testPlanId} testId={testId} />;
    }
}
TestDesign.propTypes = {
    mode: PropTypes.string,
    testId: PropTypes.number,
    testPlanId: PropTypes.number
};

export default TestDesign;
