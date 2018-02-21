import React from "react";
import PropTypes from "prop-types";

import ListView from "./ListView";
import TestRun from "./TestRunContainer";

import "sass/components/ExecCycle.scss";

class ExecCycle extends React.Component {
    render() {
        const { mode, execCycleId, testRunId } = this.props;
        return mode=="list"
            ? <ListView execCycleId={execCycleId} />
            : <TestRun testRunId={testRunId} />
    }
}

export default ExecCycle;
