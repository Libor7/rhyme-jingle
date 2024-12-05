/** CUSTOM COMPONENTS */
import AdditionalControls from "components/other/AdditionalControls";
import List from "components/UI/List";
import SearchField from "components/UI/SearchField";
import WordCount from "components/UI/WordCount";

/** HOOKS */
import useFavorite from "hooks/useFavorite";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** MODELS */
import APP_CONTENT from "models/constants";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const FavoritePage = () => {
  const {
    currentPage,
    hasPagination,
    pageCount,
    pageChangeHandler,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
  } = useFavorite();
  const siblings = usePaginationSiblings();

  return (
    <>
      <SearchField
        id="search-fav"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.FAVORITE}
        setValue={setSearchedText}
        value={searchedText}
      />
      <WordCount adjectives={["obľúbených", "obľúbené"]} count={wordCount} />
      <AdditionalControls
        count={wordCount}
        dialogContent={{
          title: APP_CONTENT.DIALOG.INFO.DELETE_ALL.TITLE("obľúbené"),
          text:
            APP_CONTENT.DIALOG.INFO.DELETE_ALL.DESCRIPTION("Obľúbené"),
        }}
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

export default FavoritePage;
