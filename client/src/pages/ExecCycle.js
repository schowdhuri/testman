import React from "react";
import PropTypes from "prop-types";

import App from "components/AppContainer";
import ExecCycle from "components/ExecCycle";

const ExecCyclePage = props => {
    const { execCycleId } = props.match.params;
    return (<App navId="execution">
        <ExecCycle mode="list" execCycleId={parseInt(execCycleId)} />
    </App>);
};
ExecCyclePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            execCycleId: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};


export default ExecCyclePage;
