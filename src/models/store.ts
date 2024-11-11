/** MODELS */
import { WordsPerPage } from "./common";

export interface IArchiveState {
  archived: string[];
  currentPage: number;
  pageCount: number;
  recordsPerPage: WordsPerPage;
  searchedText: string;
}

export interface IFavoriteState {
  candidates: string[];
  currentPage: number;
  favorites:  string[];
  pageCount: number;
  recordsPerPage: WordsPerPage;
  searchedText: string;
}

export interface ISearchState {
  currentPage: number;
  lengthFilters: number[];
  lexicon: string[];
  pageCount: number;
  recordsPerPage: WordsPerPage;
  removedWords: string[];
  searchedText: string;
}

export interface ISettingsState {
  colorPalette: string;
}
