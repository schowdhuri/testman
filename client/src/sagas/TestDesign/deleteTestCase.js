import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DEL_TC } from "constants/TestDesignActions";
import { rcvDeleteTestCase } from "actions/TestDesign";
import { redirectToTestDesign, setLoading } from "actions/Shared";


function* deleteTestCase(action) {
    const { id, testPlanId } = action;

    yield put(setLoading(REQ_DEL_TC, true));
    try {
            yield call(request, {
                url: `/api/testcase/${id}`,
                type: "delete"
            });
            Alert.success("Deleted");
            yield put(rcvDeleteTestCase(id, testPlanId));
            yield put(redirectToTestDesign());
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error(ex.text || "Failed to delete test case");
    }
    yield put(setLoading(REQ_DEL_TC, false));
}

export default function* () {
    yield takeEvery(REQ_DEL_TC, deleteTestCase);
};
