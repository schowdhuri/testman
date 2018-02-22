import React from "react";
import PropTypes from "prop-types";

import App from "components/AppContainer";
import Defects from "components/Defects";

const EditDefectPage = props => {
    const defectID = parseInt(props.match.params.defectID);
    return (<App navId="defects">
        <Defects mode="edit" defectID={defectID} />
    </App>);
};
EditDefectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            defectID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};


export default EditDefectPage;
