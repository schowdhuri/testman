/* eslint-disable react/no-multi-comp */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import history from "utils/history";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";

import configureStore from "utils/store"; // eslint-disable-line import/default
import reducer from "reducers/index";
import sagas from "sagas/index";

import App from "components/App";
import Dashboard from "components/Dashboard";
import Design from "components/TestDesign";
import ExecCycle from "components/ExecCycle";
import Documents from "components/Documents";

import "sass/index.scss";

const sagaMiddleware = createMiddleware();

const store = configureStore(reducer, sagaMiddleware);

sagaMiddleware.run(sagas);

const HomePage = () => {
    return (<App>
        <Dashboard />
    </App>);
};
HomePage.propTypes = {

};
const DesignPage = () => {
    return (<App>
        <Design />
    </App>);
};
DesignPage.propTypes = {

};
const ExecCyclePage = () => {
    return (<App>
        <ExecCycle />
    </App>);
};
ExecCyclePage.propTypes = {

};
const DocsPage = () => {
    return (<App>
        <Documents />
    </App>);
};
ExecCyclePage.propTypes = {

};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route name="home" path="/" exact component={HomePage} />
                <Route name="design" path="/design" exact component={DesignPage} />
                <Route name="execution" path="/execution" exact component={ExecCyclePage} />
                <Route name="docs" path="/docs" exact component={DocsPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);
