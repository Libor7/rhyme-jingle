/** COMPONENTS */
import Pagination from "@mui/material/Pagination";

/** CUSTOM COMPONENTS */
import Buttons from "../UI/Buttons";
import List from "../UI/List";
import SearchField from "../UI/SearchField";
import WordCount from "../UI/WordCount";

/** HOOKS */
import useSearch from "../../hooks/useSearch";
import useWindowSize from "../../hooks/useWindowSize";

/** LIBRARIES */
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

/** MODELS */
import { MINIMAL_STRING_LENGTH } from "../../models/constants";

/** OTHER */
import { RootState } from "../../store";

const StyledPagination = styled(Pagination)(() => ({
  display: "flex",
  justifyContent: "center",

  "& > .MuiPagination-ul": {
    justifyContent: "center",
  },
}));

const SearchPage = () => {
  const { isExtraSmall, isSmall, isMedium } = useWindowSize();
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

  const siblings = isExtraSmall || isSmall ? 0 : isMedium ? 1 : 2;

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
