import { configureStore } from '@reduxjs/toolkit';
import datasetReducer from './datasetSlice';

export const store = configureStore({
  reducer: datasetReducer,
});

export type DatasetState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
