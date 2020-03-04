import Todo from "./todo";

export interface RootState {
  loading: boolean[];
  todos: Todo[];
}
