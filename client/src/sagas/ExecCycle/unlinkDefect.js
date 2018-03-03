import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_UNLINK_DEFECT } from "constants/ExecCyclesActions";
import { rcvUnlinkDefect } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* unlinkDefect(action) {
    const { testRun, defect } = action;
    
    yield put(setLoading(REQ_UNLINK_DEFECT, true));
    try {
        yield call(request, {
            url: `/api/testrun/${testRun.id}/defect/${defect.id}`,
            type: "delete"
        });
        yield put(rcvUnlinkDefect(testRun, defect));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to unlink defect: " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_UNLINK_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_UNLINK_DEFECT, unlinkDefect);
};
