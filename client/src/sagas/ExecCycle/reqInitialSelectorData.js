import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_INIT_DATA, RCV_ITEMS } from "constants/TestCaseSelectorActions";
import { RCV_EXEC_CYCLE } from "constants/ExecCyclesActions";

import { reqExecCycle, rcvExecCycle } from "actions/ExecCycle";
import { reqItems } from "actions/TestCaseSelector";
import { setLoading } from "actions/Shared";

function* getInitialData(action) {
    const { execCycleId } = action;
    yield put(setLoading(REQ_INIT_DATA, true));
    yield put(reqExecCycle(execCycleId));
    const { execCycle } = yield take(RCV_EXEC_CYCLE);
    yield put(reqItems(execCycle.testruns, undefined));
    yield take(RCV_ITEMS);
    yield put(setLoading(REQ_INIT_DATA, false));
}

export default function* () {
    yield takeEvery(REQ_INIT_DATA, getInitialData);
};
