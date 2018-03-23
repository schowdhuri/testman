import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DEFECT } from "constants/DefectsActions";
import { rcvDefect } from "actions/Defects";
import { setLoading } from "actions/Shared";

function* getDefect(action) {
    const { id } = action;
    if(!id) {
        Alert.error("Defect ID is required");
        return;
    }
    yield put(setLoading(REQ_DEFECT, true));
    try {
        const response = yield call(request, {
            url: `/api/defect/${id}`,
            type: "get",
            dataType: "json"
        });
        yield put(rcvDefect(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to fetch defect. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_DEFECT, getDefect);
};
