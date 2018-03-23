import { spawn, takeEvery } from "redux-saga/effects";

import hashHistory from "utils/Shared/history";

import * as ACTIONS from "constants/SharedActions";

function redirectToTestDesign() {
    hashHistory.push("/design");
}

function redirectToExecCycle() {
    hashHistory.push("/execution");
}

function redirectToDefects() {
    hashHistory.push("/defects");
}

export default function* () {
    yield spawn(takeEvery, ACTIONS.REDIRECT_TEST_DESIGN, redirectToTestDesign);
    yield spawn(takeEvery, ACTIONS.REDIRECT_EXEC_CYCLE, redirectToExecCycle);
    yield spawn(takeEvery, ACTIONS.REDIRECT_DEFECTS, redirectToDefects);
};
