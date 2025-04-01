import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum Filters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type Todo = {
  task: string;
  code: number;
  completed: boolean;
};

export type TodosState = { filter: Filters; todos: Todo[] };

let nextId = 0;

const getNextId = () => nextId++;

const initialState: TodosState = {
  filter: Filters.all,
  todos: [
    {
      task: 'Тестовое задание',
      code: getNextId(),
      completed: false,
    },
    {
      task: 'Прекрасный код',
      code: getNextId(),
      completed: true,
    },
    {
      task: 'Покрытие тестами',
      code: getNextId(),
      completed: false,
    },
  ],
};

export const SLICE_NAME = 'todos';

export const createAuthSlice = (initialState: TodosState, sliceName: string) =>
  createSlice({
    initialState,
    name: sliceName,
    reducers: {
      todoAdded(state, action: PayloadAction<string>) {
        state.todos.push({ task: action.payload, code: getNextId(), completed: false });
      },
      completedTodosDeleted(state) {
        state.todos = state.todos.filter((todo) => !todo.completed);
      },
      todoStateChanged(state, action: PayloadAction<number>) {
        const changeTodo = state.todos.find((todo) => todo.code === action.payload);
        if (changeTodo) {
          changeTodo.completed = !changeTodo.completed;
        }
      },
      todosFilterChanged(state, action: PayloadAction<Filters>) {
        state.filter = action.payload;
      },
    },
  });

export const slice = createAuthSlice(initialState, SLICE_NAME);

export const { todoAdded, completedTodosDeleted, todoStateChanged, todosFilterChanged } =
  slice.actions;

export const selectTodos = (state: RootState) => state[SLICE_NAME].todos;
export const selectTodosFilter = (state: RootState) => state[SLICE_NAME].filter;

export default slice.reducer;
