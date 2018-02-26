import { spawn } from "redux-saga/effects";

import importTestCases from "./importTestCases";
import reqSelectorItems from "./reqSelectorItems";

function* testSelectorSaga() {
    yield spawn(importTestCases);
    // yield spawn(reqInitialSelectorData);
    yield spawn(reqSelectorItems);
}

export default testSelectorSaga;
