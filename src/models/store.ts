/** MODELS */
import { ArchivedAmount, WordsPerPage } from "./common";

export interface IArchiveState {
  archived: string[];
  archivedAmount: ArchivedAmount;
  currentPage: number;
  recordsPerPage: WordsPerPage;
  searchedText: string;
}

export interface IFavoriteState {
  candidates: string[];
  currentPage: number;
  favorites:  string[];
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
