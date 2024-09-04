import { createSlice } from '@reduxjs/toolkit';

const initialSettingsState = {};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {}
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
