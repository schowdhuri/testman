import { spawn, takeEvery } from "redux-saga/effects";

import hashHistory from "utils/Shared/history";

import * as ACTIONS from "constants/SharedActions";

function redirectToTestDesign(action) {
    const { id } = action;
    if(id)
        hashHistory.push(`/design/testplan/${id}`);
    else
        hashHistory.push("/design");
}

function redirectToExecCycle(action) {
    const { id } = action;
    if(id)
        hashHistory.push(`/execution/${id}`);
    else
        hashHistory.push("/execution");
}

function redirectToDefects() {
    hashHistory.push("/defects");
}

function redirectToLogin() {
    window.location.href = "/login";
}

export default function* () {
    yield spawn(takeEvery, ACTIONS.REDIRECT_TEST_DESIGN, redirectToTestDesign);
    yield spawn(takeEvery, ACTIONS.REDIRECT_EXEC_CYCLE, redirectToExecCycle);
    yield spawn(takeEvery, ACTIONS.REDIRECT_DEFECTS, redirectToDefects);
    yield spawn(takeEvery, ACTIONS.REDIRECT_LOGIN, redirectToLogin);
};
