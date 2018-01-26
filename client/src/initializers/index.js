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

import "sass/index.scss";

const sagaMiddleware = createMiddleware();

const store = configureStore(reducer, sagaMiddleware);

sagaMiddleware.run(sagas);

const HomePage = () => {
    console.log("hi")
    return (<App>
        <Dashboard />
    </App>);
};
HomePage.propTypes = {
    // match: PropTypes.shape({
    //     params: PropTypes.shape({
    //         networkId: PropTypes.string
    //     })
    // })
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route name="home" path="/" exact component={HomePage} />

            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);

/*
<Route name="networkEdit" path="/network/edit/:networkId" component={NetworkEditPage} />
                <Route name="networkAdd" path="/network/create" component={NetworkAddPage} />
                <Route name="network" path="/network" component={NetworkPage} />
*/
