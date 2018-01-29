import React from "react";
import PropTypes from "prop-types";

import AddEditDefect from "./AddEditDefectContainer";

class AddEditView extends React.Component {
    render() {
        const { mode, defectID } = this.props;
        return (<div className="defects add-edit">
            <AddEditDefect defectID={defectID} />
        </div>);
    }
}
AddEditView.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default AddEditView;
