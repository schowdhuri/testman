import Cookies from "js-cookie";
import { eventChannel } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";

import {
    SETUP_SESSION_INV,
    SESSION_INVALIDATE
} from "constants/SharedActions";

import { redirectToLogin } from "actions/Shared";

import request from "utils/Shared/request";

const createChannel = () => {
    return eventChannel(emit => {
        const onError = resp => {
            if(resp && resp.status==401 || resp.status==403) {
                Cookies.remove("testman_session");
                emit({ type: SESSION_INVALIDATE });
            }
        };
        request.on("error", onError);
        return () => {
            request.off("error", onError);
        };
    });
}


function* setupInvalidateSession() {
    const channel = yield call(createChannel);
    while(true) {
        yield take(channel);
        yield put(redirectToLogin());
    }
}

export default function* () {
    yield takeEvery(SETUP_SESSION_INV, setupInvalidateSession);
};
