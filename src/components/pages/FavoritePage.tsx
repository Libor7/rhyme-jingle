/** CUSTOM COMPONENTS */
import AdditionalControls from "components/other/AdditionalControls";
import List from "components/UI/List";
import NoResultsFound from "components/UI/NoResultsFound";
import SearchField from "components/UI/SearchField";
import WordCount from "components/UI/WordCount";

/** HOOKS */
import useFavorite from "hooks/useFavorite";
import usePaginationSiblings from "hooks/usePaginationSiblings";

/** LIBRARIES */
import { useSelector } from "react-redux";

/** MODELS */
import APP_CONTENT from "models/constants";

/** OTHER */
import { RootState, useAppDispatch } from "store/index";
import { favoriteActions } from "store/favorite";

/** STYLED COMPONENTS */
import { StyledPagination } from "components/styled/StyledPagination";

const FavoritePage = () => {
  const appDispatch = useAppDispatch();
  const { currentPage, recordsPerPage, searchedText } = useSelector(
    ({ favorite }: RootState) => favorite
  );
  const { pageChangeHandler, wordCount, wordsToShow } = useFavorite();
  const siblings = usePaginationSiblings();

  return (
    <>
      <SearchField
        id="search-fav"
        placeholder={APP_CONTENT.SEARCHFIELD.PLACEHOLDER.FAVORITE}
        setValue={(value: string) =>
          appDispatch(favoriteActions.setSearchedText(value))
        }
        value={searchedText}
      />
      {searchedText === "" && wordsToShow.length === 0 && (
        <NoResultsFound
          heading={APP_CONTENT.HEADINGS.FAVORITE_PAGE}
          text={APP_CONTENT.TEXT_CONTENT.FAVORITE_PAGE}
        />
      )}
      {(wordCount > 0 || searchedText.length > 0) && (
        <WordCount
          key={wordCount + "-fav"}
          adjectives={["obľúbených", "obľúbené"]}
          count={wordCount}
        />
      )}
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
      {wordCount > recordsPerPage && (
        <StyledPagination
          count={Math.ceil(wordCount / recordsPerPage)}
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
