import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_SAVE_TR } from "constants/ExecCyclesActions";
import { rcvSaveTestRun } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

import validateTestRun from "businessLogic/ExecCycle/validateTestRun";
import buildTestRun from "businessLogic/ExecCycle/buildTestRun";

function* saveTestRun(action) {
    const { testRun, execCycleId } = action;
    if(!testRun.id && !execCycleId) {
        console.log("execCycleId required to create new TestRun");
        return;
    }
    const validationResult = validateTestRun(testRun);
    if(!validationResult.valid) {
        Alert.error(validationResult.error);
        return;
    }
    yield put(setLoading(REQ_SAVE_TR, true));
    const data = buildTestRun(testRun);
    try {
        let response;
        if(testRun.id) {
            response = yield call(request, {
                url: `/api/testrun/${testRun.id}`,
                type: "put",
                data,
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: `/api/testrun?execCycleId=${execCycleId}`,
                type: "post",
                data,
                dataType: "json"
            });
        }
        yield put(rcvSaveTestRun(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to save test. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_SAVE_TR, false));
}

export default function* () {
    yield takeEvery(REQ_SAVE_TR, saveTestRun);
};
