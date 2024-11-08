/** CUSTOM COMPONENTS */
import Buttons from "../UI/Buttons";
import List from "../UI/List";
import SearchField from "../UI/SearchField";
import WordCount from "../UI/WordCount";

/** HOOKS */
import useSearch from "../../hooks/useSearch";
import usePaginationSiblings from "../../hooks/usePaginationSiblings";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT, { MINIMAL_STRING_LENGTH } from "../../models/constants";

/** OTHER */
import { type RootState, useAppDispatch } from "../../store";
import { searchedActions } from "../../store/searched";
import { useCallback, useEffect } from "react";

/** STYLED COMPONENTS */
import { StyledPagination } from "../styled/StyledPagination";

const SearchPage = () => {
  const siblings = usePaginationSiblings();
  const { currentPage, searchedText } = useSelector(
    (state: RootState) => state.searched
  );
  const { candidates } = useSelector((state: RootState) => state.favorite);
  const {
    hasPagination,
    pageChangeHandler,
    pageCount,
    wordCount,
    wordLengths,
    wordsFilteredByRemovedWords,
    wordsFilteredByTextCount,
    wordsToShow,
  } = useSearch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    currentPage > pageCount &&
      appDispatch(searchedActions.setCurrentPage(pageCount));
  }, [appDispatch, currentPage, pageCount]);

  const setSearchedText = useCallback(
    (value: string) => appDispatch(searchedActions.setSearchedText(value)),
    [appDispatch]
  );

  return (
    <>
      <SearchField
        id="search-all"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.SEARCHED}
        setValue={setSearchedText}
        value={searchedText}
      />
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
        totalWordsFound={wordsFilteredByTextCount}
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
