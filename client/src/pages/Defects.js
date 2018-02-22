import React from "react";

import App from "components/AppContainer";
import Defects from "components/Defects";

const DefectsPage = () => {
    return (<App navId="defects">
        <Defects mode="list" />
    </App>);
};

export default DefectsPage;
