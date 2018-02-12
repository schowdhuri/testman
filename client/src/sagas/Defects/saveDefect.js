import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_SAVE_DEFECT } from "constants/DefectsActions";
import { rcvSaveDefect } from "actions/Defects";
import { redirectToDefects, setLoading } from "actions/Shared";

import buildDefect from "businessLogic/Defects/buildDefect";
import validateDefect from "businessLogic/Defects/validateDefect";

function* saveDefect(action) {
    const { defect } = action;
    yield put(setLoading(REQ_SAVE_DEFECT, true));
    try {
        let response;
        const data = buildDefect(defect);
        if(defect.id) {
            response = yield call(request, {
                url: `/api/defect/${defect.id}`,
                type: "put",
                data,
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: "/api/defect",
                type: "post",
                data,
                dataType: "json"
            });
        }
        Alert.success("Saved");
        yield put(rcvSaveDefect(response.json));
        yield put(redirectToDefects());
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to save defect. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_SAVE_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_SAVE_DEFECT, saveDefect);
};