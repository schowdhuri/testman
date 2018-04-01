import React from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";

import configureStore from "utils/Shared/store"; // eslint-disable-line import/default
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

import history from "utils/Shared/history";

import "sass/index.scss";

const sagaMiddleware = createMiddleware();
const store = configureStore(reducer, sagaMiddleware);
sagaMiddleware.run(sagas);

let Wrapper = () => (<Provider store={store}>
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
            <Route path="/defects/add" exact component={AddDefectPage} />
            <Route path="/defects/testcase/:testCaseId/add" exact component={AddDefectPage} />
            <Route path="/defects/edit/:defectID" component={EditDefectPage} />
            <Route path="/docs" component={DocsPage} />
        </Switch>
    </Router>
</Provider>);

if(process.env.NODE_ENV=="development") {
    console.log("Enabling HOT reload");
    Wrapper = hot(module)(Wrapper);
}

ReactDOM.render(<Wrapper />, document.getElementById("app-root"));
