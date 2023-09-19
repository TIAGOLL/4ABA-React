import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';

export default configureStore({
  reducer: {
    page: pageReducer,
  },
});


