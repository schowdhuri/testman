import { spawn } from "redux-saga/effects";

import defectsSaga from "./Defects";
import redirectSaga from "./redirects";
import testDesignSaga from "./TestDesign";

function* rootSaga() {
    yield spawn(defectsSaga);
    yield spawn(redirectSaga);
    yield spawn(testDesignSaga);
}

export default rootSaga;
