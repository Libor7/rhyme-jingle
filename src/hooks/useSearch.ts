/** HOOKS */
import useDebounce from "./useDebounce";

/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/** MODELS */
import { INITIAL_PAGE, MINIMAL_STRING_LENGTH_SEARCH } from "models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "store";
import { archivedActions } from "store/archived";
import { searchedActions } from "store/searched";
import { favoriteActions } from "store/favorite";
import {
  convertWordsToTheirLengths,
  filterByText,
  filterByTextLength,
  filterOutSubset,
} from "helpers/utils";

const useSearch = () => {
  const {
    currentPage,
    lengthFilters,
    lexicon,
    pageCount,
    recordsPerPage,
    removedWords,
    searchedText,
  } = useSelector(({ searched }: RootState) => searched);
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const archivedText = searchParams.get("archived_text");
  const debouncedValue = useDebounce<string>(searchedText, 750);

  useEffect(() => {
    archivedText && appDispatch(searchedActions.setSearchedText(archivedText));
  }, [appDispatch, archivedText]);

  useEffect(() => {
    currentPage > pageCount &&
      appDispatch(searchedActions.setCurrentPage(pageCount));
  }, [appDispatch, currentPage, pageCount]);

  useEffect(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
    appDispatch(searchedActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  useEffect(() => {
    debouncedValue.length >= MINIMAL_STRING_LENGTH_SEARCH &&
      appDispatch(archivedActions.setArchived([debouncedValue]));
  }, [appDispatch, debouncedValue]);

  useEffect(() => {
    return () => {
      appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
    };
  }, [appDispatch]);

  const setSearchedText = useCallback(
    (value: string) => appDispatch(searchedActions.setSearchedText(value)),
    [appDispatch]
  );

  const wordsFilteredByText = useMemo(
    () => filterByText(lexicon, debouncedValue),
    [lexicon, debouncedValue]
  );

  const wordLengths = useMemo(
    () => convertWordsToTheirLengths(wordsFilteredByText),
    [wordsFilteredByText]
  );

  const wordsFilteredByRemovedWords = useMemo(
    () => filterOutSubset(wordsFilteredByText, removedWords),
    [removedWords, wordsFilteredByText]
  );

  const wordsFilteredByLength = useMemo(
    () => filterByTextLength(wordsFilteredByRemovedWords, lengthFilters),
    [lengthFilters, wordsFilteredByRemovedWords]
  );

  const isLengthFilterApplied = lengthFilters.length > 0;
  const listedWords = isLengthFilterApplied
    ? wordsFilteredByLength
    : wordsFilteredByRemovedWords;

  const wordCount = listedWords.length;
  const hasPagination = wordCount > recordsPerPage;

  useEffect(() => {
    appDispatch(
      searchedActions.setPageCount(Math.ceil(wordCount / recordsPerPage))
    );
  }, [appDispatch, recordsPerPage, wordCount]);

  const fromIndex = Math.max(recordsPerPage * currentPage - recordsPerPage, 0);
  const getCurrentPageWords = useCallback(
    (words: string[]) => words.slice(fromIndex, recordsPerPage + fromIndex),
    [fromIndex, recordsPerPage]
  );

  const wordsToShow = useMemo(
    () => (hasPagination ? getCurrentPageWords(listedWords) : listedWords),
    [getCurrentPageWords, hasPagination, listedWords]
  );

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(searchedActions.setCurrentPage(value)),
    [appDispatch]
  );

  return {
    count: pageCount,
    debouncedValue,
    hasPagination,
    onChange: pageChangeHandler,
    page: currentPage,
    searchedText,
    setSearchedText,
    wordCount,
    wordLengths,
    wordsFilteredByRemovedWords,
    wordsFilteredByTextCount: wordsFilteredByText.length,
    wordsToShow,
  };
};

export default useSearch;
