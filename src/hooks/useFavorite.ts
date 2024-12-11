/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { INITIAL_PAGE, MINIMAL_STRING_LENGTH_OTHER } from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { filterByText, getCurrentPageWords } from "helpers/utils";
import { favoriteActions } from "store/favorite";

const useFavorite = () => {
  const appDispatch = useAppDispatch();
  const { currentPage, favorites, recordsPerPage, searchedText } = useSelector(
    ({ favorite }: RootState) => favorite
  );

  useEffect(() => {
    appDispatch(favoriteActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  const favoritesFilteredByText = useMemo(
    () => filterByText(favorites, searchedText, MINIMAL_STRING_LENGTH_OTHER),
    [favorites, searchedText]
  );

  const favoriteWords =
    searchedText.length > 0 ? favoritesFilteredByText : favorites;
  const wordCount = favoriteWords.length;

  const fromIndex = useMemo(
    () => recordsPerPage * currentPage - recordsPerPage,
    [currentPage, recordsPerPage]
  );

  const wordsToShow = useMemo(
    () =>
      wordCount > recordsPerPage
        ? getCurrentPageWords(
            favoriteWords,
            fromIndex,
            recordsPerPage + fromIndex
          )
        : favoriteWords,
    [favoriteWords, fromIndex, recordsPerPage, wordCount]
  );

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(favoriteActions.setCurrentPage(value)),
    [appDispatch]
  );

  return {
    pageChangeHandler,
    wordCount,
    wordsToShow,
  };
};

export default useFavorite;
