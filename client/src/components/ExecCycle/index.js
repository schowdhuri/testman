import React from "react";
import PropTypes from "prop-types";

import ListView from "./ListView";
// import AddEditView from "./AddEditView";

import "sass/components/ExecCycle.scss";

class ExecCycle extends React.Component {
    render() {
        const { mode, execCycleID } = this.props;
        return mode=="list"
            ? <ListView execCycleID={execCycleID} />
            : <div>add edit view</div>
    }
}

export default ExecCycle;
