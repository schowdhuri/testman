import React from "react";

import App from "components/AppContainer";
import Dashboard from "components/Dashboard";

const HomePage = () => {
    return (<App navId="dashboard">
        <Dashboard />
    </App>);
};

export default HomePage;
