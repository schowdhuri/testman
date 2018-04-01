import React from "react";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import ExecCycle from "components/ExecCycle";

const ExecCyclesPage = () => {
    return (<App navId="execution">
        <ExecCycle mode="list" />
    </App>);
};

export default hot(module)(ExecCyclesPage);
