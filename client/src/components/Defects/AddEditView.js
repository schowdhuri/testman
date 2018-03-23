import React from "react";
import PropTypes from "prop-types";

import AddEditDefect from "./AddEditDefectContainer";

const AddEditView = props => {
    const { defectID } = props;
    return (<div className="defects add-edit">
        <AddEditDefect defectID={defectID} />
    </div>);
};
AddEditView.propTypes = {
    defectID: PropTypes.number
};

export default AddEditView;
