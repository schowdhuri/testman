import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DEFECTS } from "constants/DefectsActions";
import { rcvDefects } from "actions/Defects";
import { setLoading } from "actions/Shared";

function* getDefects() {
    yield put(setLoading(REQ_DEFECTS, true));
    try {
        const response = yield call(request, {
            url: "/api/defect",
            type: "get",
            dataType: "json"
        });
        yield put(rcvDefects(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to fetch defects. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DEFECTS, false));
}

export default function* () {
    yield takeEvery(REQ_DEFECTS, getDefects);
};
