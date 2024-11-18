/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE } from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { filterByText } from "helpers/utils";
import { favoriteActions } from "store/favorite";

const useFavorite = () => {
  const { currentPage, favorites, recordsPerPage, searchedText } = useSelector(
    ({ favorite }: RootState) => favorite
  );
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(favoriteActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  const setSearchedText = useCallback(
    (value: string) => appDispatch(favoriteActions.setSearchedText(value)),
    [appDispatch]
  );

  const favoritesFilteredByText = useMemo(
    () => filterByText(favorites, searchedText),
    [favorites, searchedText]
  );

  const favoriteWords =
    searchedText.length > 0 ? favoritesFilteredByText : favorites;
  const wordCount = favoriteWords.length;
  const hasPagination = wordCount > recordsPerPage;

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
    pageCount: Math.ceil(wordCount / recordsPerPage),
    pageChangeHandler,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
  };
};

export default useFavorite;
