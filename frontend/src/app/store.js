import { configureStore } from '@reduxjs/toolkit';
import systemReducer from '../redux/systemSlice';

export const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});