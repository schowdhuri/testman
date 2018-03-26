import { spawn } from "redux-saga/effects";

import dashboardSaga from "./Dashboard";
import defectsSaga from "./Defects";
import defectSelectorSaga from "./DefectSelector";
import execCyclesSaga from "./ExecCycle";
import sharedSaga from "sagas/Shared";
import testDesignSaga from "./TestDesign";
import testSelectorSaga from "./TestSelector";

function* rootSaga() {
    yield spawn(dashboardSaga);
    yield spawn(defectsSaga);
    yield spawn(defectSelectorSaga);
    yield spawn(execCyclesSaga);
    yield spawn(sharedSaga);
    yield spawn(testDesignSaga);
    yield spawn(testSelectorSaga);
}

export default rootSaga;
