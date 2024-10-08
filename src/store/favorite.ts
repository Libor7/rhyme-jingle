/** LIBRARIES */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { FavoriteState } from "../models/store";

const initialFavoriteState: FavoriteState = {
  candidates: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    addCandidate: (state, action: PayloadAction<string>) => ({
      ...state,
      candidates: [...state.candidates, action.payload],
    }),
    removeCandidate: (state, action: PayloadAction<string>) => ({
      ...state,
      candidates: state.candidates.filter(
        (candidate) => candidate !== action.payload
      ),
    }),
    setPropertyToInitialValue: (
      state,
      action: PayloadAction<keyof FavoriteState>
    ) => ({
      ...state,
      [action.payload]: initialFavoriteState[action.payload],
    }),
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
