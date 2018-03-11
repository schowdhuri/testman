import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_USERS } from "constants/SharedActions";
import { rcvUsers } from "actions/Shared";
import { setLoading } from "actions/Shared";

function* getUsers() {
    yield put(setLoading(REQ_USERS, true));
    try {
        const response = yield call(request, {
            url: "/api/user",
            type: "get"
        });
        yield put(rcvUsers(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch users");
    }
    yield put(setLoading(REQ_USERS, false));
}

export default function* () {
    yield takeEvery(REQ_USERS, getUsers);
};
