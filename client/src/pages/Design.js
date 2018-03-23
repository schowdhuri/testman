import React from "react";

import App from "components/AppContainer";
import Design from "components/TestDesign";

const DesignPage = () => {
    return (<App navId="design">
        <Design mode="list" />
    </App>);
};

export default DesignPage;
