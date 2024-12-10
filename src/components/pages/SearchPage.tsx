/** CUSTOM COMPONENTS */
import Buttons from "components/UI/Buttons";
import FlexboxWrapper from "components/layout/wrappers/FlexboxWrapper";
import List from "components/UI/List";
import NoResultsFound from "components/UI/NoResultsFound";
import SearchField from "components/UI/SearchField";
import WordCount from "components/UI/WordCount";

/** HOOKS */
import useSearch from "hooks/useSearch";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT, { MINIMAL_STRING_LENGTH_SEARCH } from "models/constants";

/** OTHER */
import { type RootState } from "store";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const SearchPage = () => {
  const siblings = usePaginationSiblings();
  const { candidates } = useSelector(({ favorite }: RootState) => favorite);
  const {
    debouncedValue,
    hasPagination,
    searchedText,
    setSearchedText,
    wordCount,
    wordLengths,
    wordsFilteredByRemovedWords,
    wordsFilteredByTextCount,
    wordsToShow,
    ...other
  } = useSearch();

  return (
    <>
      <SearchField
        id="search-all"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.SEARCHED}
        setValue={setSearchedText}
        value={searchedText}
      />
      {debouncedValue === "" && (
        <NoResultsFound
          heading={APP_CONTENT.HEADINGS.SEARCH_PAGE}
          text={APP_CONTENT.TEXT_CONTENT.SEARCH_PAGE}
        />
      )}
      {debouncedValue.length >= MINIMAL_STRING_LENGTH_SEARCH && (
        <FlexboxWrapper>
          <WordCount
            key={wordCount}
            adjectives={["nájdených", "nájdené"]}
            count={wordCount}
          />
          {!!candidates.length && (
            <WordCount
              key={candidates.length + "-cand"}
              adjectives={["obľúbených", "obľúbené"]}
              count={candidates.length}
            />
          )}
        </FlexboxWrapper>
      )}
      {wordsFilteredByTextCount > 0 && (
        <Buttons
          disposableWords={wordsFilteredByRemovedWords}
          hasPagination={hasPagination}
          lengths={wordLengths}
          totalWordsFound={wordsFilteredByTextCount}
        />
      )}
      {wordsToShow.length > 0 && <List words={wordsToShow} />}
      {hasPagination && (
        <StyledPagination
          showFirstButton
          showLastButton
          siblingCount={siblings}
          size="large"
          {...other}
        />
      )}
    </>
  );
};

export default SearchPage;
