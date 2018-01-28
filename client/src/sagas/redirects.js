import { spawn, takeEvery } from "redux-saga/effects";

import hashHistory from "utils/history";

import * as ACTIONS from "constants/SharedActions";

function* redirectToTestPlan(action) {
    if(!action.testPlanId)
        return;
    const newPath = `/design/testplan/${action.testPlanId}`;
    if(hashHistory.location.pathname != newPath)
        hashHistory.push(newPath);
}

export default function* () {
    yield spawn(takeEvery, ACTIONS.REDIRECT_TEST_PLAN, redirectToTestPlan);
};
