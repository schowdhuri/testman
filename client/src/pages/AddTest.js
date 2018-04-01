import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Design from "components/TestDesign";

const AddTestPage = props => {
    const { testPlanID } = props.match.params;
    return (<App navId="design">
        <Design
            mode="add"
            testPlanID={parseInt(testPlanID)} />
    </App>);
};
AddTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testPlanID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default hot(module)(AddTestPage);
