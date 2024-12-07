/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { WordsPerPage } from "models/common";
import { INITIAL_PAGE } from "models/constants";
import { type ISearchState } from "models/store";

/** OTHER */
import lexicon from "assets/lexicon";
import { getLocalStorageValue, removeItemFromArray } from "helpers/utils";

const initialSearchState: ISearchState = {
  currentPage: INITIAL_PAGE,
  lengthFilters: [],
  lexicon,
  pageCount: INITIAL_PAGE,
  recordsPerPage: getLocalStorageValue<WordsPerPage>(
    "searchedPerPage",
    WordsPerPage.FIVE
  ),
  removedWords: [],
  searchedText: "",
};

const searchedSlice = createSlice({
  name: "searched",
  initialState: initialSearchState,
  reducers: {
    setCurrentPage: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      currentPage: payload,
    }),
    setSearchedText: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      searchedText: payload,
    }),
    addLengthFilter: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      lengthFilters: [...state.lengthFilters, payload],
    }),
    removeLengthFilter: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      lengthFilters: removeItemFromArray(state.lengthFilters, payload),
    }),
    setPageCount: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      pageCount: payload,
    }),
    setRecordsPerPage: (state, { payload }: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("searchedPerPage", JSON.stringify(payload));

      return {
        ...state,
        recordsPerPage: payload,
      };
    },
    removeListedWord: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      removedWords: [...state.removedWords, payload],
    }),
    setPropertyToInitialValue: (
      state,
      { payload }: PayloadAction<keyof ISearchState>
    ) => ({
      ...state,
      [payload]: initialSearchState[payload],
    }),
    setInitialState: () => initialSearchState,
  },
});

export const searchedActions = searchedSlice.actions;

export default searchedSlice.reducer;
