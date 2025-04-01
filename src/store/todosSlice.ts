import { createSlice } from '@reduxjs/toolkit';
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
    reducers: {},
  });

export const slice = createAuthSlice(initialState, SLICE_NAME);
export const selectTodos = (state: RootState) => state[SLICE_NAME].todos;
export const selectTodosFilter = (state: RootState) => state[SLICE_NAME].filter;

export default slice.reducer;
