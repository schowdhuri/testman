import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import loading from "./loading";
import todos from "./todos";

function createRootReducer(history: any) {
  return combineReducers({
    router: connectRouter(history),
    loading,
    todos
  });
}

export default createRootReducer;
