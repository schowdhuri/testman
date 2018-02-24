import React from "react";
import PropTypes from "prop-types";

import App from "components/AppContainer";
import Defects from "components/Defects";

const AddDefectPage = props => {
    const testCaseId = parseInt(props.match.params.testCaseId);
    return (<App navId="defects">
        <Defects mode="add" testCaseId={parseInt(testCaseId)} />
    </App>);
};
AddDefectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testCaseId: PropTypes.string.isRequired
        })
    }).isRequired
};

export default AddDefectPage;
