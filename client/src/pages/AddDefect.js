import React from "react";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Defects from "components/Defects";

const AddDefectPage = () => {
    return (<App navId="defects">
        <Defects mode="add" />
    </App>);
};

export default hot(module)(AddDefectPage);
