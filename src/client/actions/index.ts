import * as ACTIONS from "../../constants/actions";
import * as Types from "../../types/actions";
import Todo from "../../types/todo";

export const setLoading = (
  id: string,
  status: boolean
): Types.LoadingAction => ({
  type: ACTIONS.IS_LOADING,
  id,
  status
});

export const saveTodo = (data: Todo): Types.SaveTodoAction => ({
  type: ACTIONS.SAVE_TODO,
  data
});

export const saveTodoSuccess = (todo: Todo): Types.SaveTodoSuccessAction => ({
  type: ACTIONS.SAVE_TODO_OK,
  value: todo
});

export const saveTodoFailure = (error: string): Types.FailureAction => ({
  type: ACTIONS.SAVE_TODO_ERR,
  error
});

export const getTodo = (id: number): Types.GetTodoAction => ({
  type: ACTIONS.GET_TODO,
  id
});

export const getTodoSuccess = (value: Todo): Types.GetTodoSuccessAction => ({
  type: ACTIONS.GET_TODO_OK,
  value
});

export const getTodoFailure = (error: string): Types.FailureAction => ({
  type: ACTIONS.GET_TODO_ERR,
  error
});

export const updateTodo = (value: Todo): Types.UpdateTodoAction => ({
  type: ACTIONS.UPDATE_TODO,
  value
});

export const updateTodoSuccess = (
  value: Todo
): Types.UpdateTodoSuccessAction => ({
  type: ACTIONS.UPDATE_TODO_OK,
  value
});

export const updateTodoFailure = (error: string): Types.FailureAction => ({
  type: ACTIONS.UPDATE_TODO_ERR,
  error
});

export const deleteTodo = (id: number): Types.DeleteTodoAction => ({
  type: ACTIONS.DEL_TODO,
  id
});

export const deleteTodoSuccess = (
  value: Todo
): Types.DeleteTodoSuccessAction => ({
  type: ACTIONS.DEL_TODO_OK,
  value
});

export const deleteTodoFailure = (error: string): Types.FailureAction => ({
  type: ACTIONS.DEL_TODO_ERR,
  error
});

export const getTodos = () => ({
  type: ACTIONS.GET_TODOS
});

export const getTodosSuccess = (
  value: Todo[]
): Types.GetTodosSuccessAction => ({
  type: ACTIONS.GET_TODOS_OK,
  value
});

export const getTodosFailure = (error: string): Types.FailureAction => ({
  type: ACTIONS.GET_TODOS_ERR,
  error
});
