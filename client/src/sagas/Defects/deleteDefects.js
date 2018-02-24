import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_DELETE_DEFECTS } from "constants/DefectsActions";
import { rcvDeleteDefects } from "actions/Defects";
import { setLoading } from "actions/Shared";

function* delDefects(action) {
    const { idArr } = action;
    if(!idArr.length)
        return;
    yield put(setLoading(REQ_DELETE_DEFECTS, true));
    try {
        const response = yield call(request, {
            url: "/api/defect",
            type: "delete",
            data: {
                ids: idArr
            },
            dataType: "json"
        });
        Alert.success(`Deleted ${idArr.length} defects`);
        yield put(rcvDeleteDefects(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to delete defects. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DELETE_DEFECTS, false));
}

export default function* () {
    yield takeEvery(REQ_DELETE_DEFECTS, delDefects);
};
