import { configureStore } from '@reduxjs/toolkit';
import todos from './todosSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      todos,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
