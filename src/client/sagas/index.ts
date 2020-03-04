import { all } from "redux-saga/effects";

import deleteTodo from "./deleteTodo";
import getTodos from "./getTodos";
import saveTodo from "./saveTodo";
import updateTodo from "./updateTodo";

export default function*() {
  yield all([deleteTodo(), getTodos(), saveTodo(), updateTodo()]);
}
