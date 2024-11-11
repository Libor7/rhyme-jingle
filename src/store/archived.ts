/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { WordsPerPage } from "models/common";
import { INITIAL_PAGE } from "models/constants";
import { type IArchiveState } from "models/store";

/** OTHER */
import { getLocalStorageValue } from "helpers/utils";

const initialArchivedState: IArchiveState = {
  archived: [],
  currentPage: INITIAL_PAGE,
  pageCount: INITIAL_PAGE,
  recordsPerPage: getLocalStorageValue<WordsPerPage>(
    "archivedPerPage",
    WordsPerPage.FIVE
  ),
  searchedText: "",
};

const archivedSlice = createSlice({
  name: "archived",
  initialState: initialArchivedState,
  reducers: {
    addArchived: (state, action: PayloadAction<string>) => {
      const archived = Array.from(new Set([action.payload, ...state.archived]));
      localStorage.setItem("archived", JSON.stringify(archived));

      return {
        ...state,
        archived,
      };
    },
    setArchived: (state, action: PayloadAction<string[]>) => {
      localStorage.setItem("archived", JSON.stringify([...action.payload]));

      return {
        ...state,
        archived: [...action.payload],
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
    setSearchedText: (state, action: PayloadAction<string>) => ({
      ...state,
      searchedText: action.payload,
    }),
    setRecordsPerPage: (state, action: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("archivedPerPage", JSON.stringify(action.payload));

      return {
        ...state,
        recordsPerPage: action.payload,
      };
    },
  },
});

export const archivedActions = archivedSlice.actions;

export default archivedSlice.reducer;
