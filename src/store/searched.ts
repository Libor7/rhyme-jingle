/** LIBRARIES */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** MODELS */
import { WordsPerPage } from "../models/common";
import { INITIAL_PAGE } from "../models/constants";
import { type ISearchState } from "../models/store";

/** OTHER */
import { getLocalStorageValue } from "../helpers/utils";

const initialSearchState: ISearchState = {
  currentPage: INITIAL_PAGE,
  lengthFilters: [],
  lexicon: [
    // TODO osobitný súbor - exported function, ktorá vráti string array všetkých slov
    "má",
    "prekvapenie",
    "pracovne",
    "predošlý",
    "tiež",
    "Vianoce",
    "deň",
    "nočný",
    "národný",
    "náročný",
    "slovo",
    "nové",
    "pravé",
    "dvere",
    "tri",
    "olovo",
    "pretože",
    "že",
    "celkovo",
    "pred",
    "stopy",
    "ale",
    "malé",
    "kopy",
    "stropy",
    "alebo",
    "preteky",
    "pravítko",
    "pravidlo",
    "pri",
    "opri",
    "veže",
    "mreže",
    "mrože",
    "svoje",
    "moje",
    "tvoje",
    "narodenie",
    "prianie",
    "znenie",
    "trvanie",
    "nie",
    "zarovnanie",
    "urovnanie",
    "kde",
    "opica",
    "orangutan",
    "okuliare",
    "tí",
    "slon",
    "skloň",
    "byt",
    "byť",
    "máš",
    "raz",
    "nôž",
    "bôb",
    "rob",
    "mat",
    "pamäť",
    "páčiť",
    "pocit",
    "raď",
    "rád",
    "maľba",
    "prilba",
    "tŕň",
  ],
  pageCount: INITIAL_PAGE,
  recordsPerPage: getLocalStorageValue<WordsPerPage>("searchedPerPage", WordsPerPage.FIVE),
  removedWords: [],
  searchedText: "",
};

const searchedSlice = createSlice({
  name: "searched",
  initialState: initialSearchState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
    setSearchedText: (state, action: PayloadAction<string>) => ({
      ...state,
      searchedText: action.payload,
    }),
    addLengthFilter: (state, action: PayloadAction<number>) => ({
      ...state,
      lengthFilters: [...state.lengthFilters, action.payload],
    }),
    removeLengthFilter: (state, action: PayloadAction<number>) => ({
      ...state,
      lengthFilters: state.lengthFilters.filter(
        (filter) => filter !== action.payload
      ),
    }),
    setPageCount: (state, action: PayloadAction<number>) => ({
      ...state,
      pageCount: action.payload,
    }),
    setRecordsPerPage: (state, action: PayloadAction<WordsPerPage>) => {
      localStorage.setItem("searchedPerPage", JSON.stringify(action.payload));

      return {
        ...state,
        recordsPerPage: action.payload,
      };
    },
    removeListedWord: (state, action: PayloadAction<string>) => ({
      ...state,
      removedWords: [...state.removedWords, action.payload],
    }),
    setPropertyToInitialValue: (
      state,
      action: PayloadAction<keyof ISearchState>
    ) => ({
      ...state,
      [action.payload]: initialSearchState[action.payload],
    }),
    setInitialState: () => initialSearchState,
  },
});

export const searchedActions = searchedSlice.actions;

export default searchedSlice.reducer;
