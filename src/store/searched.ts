import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchedState {
  allWords: string[];
  removedWords: string[];
  searchedText: string;
  wordLengthFilters: number[];
}

const initialSearchedState: SearchedState = {
  allWords: [
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
  ],
  removedWords: [],
  searchedText: "",
  wordLengthFilters: [],
};

const searchedSlice = createSlice({
  name: "searched",
  initialState: initialSearchedState,
  reducers: {
    addRemovedWord(state, action: PayloadAction<string>) {
      return {
        ...state,
        removedWords: [...state.removedWords, action.payload],
      };
    },
    removeRemovedWord(state, action: PayloadAction<string>) {
      return {
        ...state,
        removedWords: state.removedWords.filter(word => word !== action.payload),
      };
    },
    resetRemovedWords(state) {
      return {
        ...state,
        removedWords: [],
      };
    },
    addWordLengthFilter(state, action: PayloadAction<number>) {
      return {
        ...state,
        wordLengthFilters: [...state.wordLengthFilters, action.payload],
      };
    },
    removeWordLengthFilter(state, action: PayloadAction<number>) {
      return {
        ...state,
        wordLengthFilters: state.wordLengthFilters.filter(filter => filter !== action.payload),
      };
    },
    resetWordLengthFilters(state) {
      return {
        ...state,
        wordLengthFilters: [],
      };
    },
    setSearchedText(state, action: PayloadAction<string>) {
      return {
        ...state,
        searchedText: action.payload,
      };
    },
    setStateToInitial() {
      return initialSearchedState;
    }
  },
});

export const searchedActions = searchedSlice.actions;

export default searchedSlice.reducer;
