import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_UPDATE_ATTACH } from "constants/SharedActions";
import { rcvUpdateAttachment, setLoading } from "actions/Shared";

function* updateAttachment(action) {
    const { attachment } = action;
    yield put(setLoading(REQ_UPDATE_ATTACH, true));
    try {
        const response = yield call(request, {
            url: `/api/attachment/${attachment.id}`,
            type: "put",
            data: {
                name: attachment.name
            },
            dataType: "json"
        });
        yield put(rcvUpdateAttachment(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error(ex && ex.text || "Unable to save");
    }
    yield put(setLoading(REQ_UPDATE_ATTACH, false));
}

export default function* () {
    yield takeEvery(REQ_UPDATE_ATTACH, updateAttachment);
};
