import React from "react";
import PropTypes from "prop-types";

import ListView from "./ListView";
import AddEditView from "./AddEditView";

import "sass/components/TestDesign.scss";

class TestDesign extends React.Component {
    render() {
        const { mode, testID, testPlanID } = this.props;
        return mode=="list"
            ? <ListView testPlanID={testPlanID} />
            : <AddEditView testPlanID={testPlanID} testID={testID} />;
    }
}
TestDesign.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number,
    testPlanID: PropTypes.number
};

export default TestDesign;
