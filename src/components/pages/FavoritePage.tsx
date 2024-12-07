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
    hasPagination,
    searchedText,
    setSearchedText,
    wordCount,
    wordsToShow,
    ...other
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
      <WordCount
        key={wordCount + "-fav"}
        adjectives={["obľúbených", "obľúbené"]}
        count={wordCount}
      />
      {wordCount > 0 && (
        <AdditionalControls
          count={wordCount}
          dialogContent={{
            title: APP_CONTENT.DIALOG.INFO.DELETE_ALL.TITLE("obľúbené"),
            text: APP_CONTENT.DIALOG.INFO.DELETE_ALL.DESCRIPTION("Obľúbené"),
          }}
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

export default FavoritePage;
