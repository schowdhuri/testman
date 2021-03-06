import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DELETE_DEFECT } from "constants/DefectsActions";
import { rcvDeleteDefect } from "actions/Defects";
import { redirectToDefects, setLoading } from "actions/Shared";

function* delDefect(action) {
    const { id, redirect } = action;
    yield put(setLoading(REQ_DELETE_DEFECT, true));
    try {
        const response = yield call(request, {
            url: `/api/defect/${id}`,
            type: "delete"
        });
        Alert.success("Deleted");
        yield put(rcvDeleteDefect(response.json));
        if(redirect)
            yield put(redirectToDefects());
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to delete defect. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DELETE_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_DELETE_DEFECT, delDefect);
};
