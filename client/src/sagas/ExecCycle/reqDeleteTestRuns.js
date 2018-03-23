import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DEL_TEST_RUNS } from "constants/ExecCyclesActions";
import { rcvDeleteTestRuns } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* delTestRuns(action) {
    const { idArr } = action;
    if(!idArr.length)
        return;
    yield put(setLoading(REQ_DEL_TEST_RUNS, true));
    try {
        const response = yield call(request, {
            url: "/api/testrun",
            type: "delete",
            data: {
                ids: idArr
            },
            dataType: "json"
        });
        Alert.success(`Deleted ${idArr.length} tests`);
        yield put(rcvDeleteTestRuns(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to delete tests. " + (ex && ex.text || ""));
    }
    yield put(setLoading(REQ_DEL_TEST_RUNS, false));
}

export default function* () {
    yield takeEvery(REQ_DEL_TEST_RUNS, delTestRuns);
};
