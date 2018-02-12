import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_TEST_RUNS } from "constants/ExecCyclesActions";
import { rcvTestRuns } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* getTestRuns(action) {
    const { execCycleId } = action;
    if(!execCycleId)
        return;
    yield put(setLoading(REQ_TEST_RUNS, true));
    try {
        const response = yield call(request, {
            url: "/api/testrun",
            type: "get",
            data: {
                execCycle: execCycleId
            },
            dataType: "json"
        });
        yield put(rcvTestRuns(execCycleId, response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch tests. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_TEST_RUNS, false));
}

export default function* () {
    yield takeEvery(REQ_TEST_RUNS, getTestRuns);
};
