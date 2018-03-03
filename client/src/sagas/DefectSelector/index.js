import { spawn } from "redux-saga/effects";

import reqSelectorItems from "./reqSelectorItems";

function* defectSelectorSaga() {
    yield spawn(reqSelectorItems);
}

export default defectSelectorSaga;
