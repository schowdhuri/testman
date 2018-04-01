import React from "react";
import { hot } from "react-hot-loader";

import App from "components/AppContainer";
import Dashboard from "components/Dashboard";

const HomePage = () => {
    return (<App navId="dashboard">
        <Dashboard />
    </App>);
};

export default hot(module)(HomePage);
