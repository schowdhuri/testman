import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Design from "components/TestDesign";

const AddTestPage = props => {
    const { testPlanId } = props.match.params;
    return (<App navId="design">
        <Design
            mode="add"
            testPlanId={parseInt(testPlanId)} />
    </App>);
};
AddTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testPlanId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default hot(module)(AddTestPage);
