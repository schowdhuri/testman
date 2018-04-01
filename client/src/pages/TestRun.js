import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import ExecCycle from "components/ExecCycle";

const TestRunPage = props => {
    const { execCycleId, testRunId } = props.match.params;
    return (<App navId="execution">
        <ExecCycle
            mode="testrun"
            execCycleId={parseInt(execCycleId)}
            testRunId={parseInt(testRunId)} />
    </App>);
};
TestRunPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            execCycleId: PropTypes.string.isRequired,
            testRunId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default hot(module)(TestRunPage);
