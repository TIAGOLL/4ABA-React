import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: '/',
  initialState: {
    page: '',
  },
  reducers: {
    ChangePage: (state, { payload }) => {
      state.page = payload;
    },
  },
});


export const { ChangePage } = slice.actions;

export const selectPage = state => state.page;

export default slice.reducer;
