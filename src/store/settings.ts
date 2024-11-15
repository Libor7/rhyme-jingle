/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { type ISettingsState } from "models/store";

/** OTHER */
import { getLocalStorageValue } from "helpers/utils";

const initialSettingsState: ISettingsState = {
  colorPalette: getLocalStorageValue<string>("colorPalette", "coffeeBeige"),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    setColorPalette: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("colorPalette", JSON.stringify(payload));

      return {
        ...state,
        colorPalette: payload,
      };
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
