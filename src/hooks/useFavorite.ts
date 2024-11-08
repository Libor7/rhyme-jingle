/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../models/common";
import { INITIAL_PAGE } from "../models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "../store";
import { filterByText } from "../helpers/utils";
import { favoriteActions } from "../store/favorite";

const useFavorite = () => {
  const { currentPage, favorites, pageCount, searchedText } = useSelector(
    (state: RootState) => state.favorite
  );
  const appDispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    appDispatch(favoriteActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  const favoritesFilteredByText = useMemo(
    () => filterByText(favorites, searchedText),
    [favorites, searchedText]
  );

  const favoriteWords =
    searchedText.length > 0 ? favoritesFilteredByText : favorites;
  const wordCount = favoriteWords.length;
  const hasPagination = wordCount > WordsPerPage.FIVE;

  useEffect(() => {
    appDispatch(
      favoriteActions.setPageCount(Math.ceil(wordCount / WordsPerPage.FIVE))
    );
  }, [appDispatch, wordCount]);

  const fromIndex = WordsPerPage.FIVE * currentPage - WordsPerPage.FIVE;
  const getCurrentPageWords = useCallback(
    (words: string[]) => words.slice(fromIndex, WordsPerPage.FIVE + fromIndex),
    [fromIndex]
  );

  const wordsToShow = useMemo(
    () => (hasPagination ? getCurrentPageWords(favoriteWords) : favoriteWords),
    [favoriteWords, getCurrentPageWords, hasPagination]
  );

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(favoriteActions.setCurrentPage(value)),
    [appDispatch]
  );

  return {
    currentPage,
    hasPagination,
    pageCount,
    pageChangeHandler,
    searchedText,
    wordCount,
    wordsToShow,
  };
};

export default useFavorite;
