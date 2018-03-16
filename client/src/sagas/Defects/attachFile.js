import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_ATTACH_TO_DEFECT } from "constants/DefectsActions";
import { rcvAttachToDefect } from "actions/Defects";
import { setLoading } from "actions/Shared";

function* attachToDefect(action) {
    const { id, file } = action;
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, true));
    const data = new FormData();
    data.append("file", file);
    try {
        const response = yield call(request, {
            url: `/api/defect/${id}/attach`,
            type: "post",
            data
        });
        Alert.success("Saved");
        yield put(rcvAttachToDefect(id, response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error(ex && ex.text || "Failed to attach file");
    }
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_ATTACH_TO_DEFECT, attachToDefect);
};
