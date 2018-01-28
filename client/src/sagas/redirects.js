import { spawn, takeEvery } from "redux-saga/effects";

import hashHistory from "utils/history";

import * as ACTIONS from "constants/SharedActions";

function* redirectToTestDesign() {
    hashHistory.push("/design");
}

export default function* () {
    yield spawn(takeEvery, ACTIONS.REDIRECT_TEST_DESIGN, redirectToTestDesign);
};
