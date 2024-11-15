/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { WordsPerPage } from "models/common";
import { INITIAL_PAGE } from "models/constants";
import { type IFavoriteState } from "models/store";

/** OTHER */
import { getLocalStorageValue, removeItemFromArray } from "helpers/utils";

const initialFavoriteState: IFavoriteState = {
  candidates: [],
  currentPage: INITIAL_PAGE,
  favorites: getLocalStorageValue<string[]>("favorites", []),
  recordsPerPage: getLocalStorageValue<WordsPerPage>(
    "favoritesPerPage",
    WordsPerPage.FIVE
  ),
  searchedText: "",
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    addCandidate: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      candidates: [...state.candidates, payload],
    }),
    removeCandidate: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      candidates: removeItemFromArray(state.candidates, payload),
    }),
    addFavorites: (state) => {
      const favorites = [...state.favorites, ...state.candidates];
      localStorage.setItem("favorites", JSON.stringify(favorites));

      return {
        ...state,
        favorites,
      };
    },
    setFavorites: (state, { payload }: PayloadAction<string[]>) => {
      localStorage.setItem("favorites", JSON.stringify(payload));

      return {
        ...state,
        favorites: [...payload],
      };
    },
    removeFavorite: (state, { payload }: PayloadAction<string>) => {
      const favorites = removeItemFromArray(state.favorites, payload);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      return {
        ...state,
        favorites,
      };
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      currentPage: payload,
    }),
    setRecordsPerPage: (state, { payload }: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("favoritesPerPage", JSON.stringify(payload));

      return {
        ...state,
        recordsPerPage: payload,
      };
    },
    setSearchedText: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      searchedText: payload,
    }),
    setPropertyToInitialValue: (
      state,
      { payload }: PayloadAction<keyof IFavoriteState>
    ) => ({
      ...state,
      [payload]: initialFavoriteState[payload],
    }),
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
