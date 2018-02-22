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

import HomePage from "pages/Home";
import DesignPage from "pages/Design";
import AddTestPage from "pages/AddTest";
import EditTestPage from "pages/EditTest";
import ExecCyclesPage from "pages/ExecCycles";
import ExecCyclePage from "pages/ExecCycle";
import TestRunPage from "pages/TestRun";
import DefectsPage from "pages/Defects";
import AddDefectPage from "pages/AddDefect";
import EditDefectPage from "pages/EditDefect";
import DocsPage from "pages/Docs";

import "sass/index.scss";

const sagaMiddleware = createMiddleware();
const store = configureStore(reducer, sagaMiddleware);
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/design" exact component={DesignPage} />
                <Route path="/design/testplan/:testPlanID/testcase/add" exact component={AddTestPage} />
                <Route path="/design/testplan/:testPlanID/testcase/edit/:testID" exact component={EditTestPage} />
                <Route path="/execution" exact component={ExecCyclesPage} />
                <Route path="/execution/:execCycleId" exact component={ExecCyclePage} />
                <Route path="/execution/:execCycleId/test/:testRunId" component={TestRunPage} />
                <Route path="/defects" exact component={DefectsPage} />
                <Route path="/defects/add" component={AddDefectPage} />
                <Route path="/defects/edit/:defectID" component={EditDefectPage} />
                <Route path="/docs" component={DocsPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);
