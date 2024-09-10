import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteCandidates: string[];
}

const initialFavoriteState: FavoriteState = {
  favoriteCandidates: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    addFavoriteCandidate(state, action: PayloadAction<string>) {
      return {
        ...state,
        favoriteCandidates: [...state.favoriteCandidates, action.payload],
      };
    },
    removeFavoriteCandidate(state, action: PayloadAction<string>) {
      return {
        ...state,
        favoriteCandidates: state.favoriteCandidates.filter(
          (word) => word !== action.payload
        ),
      };
    },
    resetFavoriteCandidates(state) {
      return {
        ...state,
        favoriteCandidates: [],
      };
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
