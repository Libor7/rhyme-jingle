/** LIBRARIES */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { FavoriteState } from "../models/store";

const initialFavoriteState: FavoriteState = {
  candidates: [],
  favorites: [],
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
    addFavorites: (state) => ({
      ...state,
      favorites: [...state.favorites, ...state.candidates],
    }),
    removeFavorite: (state, action: PayloadAction<string>) => ({
      ...state,
      favorites: state.favorites.filter(
        (favorite) => favorite !== action.payload
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
