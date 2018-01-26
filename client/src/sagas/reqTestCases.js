import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_TEST_CASES } from "constants/TestDesignActions";
import { rcvTestCases } from "actions/TestDesign";
import { setLoading } from "actions/Shared";

function* getTestCases() {
    yield put(setLoading(REQ_TEST_CASES, true));
    try {
        const response = yield call(request, {
            url: "/api/testcase",
            dataType: "json"
        });
        yield put(rcvTestCases(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch tests");
    }
    yield put(setLoading(REQ_TEST_CASES, false));
}

export default function* () {
    yield takeEvery(REQ_TEST_CASES, getTestCases);
};
