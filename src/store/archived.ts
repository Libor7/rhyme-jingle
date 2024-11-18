/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { ArchivedAmount, WordsPerPage } from "models/common";
import { INITIAL_PAGE } from "models/constants";
import { type IArchiveState } from "models/store";

/** OTHER */
import {
  getLocalStorageValue,
  getReducedArray,
  removeItemFromArray,
} from "helpers/utils";

const initialArchivedState: IArchiveState = {
  archived: getLocalStorageValue<string[]>("archived", []),
  archivedAmount: getLocalStorageValue<ArchivedAmount>(
    "archivedAmount",
    ArchivedAmount.TWENTY
  ),
  currentPage: INITIAL_PAGE,
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
    setArchived: (state, { payload }: PayloadAction<string[]>) => {
      const archived =
        payload.length === 1
          ? Array.from(new Set([...payload, ...state.archived]))
          : [...payload];

      if (archived.length > state.archivedAmount) archived.pop();

      localStorage.setItem("archived", JSON.stringify(archived));

      return {
        ...state,
        archived,
      };
    },
    removeArchived: (state, { payload }: PayloadAction<string>) => {
      const newArchived = removeItemFromArray(state.archived, payload);

      localStorage.setItem("archived", JSON.stringify(newArchived));

      return {
        ...state,
        archived: newArchived,
      };
    },
    setArchivedAmount: (state, { payload }: PayloadAction<ArchivedAmount>) => {
      const archived =
        state.archived.length > payload
          ? getReducedArray(state.archived, payload)
          : state.archived;

      localStorage.setItem("archivedAmount", JSON.stringify(payload));
      localStorage.setItem("archived", JSON.stringify(archived));

      return {
        ...state,
        archived,
        archivedAmount: payload,
      };
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      currentPage: payload,
    }),
    setSearchedText: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      searchedText: payload,
    }),
    setRecordsPerPage: (state, { payload }: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("archivedPerPage", JSON.stringify(payload));

      return {
        ...state,
        recordsPerPage: payload,
      };
    },
  },
});

export const archivedActions = archivedSlice.actions;

export default archivedSlice.reducer;
