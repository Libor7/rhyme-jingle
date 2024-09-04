import { createSlice } from '@reduxjs/toolkit';

const initialSearchedState = {};

const searchedSlice = createSlice({
  name: 'searched',
  initialState: initialSearchedState,
  reducers: {}
});

export const searchedActions = searchedSlice.actions;

export default searchedSlice.reducer;
