import { createSlice } from '@reduxjs/toolkit';

const initialFavoriteState = {};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteState,
  reducers: {}
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
