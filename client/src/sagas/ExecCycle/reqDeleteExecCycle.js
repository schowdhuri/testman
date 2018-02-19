import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_DEL_EC } from "constants/ExecCyclesActions";
import { rcvDeleteExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* deleteExecCycles(action) {
    const { execCycle } = action;
    yield put(setLoading(REQ_DEL_EC, true));
    try {
        const response = yield call(request, {
            url: `/api/exec/${execCycle.id}`,
            type: "delete"
        });
        yield put(rcvDeleteExecCycle(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to delete execution cycle. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DEL_EC, false));
}

export default function* () {
    yield takeEvery(REQ_DEL_EC, deleteExecCycles);
};
