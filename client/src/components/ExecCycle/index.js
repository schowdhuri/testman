import React from "react";
import PropTypes from "prop-types";

import ListView from "./ListView";
// import AddEditView from "./AddEditView";

import "sass/components/ExecCycle.scss";

class ExecCycle extends React.Component {
    render() {
        const { mode, execCycleId } = this.props;
        return mode=="list"
            ? <ListView execCycleId={execCycleId} />
            : <div>add edit view</div>
    }
}

export default ExecCycle;
