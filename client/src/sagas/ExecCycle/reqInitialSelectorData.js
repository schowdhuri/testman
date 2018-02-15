import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_INIT_DATA, RCV_ITEMS } from "constants/TestCaseSelectorActions";
import { RCV_TEST_RUNS } from "constants/ExecCyclesActions";

import { reqTestRuns, rcvTestRuns } from "actions/ExecCycle";
import { reqItems } from "actions/TestCaseSelector";
import { setLoading } from "actions/Shared";

function* getInitialData(action) {
    const { execCycleId } = action;
    yield put(setLoading(REQ_INIT_DATA, true));
    yield put(reqTestRuns(execCycleId));
    const { testRuns } = yield take(RCV_TEST_RUNS);
    yield put(reqItems(testRuns.map(tr => ({
        id: tr.testCase,
        name: tr.name
    }))));
    yield put(setLoading(REQ_INIT_DATA, false));
}

export default function* () {
    yield takeEvery(REQ_INIT_DATA, getInitialData);
};
