import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_CLONE_EC } from "constants/ExecCyclesActions";
import { rcvCloneExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";


function* cloneExecCycle(action) {
    const { id, cloneType } = action;
    yield put(setLoading(REQ_CLONE_EC, true));
    try {
        const response = yield call(request, {
            url: `/api/exec/${id}/clone`,
            type: "post",
            data: {
                type: cloneType
            },
            dataType: "json"
        });
        Alert.success("Saved");
        yield put(rcvCloneExecCycle(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to clone exec cycle");
    }
    yield put(setLoading(REQ_CLONE_EC, false));
}

export default function* () {
    yield takeEvery(REQ_CLONE_EC, cloneExecCycle);
};
