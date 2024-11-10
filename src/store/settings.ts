/** LIBRARIES */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** MODELS */
import { type ISettingsState } from "../models/store";

const initialSettingsState: ISettingsState = {
  colorPalette: "coffeeBeige",
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    setColorPalette: (state, action: PayloadAction<string>) => {
      localStorage.setItem("colorPalette", JSON.stringify(action.payload));

      return {
        ...state,
        colorPalette: action.payload,
      };
    },
  }
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
