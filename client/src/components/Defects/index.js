import React from "react";
import PropTypes from "prop-types";

import AddEditView from "./AddEditView";
import ListView from "./ListView";

import "./Defects.scss";


const Defects = props => {
    const { mode, defectID } = props;
    return mode=="list"
        ? <ListView />
        : <AddEditView defectID={defectID} />;
};
Defects.propTypes = {
    mode: PropTypes.string,
    defectID: PropTypes.number
};

export default Defects;
