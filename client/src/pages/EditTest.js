import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Design from "components/TestDesign";

const EditTestPage = props => {
    const { testPlanId, testId } = props.match.params;
    return (<App navId="design">
        <Design
            mode="edit"
            testPlanId={parseInt(testPlanId)}
            testId={parseInt(testId)} />
    </App>);
};
EditTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testId: PropTypes.string.isRequired,
            testPlanId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default hot(module)(EditTestPage);
