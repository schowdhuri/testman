import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_LOGIN_STATUS } from "constants/SharedActions";
import { rcvLoginStatus, setLoading } from "actions/Shared";

function* checkLogin() {
    yield put(setLoading(REQ_LOGIN_STATUS, true));
    try {
        const response = yield call(request, {
            url: "/api/login",
            type: "get"
        });
        yield put(rcvLoginStatus(true, response.json));
    } catch(ex) {
        console.log(ex);
        // Alert.error("Failed to fetch users");
        yield put(rcvLoginStatus(false, null));
    }
    yield put(setLoading(REQ_LOGIN_STATUS, false));
}

export default function* () {
    yield takeEvery(REQ_LOGIN_STATUS, checkLogin);
};
