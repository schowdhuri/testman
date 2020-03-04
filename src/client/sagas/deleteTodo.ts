import { takeEvery, put, call } from "redux-saga/effects";

import { IS_LOADING, DEL_TODO } from "../../constants/actions";
import { setLoading, deleteTodoSuccess, deleteTodoFailure } from "../actions";
import request from "../../utils/request";
import API_ROOT from "../../constants/apiRoot";
import { DeleteTodoAction } from "../../types/actions";

function* deleteTodo(action: DeleteTodoAction) {
  const { id } = action;
  yield put(setLoading(DEL_TODO, true));
  try {
    const response: any = yield call(request, `${API_ROOT}api/todos/${id}`, {
      method: "delete"
    });
    yield put(
      deleteTodoSuccess({
        ...response.json,
        id
      })
    );
  } catch (ex) {
    console.log(ex);
    yield put(deleteTodoFailure(ex.text));
  }
  yield put(setLoading(DEL_TODO, false));
}

export default function*() {
  yield takeEvery(DEL_TODO, deleteTodo);
}
