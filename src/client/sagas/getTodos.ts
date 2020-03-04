import { takeEvery, put, call } from "redux-saga/effects";

import { IS_LOADING, GET_TODOS } from "../../constants/actions";
import { setLoading, getTodosSuccess, getTodosFailure } from "../actions";
import request from "../../utils/request";
import API_ROOT from "../../constants/apiRoot";
import { GetTodosAction } from "../../types/actions";

function* getTodos(action: GetTodosAction) {
  yield put(setLoading(GET_TODOS, true));
  try {
    const response: any = yield call(request, `${API_ROOT}api/todos`);
    yield put(getTodosSuccess(response.json));
  } catch (ex) {
    console.log(ex);
    yield put(getTodosFailure(ex.text));
  }
  yield put(setLoading(GET_TODOS, false));
}

export default function*() {
  yield takeEvery(GET_TODOS, getTodos);
}
