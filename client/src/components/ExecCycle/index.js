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
            : <TestRun execCycleId={execCycleId} testRunId={testRunId} />
    }
}
ExecCycle.propTypes = {
    mode: PropTypes.string.isRequired,
    execCycleId: PropTypes.number,
    testRunId: PropTypes.number
};

export default ExecCycle;
