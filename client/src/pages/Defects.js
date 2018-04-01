import React from "react";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Defects from "components/Defects";

const DefectsPage = () => {
    return (<App navId="defects">
        <Defects mode="list" />
    </App>);
};

export default hot(module)(DefectsPage);
