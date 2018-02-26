import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_EXEC_CYCLE } from "constants/ExecCyclesActions";

import { rcvExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* getExecCycle(action) {
    const { id } = action;
    yield put(setLoading(REQ_EXEC_CYCLE, true));
    try {
        const response = yield call(request, {
            url: `/api/exec/${id}`
        });
        yield put(rcvExecCycle(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch execution cycle");
    }
    yield put(setLoading(REQ_EXEC_CYCLE, false));
}

export default function* () {
    yield takeEvery(REQ_EXEC_CYCLE, getExecCycle);
};
