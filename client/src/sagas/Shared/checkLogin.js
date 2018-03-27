import Cookies from "js-cookie";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_LOGIN_STATUS } from "constants/SharedActions";
import { rcvLoginStatus, setLoading } from "actions/Shared";

const COOKIE_NAME = "testman_session";

function* checkLogin() {
    const sessionCookie = Cookies.get(COOKIE_NAME);
    if(sessionCookie) {
        try {
            const data = JSON.parse(sessionCookie);
            if(data && data.user) {
                yield put(rcvLoginStatus(data.user));
                return;
            }
        } catch(ex) {}
    }
    yield put(setLoading(REQ_LOGIN_STATUS, true));
    try {
        const response = yield call(request, {
            url: "/api/login",
            type: "get"
        });
        Cookies.set(COOKIE_NAME, {
            user: response.json
        });
        yield put(rcvLoginStatus(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        yield put(rcvLoginStatus(null));
    }
    yield put(setLoading(REQ_LOGIN_STATUS, false));
}

export default function* () {
    yield takeEvery(REQ_LOGIN_STATUS, checkLogin);
};
