import { Reducer } from 'redux';

/* actions */
const actions = {
  ADD_TODO: 'TODOS/ADD_TODO',
  DELETE_TODO: 'TODOS/DELETE_TODO',
} as const;

/* actionCreators */
export const addTodo = (body: string) => ({
  type: actions.ADD_TODO,
  payload: { body },
});

export const deleteTodo = (id: number) => ({
  type: actions.DELETE_TODO,
  payload: { id },
});

type TodoAction = ReturnType<typeof addTodo> | ReturnType<typeof deleteTodo>;

/* reducer */
export interface TodoState {
  todos: { id: number; body: string }[];
}

const initialState: TodoState = {
  todos: [],
};

const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initialState,
  action: TodoAction,
) => {
  switch (action.type) {
    case actions.ADD_TODO: {
      const { body } = action.payload;
      const { length } = state.todos;
      const id = length === 0 ? 1 : state.todos[length - 1].id + 1;
      const newTodo = { id, body };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case actions.DELETE_TODO: {
      const newTodos = state.todos.filter(
        todo => action.payload.id !== todo.id,
      );

      return {
        ...state,
        todos: newTodos,
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default todoReducer;
