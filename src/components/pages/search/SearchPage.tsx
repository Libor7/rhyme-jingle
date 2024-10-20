/** COMPONENTS */
import Pagination from "@mui/material/Pagination";

/** CUSTOM COMPONENTS */
import Buttons from "../../UI/buttons/Buttons";
import List from "../../UI/list/List";
import SearchField from "../../../components/UI/search-field/SearchField";
import WordCount from "../../UI/word-count/WordCount";

/** HOOKS */
import useWindowSize from "../../../hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

/** MODELS */
import { WordsPerPage } from "../../../models/common";
import { INITIAL_PAGE, MINIMAL_STRING_LENGTH } from "../../../models/constants";

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

const StyledPagination = styled(Pagination)(() => ({
  display: "flex",
  justifyContent: "center",

  "& > .MuiPagination-ul": {
    justifyContent: "center",
  }
}));

const SearchPage = () => {
  const { isExtraSmall, isSmall, isMedium } = useWindowSize();
  const { currentPage, lengthFilters, lexicon, removedWords, searchedText } =
    useSelector((state: RootState) => state.searched);
  const { candidates } = useSelector((state: RootState) => state.favorite);
  const appDispatch = useAppDispatch();

  const isLengthFilterApplied = lengthFilters.length > 0;
  const siblings = isExtraSmall || isSmall ? 0 : isMedium ? 1 : 2;

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

  const listedWords = isLengthFilterApplied
    ? wordsFilteredByLength
    : wordsFilteredByRemovedWords;
  const wordCount = listedWords.length;
  const hasPagination = wordCount > WordsPerPage.FIVE;
  const pageCount = Math.ceil(wordCount / WordsPerPage.FIVE);

  const fromIndex = WordsPerPage.FIVE * currentPage - WordsPerPage.FIVE;
  const getCurrentPageWords = (words: string[]) =>
    words.slice(fromIndex, WordsPerPage.FIVE + fromIndex);

  const wordsToShow = hasPagination
    ? getCurrentPageWords(listedWords)
    : listedWords;

  const pageChangeHandler = useCallback(
    async (_event: React.ChangeEvent<unknown>, value: number) =>
      appDispatch(searchedActions.setCurrentPage(value)),
    [appDispatch]
  );

  return (
    <>
      <SearchField />
      {searchedText.length >= MINIMAL_STRING_LENGTH && (
        <WordCount adjectives={["nájdených", "nájdené"]} count={wordCount} />
      )}
      {!!candidates.length && (
        <WordCount
          adjectives={["obľúbených", "obľúbené"]}
          count={candidates.length}
        />
      )}
      <Buttons
        disposableWords={wordsFilteredByRemovedWords}
        hasPagination={hasPagination}
        lengths={wordLengths}
        totalWordsFound={wordsFilteredByText.length}
      />
      <List words={wordsToShow} />
      {hasPagination && (
        <StyledPagination
          count={pageCount}
          onChange={pageChangeHandler}
          page={currentPage}
          showFirstButton
          showLastButton
          siblingCount={siblings}
          size="large"
        />
      )}
    </>
  );
};

export default SearchPage;
