import Alert from "react-s-alert";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_END_EC, REQ_START_EC } from "constants/ExecCyclesActions";
import { rcvEndExecCycle, rcvStartExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";


function* start(action) {
    const { execCycle } = action;
    yield put(setLoading(REQ_START_EC, true));
    try {
        const response = yield call(request, {
            url: `/api/exec/${execCycle.id}/start`,
            type: "post"
        });
        Alert.success("Execution Cycle Started");
        yield put(rcvStartExecCycle(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to start execution");
    }
    yield put(setLoading(REQ_START_EC, false));
}

function* end(action) {
    const { execCycle } = action;
    yield put(setLoading(REQ_END_EC, true));
    try {
        const response = yield call(request, {
            url: `/api/exec/${execCycle.id}/end`,
            type: "post"
        });
        Alert.success("Execution Cycle Complete");
        yield put(rcvEndExecCycle(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to end execution");
    }
    yield put(setLoading(REQ_END_EC, false));
}

export default function* () {
    yield spawn(takeEvery, REQ_END_EC, end);
    yield spawn(takeEvery, REQ_START_EC, start);
};
