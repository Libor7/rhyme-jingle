/** LIBRARIES */
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../models/common";
import { INITIAL_PAGE } from "../models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "../store";
import { searchedActions } from "../store/searched";
import { favoriteActions } from "../store/favorite";
import {
  convertWordsToTheirLengths,
  filterByText,
  filterByTextLength,
  filterOutSubset,
} from "../helpers/utils";

const useSearch = () => {
  const {
    currentPage,
    lengthFilters,
    lexicon,
    pageCount,
    removedWords,
    searchedText,
  } = useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
    appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
    appDispatch(searchedActions.setCurrentPage(INITIAL_PAGE));
  }, [appDispatch, searchedText]);

  useEffect(() => {
    return () => {
      appDispatch(searchedActions.setInitialState());
      appDispatch(favoriteActions.setPropertyToInitialValue("candidates"));
    };
  }, [appDispatch]);

  const wordsFilteredByText = useMemo(
    () => filterByText(lexicon, searchedText),
    [lexicon, searchedText]
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
  const hasPagination = wordCount > WordsPerPage.FIVE;

  useEffect(() => {
    appDispatch(
      searchedActions.setPageCount(Math.ceil(wordCount / WordsPerPage.FIVE))
    );
  }, [appDispatch, wordCount]);

  const fromIndex = WordsPerPage.FIVE * currentPage - WordsPerPage.FIVE;
  const getCurrentPageWords = useCallback(
    (words: string[]) => words.slice(fromIndex, WordsPerPage.FIVE + fromIndex),
    [fromIndex]
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
    wordsFilteredByTextCount: wordsFilteredByText.length,
    hasPagination,
    pageCount,
    pageChangeHandler,
    wordCount,
    wordLengths,
    wordsFilteredByRemovedWords,
    wordsToShow,
  };
};

export default useSearch;
