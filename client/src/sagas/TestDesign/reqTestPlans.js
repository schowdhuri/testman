import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_TEST_PLANS } from "constants/TestDesignActions";
import { rcvTestPlans } from "actions/TestDesign";
import { setLoading } from "actions/Shared";

function* getTestPlans() {
    yield put(setLoading(REQ_TEST_PLANS, true));
    try {
        const response = yield call(request, {
            url: "/api/testplan",
            dataType: "json"
        });
        yield put(rcvTestPlans(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to fetch test plans. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_TEST_PLANS, false));
}

export default function* () {
    yield takeEvery(REQ_TEST_PLANS, getTestPlans);
};
