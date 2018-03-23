import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_TP_SAVE } from "constants/TestDesignActions";
import { rcvSaveTestPlan } from "actions/TestDesign";
// import { redirectToTestDesign } from "actions/Shared";
import { setLoading } from "actions/Shared";

import validateTestPlan from "utils/TestDesign/validateTestPlan";
import buildTestPlan from "utils/TestDesign/buildTestPlan";

function* saveTestPlan(action) {
    const { testPlan } = action;
    const validationResult = validateTestPlan(testPlan);
    if(!validationResult.valid) {
        Alert.error(validationResult.error);
        return;
    }
    yield put(setLoading(REQ_TP_SAVE, true));
    try {
        let response;
        if(testPlan.id) {
            response = yield call(request, {
                url: `/api/testplan/${testPlan.id}`,
                type: "put",
                data: buildTestPlan(testPlan),
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: "/api/testplan",
                type: "post",
                data: buildTestPlan(testPlan),
                dataType: "json"
            });
        }
        Alert.success("Saved");
        yield put(rcvSaveTestPlan(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to save test plan");
    }
    yield put(setLoading(REQ_TP_SAVE, false));
}

export default function* () {
    yield takeEvery(REQ_TP_SAVE, saveTestPlan);
};
