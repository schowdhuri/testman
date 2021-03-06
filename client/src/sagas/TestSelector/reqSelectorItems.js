import { put, take, takeEvery } from "redux-saga/effects";

import { REQ_ITEMS } from "constants/TestSelectorActions";
import { RCV_TEST_PLANS, RCV_TEST_CASES } from "constants/TestDesignActions";
import { rcvItems } from "actions/TestSelector";
import { reqTestPlans, reqTestCases } from "actions/TestDesign";
import { setLoading } from "actions/Shared";
import parseSelectorData from "utils/TestSelector/parseSelectorData";
import cache from "utils/TestSelector/TestSelectorCache";

function* getItems(action) {
    const { path } = action;
    let { selectedItems } = action;
    if(path.length==0) {
        yield put(reqTestPlans());
        const { testPlans } = yield take(RCV_TEST_PLANS);
        cache.save(parseSelectorData(testPlans, path));
    } else {
        yield put(reqTestCases(path[0].id));
        const { testCases } = yield take(RCV_TEST_CASES);
        cache.save(parseSelectorData(testCases, path), path);
    }
    if(selectedItems.length)
        selectedItems = cache.addDetails(selectedItems);
    yield put(rcvItems(cache.getByPath(path), selectedItems));
    yield put(setLoading(REQ_ITEMS, false));
}
export default function* () {
    yield takeEvery(REQ_ITEMS, getItems);
}
