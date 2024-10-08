/** COMPONENTS */
import Buttons from "../../UI/buttons/Buttons";
import List from "../../UI/list/List";
import Pagination from "../../UI/pagination/Pagination";
import SearchField from "../../../components/UI/search-field/SearchField";
import WordCount from "../../UI/word-count/WordCount";

/** LIBRARIES */
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../../../models/common";
import { MINIMAL_STRING_LENGTH } from "../../../models/constants";

/** OTHER */
import { RootState, useAppDispatch } from "../../../store";
import { favoriteActions } from "../../../store/favorite";
import { searchedActions } from "../../../store/searched";
import {
  filterByText,
  filterByTextLength,
  convertWordsToTheirLengths,
  filterOutSubset,
} from "../../../helpers/utils";

const SearchPage = () => {
  const { currentPage, lengthFilters, lexicon, removedWords, searchedText } =
    useSelector((state: RootState) => state.searched);
  const appDispatch = useAppDispatch();

  const isLengthFilterApplied = lengthFilters.length > 0;

  useEffect(() => {
    appDispatch(searchedActions.setPropertyToInitialValue("lengthFilters"));
    appDispatch(searchedActions.setPropertyToInitialValue("removedWords"));
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

  const listedWords = isLengthFilterApplied
    ? wordsFilteredByLength
    : wordsFilteredByRemovedWords;
  const wordCount = listedWords.length;
  const hasPagination = wordCount > WordsPerPage.FIVE;

  const fromIndex = WordsPerPage.FIVE * currentPage - WordsPerPage.FIVE;
  const getCurrentPageWords = (words: string[]) =>
    words.slice(fromIndex, WordsPerPage.FIVE + fromIndex);

  const wordsToShow = hasPagination
    ? getCurrentPageWords(listedWords)
    : listedWords;

  return (
    <>
      <SearchField />
      {searchedText.length >= MINIMAL_STRING_LENGTH && (
        <WordCount count={wordCount} />
      )}
      <Buttons
        disposableWords={wordsFilteredByRemovedWords}
        labels={wordLengths}
        totalWordsFound={wordsFilteredByText.length}
      />
      <List words={wordsToShow} />
      {hasPagination && <Pagination wordCount={wordCount} />}
    </>
  );
};

export default SearchPage;
