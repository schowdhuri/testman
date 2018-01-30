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

import App from "components/AppContainer";
import Dashboard from "components/Dashboard";
import Design from "components/TestDesign";
import ExecCycle from "components/ExecCycle";
import Defects from "components/Defects";
import Documents from "components/Documents";

import "sass/index.scss";

const sagaMiddleware = createMiddleware();

const store = configureStore(reducer, sagaMiddleware);

sagaMiddleware.run(sagas);

const HomePage = () => {
    return (<App navId="dashboard">
        <Dashboard />
    </App>);
};
HomePage.propTypes = {

};

const DesignPage = () => {
    return (<App navId="design">
        <Design mode="list" />
    </App>);
};

const AddTestPage = props => {
    const { testPlanID } = props.match.params;
    return (<App navId="design">
        <Design
            mode="add"
            testPlanID={parseInt(testPlanID)} />
    </App>);
};
AddTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testPlanID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const EditTestPage = props => {
    const { testPlanID, testID } = props.match.params;
    return (<App navId="design">
        <Design
            mode="edit"
            testPlanID={parseInt(testPlanID)}
            testID={parseInt(testID)} />
    </App>);
};
EditTestPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            testID: PropTypes.string.isRequired,
            testPlanID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const ExecCyclePage = () => {
    return (<App navId="execution">
        <ExecCycle />
    </App>);
};
ExecCyclePage.propTypes = {

};

const DefectsPage = () => {
    return (<App navId="defects">
        <Defects mode="list" />
    </App>);
};

const AddDefectPage = () => {
    return (<App navId="defects">
        <Defects mode="add" />
    </App>);
};

const EditDefectPage = props => {
    const defectID = parseInt(props.match.params.defectID);
    return (<App navId="defects">
        <Defects mode="edit" defectID={defectID} />
    </App>);
};
EditDefectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            defectID: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const DocsPage = () => {
    return (<App navId="docs">
        <Documents />
    </App>);
};
ExecCyclePage.propTypes = {

};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/design" exact component={DesignPage} />
                <Route path="/design/testplan/:testPlanID/testcase/add" exact component={AddTestPage} />
                <Route path="/design/testplan/:testPlanID/testcase/edit/:testID" exact component={EditTestPage} />
                <Route path="/execution" component={ExecCyclePage} />
                <Route path="/defects" exact component={DefectsPage} />
                <Route path="/defects/add" component={AddDefectPage} />
                <Route path="/defects/edit/:defectID" component={EditDefectPage} />
                <Route path="/docs" component={DocsPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);
