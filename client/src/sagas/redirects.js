import { spawn, takeEvery } from "redux-saga/effects";

import hashHistory from "utils/history";

import * as ACTIONS from "constants/SharedActions";

function* redirectToTestDesign() {
    hashHistory.push("/design");
}

function* redirectToDefects() {
    hashHistory.push("/defects");
}

export default function* () {
    yield spawn(takeEvery, ACTIONS.REDIRECT_TEST_DESIGN, redirectToTestDesign);
    yield spawn(takeEvery, ACTIONS.REDIRECT_DEFECTS, redirectToDefects);
};
