import { spawn } from "redux-saga/effects";

import redirectSaga from "./redirects";
import testDesignSaga from "./TestDesign";

function* rootSaga() {
    yield spawn(redirectSaga);
    yield spawn(testDesignSaga);
}

export default rootSaga;
