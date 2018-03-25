import React from "react";

import App from "components/AppContainer";
import Defects from "components/Defects";

const AddDefectPage = props => {
    return (<App navId="defects">
        <Defects mode="add" />
    </App>);
};

export default AddDefectPage;
