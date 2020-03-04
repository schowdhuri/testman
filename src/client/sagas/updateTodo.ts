import { takeEvery, put, call } from "redux-saga/effects";

import { IS_LOADING, UPDATE_TODO } from "../../constants/actions";
import { setLoading, updateTodoSuccess, updateTodoFailure } from "../actions";
import request from "../../utils/request";
import API_ROOT from "../../constants/apiRoot";
import { UpdateTodoAction } from "../../types/actions";

function* updateTodo(action: UpdateTodoAction) {
  const { value } = action;
  yield put(setLoading(UPDATE_TODO, true));
  try {
    const response: any = yield call(
      request,
      `${API_ROOT}api/todos/${value.id}`,
      {
        method: "put",
        dataType: "json",
        data: value
      }
    );
    yield put(updateTodoSuccess(response.json));
  } catch (ex) {
    console.log(ex);
    yield put(updateTodoFailure(ex.text));
  }
  yield put(setLoading(UPDATE_TODO, false));
}

export default function*() {
  yield takeEvery(UPDATE_TODO, updateTodo);
}
