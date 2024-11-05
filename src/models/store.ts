export interface FavoriteState {
  candidates: string[];
  favorites:  string[];
}

export interface SearchState {
  currentPage: number;
  lengthFilters: number[];
  lexicon: string[];
  pageCount: number;
  removedWords: string[];
  searchedText: string;
}
