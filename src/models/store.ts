export interface FavoriteState {
  candidates: string[];
}

export interface SearchState {
  currentPage: number;
  lengthFilters: number[];
  lexicon: string[];
  removedWords: string[];
  searchedText: string;
}
