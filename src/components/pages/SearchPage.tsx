/** CUSTOM COMPONENTS */
import Buttons from "components/UI/Buttons";
import FlexboxWrapper from "components/layout/wrappers/FlexboxWrapper";
import List from "components/UI/List";
import SearchField from "components/UI/SearchField";
import WordCount from "components/UI/WordCount";

/** HOOKS */
import useSearch from "hooks/useSearch";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT, { MINIMAL_STRING_LENGTH } from "models/constants";

/** OTHER */
import { type RootState } from "store";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const SearchPage = () => {
  const siblings = usePaginationSiblings();
  const { candidates } = useSelector(({ favorite }: RootState) => favorite);
  const {
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
      {searchedText.length >= MINIMAL_STRING_LENGTH && (
        <FlexboxWrapper>
          <WordCount
            key={wordCount}
            adjectives={["nájdených", "nájdené"]}
            count={wordCount}
          />
          {!!candidates.length && (
            <WordCount
              key={candidates.length + '-cand'}
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
