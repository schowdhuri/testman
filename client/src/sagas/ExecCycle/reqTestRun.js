import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_TEST_RUN } from "constants/ExecCyclesActions";
import { rcvTestRun } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* getTestRun(action) {
    const { id } = action;
    if(!id)
        return;
    yield put(setLoading(REQ_TEST_RUN, true));
    try {
        const response = yield call(request, {
            url: `/api/testrun/${id}`,
            type: "get"
        });
        yield put(rcvTestRun(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch test. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_TEST_RUN, false));
}

export default function* () {
    yield takeEvery(REQ_TEST_RUN, getTestRun);
};
