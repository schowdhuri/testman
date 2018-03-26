import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_SUMMARY } from "constants/DashboardActions";
import { rcvSummary } from "actions/Dashboard";
import { setLoading } from "actions/Shared";

function* getSummary() {
    yield put(setLoading(REQ_SUMMARY, true));
    try {
        const response = yield call(request, {
            url: "/api/dashboard",
            type: "get",
            dataType: "json"
        });
        yield put(rcvSummary(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to fetch dashboard data");
    }
    yield put(setLoading(REQ_SUMMARY, false));
}

export default function* () {
    yield takeEvery(REQ_SUMMARY, getSummary);
};
