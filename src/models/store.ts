export interface IFavoriteState {
  candidates: string[];
  currentPage: number;
  favorites:  string[];
  pageCount: number;
  searchedText: string;
}

export interface ISearchState {
  currentPage: number;
  lengthFilters: number[];
  lexicon: string[];
  pageCount: number;
  removedWords: string[];
  searchedText: string;
}
