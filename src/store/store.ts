import { configureStore } from '@reduxjs/toolkit';
import todos, { Filters, getNextId, TodosState } from './todosSlice';

export const preloadedState = {
  todos: {
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
  },
};

export const createStore = (preloadedState?: { todos: TodosState }) =>
  configureStore({
    preloadedState,
    reducer: {
      todos,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });

export const store = createStore(preloadedState);
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
