import React from "react";
import PropTypes from "prop-types";

import ExecCycles from "./ExecCycleListContainer";
import TestRunList from "./TestRunListContainer";

class ListView extends React.Component {
    render() {
        const { execCycleId } = this.props;
        return (<div className="exec-cycles list">
            <ExecCycles execCycleId={execCycleId} />
            {execCycleId
                ? <div className="test-runs">
                    <TestRunList />
                </div>
                : null}
        </div>);
    }
}
ListView.propTypes = {
    execCycleId: PropTypes.number,
    testID: PropTypes.number
};

export default ListView;
