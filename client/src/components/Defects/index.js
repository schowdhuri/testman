import React from "react";
import PropTypes from "prop-types";

import AddEditView from "./AddEditView";
import ListView from "./ListView";

class Defects extends React.Component {
    render() {
        const { mode, defectID } = this.props;
        return mode=="list"
            ? <ListView />
            : <AddEditView defectID={defectID} />;
    }
}

export default Defects;
