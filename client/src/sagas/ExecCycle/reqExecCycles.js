import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_EXEC_CYCLES } from "constants/ExecCyclesActions";
import { rcvExecCycles } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* getExecCycles() {
    yield put(setLoading(REQ_EXEC_CYCLES, true));
    try {
        const response = yield call(request, {
            url: "/api/exec",
            dataType: "json"
        });
        yield put(rcvExecCycles(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch execution cycles. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_EXEC_CYCLES, false));
}

export default function* () {
    yield takeEvery(REQ_EXEC_CYCLES, getExecCycles);
};
