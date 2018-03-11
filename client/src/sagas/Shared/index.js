import { spawn } from "redux-saga/effects";

import redirectSaga from "./redirects";
import reqUsers from "./reqUsers";

function* sharedSaga() {
    yield spawn(redirectSaga);
    yield spawn(reqUsers);
}

export default sharedSaga;
