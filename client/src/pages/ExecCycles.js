import React from "react";

import App from "components/AppContainer";
import ExecCycle from "components/ExecCycle";

const ExecCyclesPage = () => {
    return (<App navId="execution">
        <ExecCycle mode="list" />
    </App>);
};

export default ExecCyclesPage;
