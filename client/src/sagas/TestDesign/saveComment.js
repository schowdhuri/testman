import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_SAVE_TC_COMMENT } from "constants/TestDesignActions";
import { rcvSaveTCComment } from "actions/TestDesign";
import { setLoading } from "actions/Shared";
import parseComment from "businessLogic/TestDesign/parseComment";

function* saveTestCaseComment(action) {
    const { testCaseId, value, id } = action;
    if(!testCaseId) {
        Alert.error("testCaseId not found");
        return;
    }
    yield put(setLoading(REQ_SAVE_TC_COMMENT, true));
    try {
        let response;
        if(id) {
            response = yield call(request, {
                url: `/api/comment/${id}`,
                type: "put",
                data: {
                    id,
                    content: value
                },
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: "/api/comment",
                type: "post",
                data: {
                    content: value,
                    testCase: testCaseId
                },
                dataType: "json"
            });
        }
        yield put(rcvSaveTCComment(parseComment(response.json)));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to save comment");
    }
    yield put(setLoading(REQ_SAVE_TC_COMMENT, false));
}

export default function* () {
    yield takeEvery(REQ_SAVE_TC_COMMENT, saveTestCaseComment);
};
