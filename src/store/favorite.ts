/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { WordsPerPage } from "../models/common";
import { INITIAL_PAGE } from "../models/constants";
import { type IFavoriteState } from "../models/store";

/** OTHER */
import { getLocalStorageValue } from "../helpers/utils";

const initialFavoriteState: IFavoriteState = {
  candidates: [],
  currentPage: INITIAL_PAGE,
  favorites: [],
  pageCount: INITIAL_PAGE,
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
    addFavorites: (state) => {
      const favorites = [...state.favorites, ...state.candidates];
      localStorage.setItem("favorites", JSON.stringify(favorites));

      return {
        ...state,
        favorites,
      };
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      localStorage.setItem("favorites", JSON.stringify([...action.payload]));

      return {
        ...state,
        favorites: [...action.payload],
      };
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(favorites));

      return {
        ...state,
        favorites,
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
    setPageCount: (state, action: PayloadAction<number>) => ({
      ...state,
      pageCount: action.payload,
    }),
    setRecordsPerPage: (state, action: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("favoritesPerPage", JSON.stringify(action.payload));

      return {
        ...state,
        recordsPerPage: action.payload,
      };
    },
    setSearchedText: (state, action: PayloadAction<string>) => ({
      ...state,
      searchedText: action.payload,
    }),
    setPropertyToInitialValue: (
      state,
      action: PayloadAction<keyof IFavoriteState>
    ) => ({
      ...state,
      [action.payload]: initialFavoriteState[action.payload],
    }),
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
