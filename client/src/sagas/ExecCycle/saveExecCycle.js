import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_EC_SAVE } from "constants/ExecCyclesActions";
import { rcvSaveExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

import validateExecCycle from "businessLogic/ExecCycle/validateExecCycle";
import buildExecCycle from "businessLogic/ExecCycle/buildExecCycle";

function* saveExecCycle(action) {
    const { execCycle } = action;
    const validationResult = validateExecCycle(execCycle);
    if(!validationResult.valid) {
        Alert.error(validationResult.error);
        return;
    }
    yield put(setLoading(REQ_EC_SAVE, true));
    try {
        let response;
        if(execCycle.id) {
            response = yield call(request, {
                url: `/api/exec/${execCycle.id}`,
                type: "put",
                data: buildExecCycle(execCycle),
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: "/api/exec",
                type: "post",
                data: buildExecCycle(execCycle),
                dataType: "json"
            });
        }
        Alert.success("Saved");
        yield put(rcvSaveExecCycle(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to save exec cycle");
    }
    yield put(setLoading(REQ_EC_SAVE, false));
}

export default function* () {
    yield takeEvery(REQ_EC_SAVE, saveExecCycle);
};
