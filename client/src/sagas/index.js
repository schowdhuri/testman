import { spawn } from "redux-saga/effects";

import redirectSaga from "sagas/Shared/redirects";

import defectsSaga from "./Defects";
import defectSelectorSaga from "./DefectSelector";
import execCyclesSaga from "./ExecCycle";
import testDesignSaga from "./TestDesign";
import testSelectorSaga from "./TestSelector";

function* rootSaga() {
    yield spawn(defectsSaga);
    yield spawn(defectSelectorSaga);
    yield spawn(execCyclesSaga);
    yield spawn(redirectSaga);
    yield spawn(testDesignSaga);
    yield spawn(testSelectorSaga);
}

export default rootSaga;
