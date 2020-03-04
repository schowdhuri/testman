import { takeEvery, put, call } from "redux-saga/effects";

import { IS_LOADING, SAVE_TODO } from "../../constants/actions";
import { setLoading, saveTodoSuccess, saveTodoFailure } from "../actions";
import request from "../../utils/request";
import API_ROOT from "../../constants/apiRoot";
import { SaveTodoAction } from "../../types/actions";

function* saveTodo(action: SaveTodoAction) {
  const { data } = action;
  yield put(setLoading(SAVE_TODO, true));
  try {
    const response: any = yield call(request, `${API_ROOT}api/todo`, {
      method: "post",
      dataType: "json",
      data
    });
    yield put(saveTodoSuccess(response.json));
  } catch (ex) {
    console.log(ex);
    yield put(saveTodoFailure(ex.text));
  }
  yield put(setLoading(SAVE_TODO, false));
}

export default function*() {
  yield takeEvery(SAVE_TODO, saveTodo);
}
