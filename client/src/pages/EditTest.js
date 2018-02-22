import React from "react";
import PropTypes from "prop-types";

import App from "components/AppContainer";
import Design from "components/TestDesign";

const EditTestPage = props => {
    const { testPlanID, testID } = props.match.params;
    return (<App navId="design">
        <Design
            mode="edit"
            testPlanID={parseInt(testPlanID)}
            testID={parseInt(testID)} />
    </App>);
};
EditTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testID: PropTypes.string.isRequired,
            testPlanID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default EditTestPage;
