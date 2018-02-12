import React from "react";
import PropTypes from "prop-types";

import ExecCycles from "./ExecCycleListContainer";
import TestRunList from "./TestRunListContainer";

class ListView extends React.Component {
    render() {
        const { mode, testID, execCycleID } = this.props;
        return (<div className="exec-cycles list">
            <ExecCycles />
            <div className="test-runs">
                <TestRunList execCycleID={execCycleID} />
            </div>
        </div>);
    }
}
ListView.propTypes = {
    mode: PropTypes.string,
    testID: PropTypes.number
};

export default ListView;
