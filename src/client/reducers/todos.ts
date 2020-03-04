import * as ACTIONS from "../../constants/actions";
import * as Types from "../../types/actions";
import Todo from "../../types/todo";

const initialState: Array<Todo> = [];

export default (state = initialState, action: any) => {
  const { type } = action;

  switch (type) {
    case ACTIONS.GET_TODOS_OK:
      return action.value;

    case ACTIONS.SAVE_TODO_OK:
      return [action.value, ...state];

    case ACTIONS.UPDATE_TODO_OK: {
      const value: Todo = action.value;
      const index: number = state.findIndex(item => item.id === value.id);
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          action.value,
          ...state.slice(index + 1)
        ];
      }
      break;
    }

    case ACTIONS.DEL_TODO_OK: {
      const value: Todo = action.value;
      const index: number = state.findIndex(item => item.id === value.id);
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      break;
    }
  }
  return state;
};
