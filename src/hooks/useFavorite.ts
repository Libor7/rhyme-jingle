/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE } from "../models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "../store";
import { filterByText } from "../helpers/utils";
import { favoriteActions } from "../store/favorite";

const useFavorite = () => {
  const { currentPage, favorites, pageCount, recordsPerPage, searchedText } = useSelector(
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
  const hasPagination = wordCount > recordsPerPage;

  useEffect(() => {
    appDispatch(
      favoriteActions.setPageCount(Math.ceil(wordCount / recordsPerPage))
    );
  }, [appDispatch, recordsPerPage, wordCount]);

  const fromIndex = recordsPerPage * currentPage - recordsPerPage;
  const getCurrentPageWords = useCallback(
    (words: string[]) => words.slice(fromIndex, recordsPerPage + fromIndex),
    [fromIndex, recordsPerPage]
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
