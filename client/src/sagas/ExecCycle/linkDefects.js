import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_LINK_DEFECTS } from "constants/ExecCyclesActions";
import { rcvLinkDefects } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* linkDefects(action) {
    const { testRun, defects } = action;
    
    yield put(setLoading(REQ_LINK_DEFECTS, true));
    try {
        yield call(request, {
            url: `/api/testrun/${testRun.id}/defect`,
            type: "post",
            data: {
                defects: defects.map(d => d.id)
            },
            dataType: "json"
        });
        yield put(rcvLinkDefects(defects, testRun));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to link defects: " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_LINK_DEFECTS, false));
}

export default function* () {
    yield takeEvery(REQ_LINK_DEFECTS, linkDefects);
};
