import { createSlice } from '@reduxjs/toolkit';

const initialArchivedState = {};

const archivedSlice = createSlice({
  name: 'archived',
  initialState: initialArchivedState,
  reducers: {}
});

export const archivedActions = archivedSlice.actions;

export default archivedSlice.reducer;
