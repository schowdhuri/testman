import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_SAVE_DEFECT } from "constants/DefectsActions";
import { RCV_UPLOAD_FILES } from "constants/SharedActions";

import { rcvSaveDefect } from "actions/Defects";
import { redirectToDefects, reqUploadFiles, setLoading } from "actions/Shared";

import buildDefect from "utils/Defects/buildDefect";


function* saveDefect(action) {
    const { defect, files, redirect } = action;
    yield put(setLoading(REQ_SAVE_DEFECT, true));
    try {
        let response;
        if(defect.id) {
            response = yield call(request, {
                url: `/api/defect/${defect.id}`,
                type: "put",
                data: buildDefect(defect),
                dataType: "json"
            });
            Alert.success("Saved");
        } else {
            // upload files, if any
            if(files.length) {
                yield put(reqUploadFiles(files));
                const uploadResult = yield take(RCV_UPLOAD_FILES);
                defect.description.attachments = uploadResult.files;
            }
            response = yield call(request, {
                url: "/api/defect",
                type: "post",
                data: buildDefect(defect),
                dataType: "json"
            });
        }
        yield put(rcvSaveDefect(response.json));
        if(redirect)
            yield put(redirectToDefects());
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to save defect. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_SAVE_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_SAVE_DEFECT, saveDefect);
};
