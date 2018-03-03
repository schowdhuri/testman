import Alert from "react-s-alert";
import { put, take, takeEvery } from "redux-saga/effects";

import { REQ_ITEMS } from "constants/DefectSelectorActions";
import { RCV_DEFECTS } from "constants/DefectsActions";
import { rcvItems } from "actions/DefectSelector";
import { reqDefects } from "actions/Defects";
import { setLoading } from "actions/Shared";

import parseSelectorData from "businessLogic/DefectSelector/parseSelectorData";
import cache from "businessLogic/DefectSelector/DefectSelectorCache";

function* getItems(action) {
    const { path } = action;
    let { selectedItems } = action;
    yield put(reqDefects());
    const { defects } = yield take(RCV_DEFECTS);
    cache.save(parseSelectorData(defects, action));
    if(selectedItems.length)
        selectedItems = cache.addDetails(selectedItems);
    yield put(rcvItems(cache.getByPath(path), selectedItems));
    yield put(setLoading(REQ_ITEMS, false));
}
export default function* () {
    yield takeEvery(REQ_ITEMS, getItems);
}
